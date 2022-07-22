import React, {createContext, useContext, useEffect,useState,useLayoutEffect,useRef } from 'react'
import {Text} from 'react-native'
import { Conversation_id_function,startTime } from '../utils/function'
import axios from 'axios'

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
    const [error,setError] = useState()

    const myRef = useRef()

    
    let sessionId = session

    let pageUrl = url
    


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
         
         if(response.data.result.fulfillment.data.type === 'card'){
    
    
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
         response.data.result.fulfillment.data.DownButton.GenerativeQuestion.map((m,i)=>{
             if (trial.length <10) trial.push(m);
         });
         setGenerativeQn([...trial])
    
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
            
            
             handleResponse(response,allRequests,setAllRequests,conversationId,setGenerativeQn,request) 
             scrollHandler()

           }).catch((err)=>{

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
        myRef,
    }
    return (
        <apiData.Provider value={values}>
            {children}
        </apiData.Provider>
    )
}




