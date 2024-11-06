import React, {createContext, useContext, useEffect,useState,useLayoutEffect,useRef } from 'react'
import {Text,ToastAndroid,PermissionsAndroid} from 'react-native'
import { Conversation_id_function,startTime } from '../utils/function'
import axios from 'axios'
import LiveAudioStream from '../react-native-live-audio-stream';

const apiData = createContext()

export function useApiData(){
    return useContext(apiData)
}

export function ApiDataProvider({children,session,url}){

    const [allRequests,setAllRequests] = useState([])
    const [conversationId, setConversationId] = useState(Conversation_id_function())
    
    const [loading,setLoading] = useState(false)

    const [generativeQn,setGenerativeQn] = useState()
    const [responseButton,setResponseButton] = useState()
    const [permissionsGranted,setPermissionsGranted] = useState([])
    const [error,setError] = useState()

    const myRef = useRef()
    const [recording,setRecording]= useState(false)
    const base64StorageRef = useRef([])
    const [visibleText,setVisibleText] = useState(false)
    const recordingTimeRef = useRef(null)

    let sessionId = session

    let pageUrl = url
    

    const requestMicrophonePermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the Mic');
            setPermissionsGranted(p=>[...p,PermissionsAndroid.PERMISSIONS.RECORD_AUDIO])
          } else {
            console.log('Mic permission denied');
            ToastAndroid.show("Microphone Permission Denied", ToastAndroid.LONG);
          }
        } catch (err) {
          console.warn(err);
        }
      };
      
     

      useEffect(()=>{
        requestMicrophonePermission()
      },[])

     useEffect(()=>{
        let request = {
            conversationId: conversationId,
            count: 0,
            pageUrl: pageUrl,
            query: "hi!",
            session: sessionId,
            time: startTime(),
            type: "sent",
        }
        
        function firstAPiCall(){

         axios.post(`https://abwm.vitt.ai/`,request).then((response)=>{
               
              handleResponse(response,allRequests,setAllRequests,conversationId,setGenerativeQn)
                
           }).catch((err)=>{
               
              handleRequestError(err)
           })
           request.count++;
        }
        firstAPiCall()
    },[])

    function handleRequestError(error){
        
        console.log("error occured",error)
        let errorsQuery = "";
                    
        if (error.message.includes("Network")) errorsQuery = "There seems to be an issue with your internet connection. Please check."
        else errorsQuery = "Oops! please Please write something..."
        
        let errMsg = {
            session: sessionId,
            query: errorsQuery,
            type: "receive",
            time: startTime(),
            count: allRequests.length,
            conversationId: conversationId
        };
            
        
        setAllRequests([...allRequests,errMsg])
    }
    
    function handleResponse(response,allRequests,setAllRequests,conversationId,setGenerativeQn,request){
                

        let ALL_REQUESTS = [];
        let RESPONSE_BUTTON = [];
        let ACTION_TEXT = [];
        let news = [];
        
        
        let tableData={
             sessionId:sessionId,
             query:{},
             type:"card",
             time:startTime(),
             count:allRequests.length,
             conversationId:conversationId
         };
        
         
         // if there is a table 
         let isTablePresent = false 
         // variable determine the position of table before text msg or after text msg
         // by default table position is after text 
         let tablePosition = false 
         console.log("statement1 crssed",response.data.result)
         if(response.data.result.fulfillment?.data?.type === 'card'){
            
    
             tableData.query = response.data.result.fulfillment.data.data
             isTablePresent= true;
    
             //finding position of table 
             if (response.data.result.fulfillment.data.table === "up") 
                 tablePosition = true
         }
         
         if (isTablePresent && tablePosition) {
             ALL_REQUESTS.push(tableData)
         }
         
         let trial = []
         console.log("statement2 crssed")
         response.data.result.fulfillment?.data?.DownButton.GenerativeQuestion.map((m,i)=>{
             if (trial.length <10) trial.push(m);
         });
         setGenerativeQn([...trial])
         console.log("statement3 crssed")
         response.data.result.fulfillment.messages.map((m)=>{
             
             if(m.type === 0 && m.speech !== ""){
                 m.speech.map((mm) => {
                     let textMsg = {
                         session: sessionId,
                         query: mm,
                         type: "receive",
                         time: startTime(),
                         count: allRequests.length,
                         conversationId: conversationId
                     };
                     ALL_REQUESTS.push(textMsg);
                 });
             }
             else if (m.type === 2 || m.type === 5) {
                 m.replies.map((mm) => {
                     let btnMsg = {
                         session: sessionId,
                         query: mm,
                         newTabUrl: m.type === 5 ? m.urls[0] : null,
                         type: "button",
                         time: startTime(),
                         count: allRequests.length,
                         conversationId: conversationId
                     };
                     // console.log("replies: " + mm);
                     RESPONSE_BUTTON.push(btnMsg);
                 });
             }else if (m.type === 3) {
                    let imageMsg = {
                     session: sessionId,
                     query: m.speech,
                     type: "image",
                     time: startTime(),
                     count: allRequests.length,
                     conversationId: conversationId
                 };
                    ALL_REQUESTS.push(imageMsg);
    
             } else if (m.type === 4 && m.speech !== "") {
                 
                    let myMsg = {
                     session: sessionId,
                     query: m.speech,
                     type: "receive",
                     time: startTime(),
                     count: allRequests.length,
                     conversationId: conversationId
                 };
                 ACTION_TEXT.push(myMsg);
             }
    
         })
    
         if (isTablePresent && !tablePosition) {
             ALL_REQUESTS.push(tableData)
         }
         console.log("statement4 crssed")
        if(request)
        setAllRequests([...allRequests,request,...ALL_REQUESTS,...ACTION_TEXT]);
        else 
        setAllRequests([...allRequests,...ALL_REQUESTS,...ACTION_TEXT]);
        setResponseButton(RESPONSE_BUTTON);
    
       
     }
    
    function handleSearchQuery(input){
        setLoading(true)
        
        if(input==='')
            handleRequestError({message:''})

        let request = {
                conversationId: conversationId,
                count: allRequests.length,
                pageUrl: pageUrl,
                query: input,
                session: sessionId,
                time: startTime(),
                type: "sent"
            }  
        // push request to allRequest array
            
          request.query!=='' && setAllRequests([...allRequests,request])
          setResponseButton()
          scrollHandler()
        //only run the handle Response if input state is available 

            request.query!=='' && axios.post(`https://abwm.vitt.ai/`,request).then((response)=>{
            
                console.log("response",response.data.result.fulfillment.messages)
            
                handleResponse(response,allRequests,setAllRequests,conversationId,setGenerativeQn,request) 
             scrollHandler()

           }).catch((err)=>{
                console.log("error1",err)
                handleRequestError(err)

           })
    
           //request.count++;
    
        setLoading(false)
    }

    function scrollHandler(){

        //need to wait until all the chat msg renders 
        setTimeout(()=>{
            myRef?.current?.scrollToEnd()
        },500)
       
    }
   
    function handleAudioResponse(response){
        let request=null
        handleResponse(response,allRequests,setAllRequests,conversationId,setGenerativeQn,request)
    }

    function sendDataToServer(){
        console.log("send data to server",base64StorageRef.current.length)
        
        const showToast = () => {
          
        }
  
        //showToast()
  
        
        
  
        let d = new Date()
        console.log()
        axios.post('http://35.187.246.238/abfl',{
          sessionid:"abcde456901", 
          from:"abw_mobile_bot", 
          audiomessage:base64StorageRef.current, 
          req_timestamp:`${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`
        })
        .then((res)=>{
          console.warn("res from server",res.data)
          try{
            if(res.data.result.fulfillment)
                handleAudioResponse(res)
                scrollHandler()
          }catch(e){
            console.log("fulfillment not exist",e)
          }
          
         // ToastAndroid.show("data receiving from server", ToastAndroid.SHORT);
        })
        .catch((err)=>{
          console.warn("error",err)
          //ToastAndroid.show(err.toString(), ToastAndroid.SHORT);
        })
        base64StorageRef.current = []
      }
  
      function startRecording(d){
          //setRecording({true})
          LiveAudioStream.start();
        }
  
      function stopRecording(d){
          LiveAudioStream.stop();
          // setTimeout(()=>{
          //   //setRecording(false)
          //   sendDataToServer()
          // },100)
          
      }

      function startTimeCalculation(){

        let d = new Date()

        recordingTimeRef.current=d.getTime()
        console.log("recording time ref",recordingTimeRef.current)
    }

    function stopTimeCalculation(){
        localStartTime=recordingTimeRef.current
        let endDate = new Date()

        timeDiff = endDate.getTime()-localStartTime
        console.log("time",timeDiff/1000," ",timeDiff,endDate.getTime(),localStartTime)
        timeInSec=timeDiff/1000
        if(timeInSec<=1){
          //reset the recordings 
          base64StorageRef.current = []
            setVisibleText(true)
            setTimeout(()=>{
                setVisibleText(false)
            },3000)
        }else{
          sendDataToServer()
        }
    }

      useEffect(()=>{
        const options = {
          sampleRate: 32000,  // default is 44100 but 32000 is adequate for accurate voice recognition
          channels: 1,        // 1 or 2, default 1
          bitsPerSample: 16,  // 8 or 16, default 16
          audioSource: 6,     // android only (see below)
          bufferSize: 4096    // default is 2048
        };
        
        console.log("LiveAudioStream",LiveAudioStream)
        LiveAudioStream.init(options);
        
        let count = 0
        LiveAudioStream.on('data', data => {
          // base64-encoded audio data chunks
          base64StorageRef.current.push(data)
          let d= new Date()
          console.log(base64StorageRef.current.length,d.toLocaleTimeString())
        });
      },[permissionsGranted])

      useEffect(()=>{
        // if(!recording)
        // return ;
        
        // setTimeout(()=>{
        //   stopRecording()
        //   setRecording(false)
        // },3000)
    
      },[recording])

    const values={
        allRequests,
        setAllRequests,
        conversationId,
        error,
        setError,
        responseButton,
        setResponseButton,
        generativeQn,
        setGenerativeQn,
        loading,
        setLoading,
        handleSearchQuery,
        scrollHandler,
        myRef,handleAudioResponse,recording,setRecording,startRecording,stopRecording,
        startTimeCalculation,stopTimeCalculation,visibleText,setVisibleText
    }
    return (
        <apiData.Provider value={values}>
            {children}
        </apiData.Provider>
    )
}




