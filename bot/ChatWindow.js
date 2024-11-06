import React,{ useEffect, useRef, useState } from 'react'
import {View,Text,StyleSheet,Keyboard,ScrollView,Button,TouchableOpacity, Image} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

import { ReceivingMessage, SendingMessage } from './ChatMsg'
import WindowHeader from './WindowHeader'
import FooterInput from './FooterInput'

import TableMsg from './TableMsg'
import TextMsg from './TextMsg'

import BottomSheetIcon from './BottomSheetIcon'
import ResponseButtons from './ResponseButtons'
import { useInternalState } from '../contexts/InternalStateProvider'

import ImageMsg from './ImageMsg'
import { useApiData } from '../contexts/ApiDataProvider'
import BottomSheet from './BottomSheet'
import { startTime } from '../utils/function'


export default function ChatWindow(){

    const {allRequests,myRef} = useApiData()
    
    const {keyboardStatus,visibleBottomSheet,setRecording} = useInternalState()
    const {startRecording,stopRecording,startTimeCalculation,stopTimeCalculation,visibleText,setVisibleText} = useApiData()
    

    useEffect(()=>{

    },[])

    

    return (
        <>
            
            <WindowHeader />
            
            {/* <ReceivingMessage Component={Text} data={"Hello Guest, can I help you by finding your product of interest?"}/> */}
            
            {/* <View style={{flex:keyboardStatus ? 6 : 10,marginTop:2,backgroundColor:"orange"}} > */}
            <View style={{flex:keyboardStatus ? 0.72 : 0.77 , paddingTop:2,backgroundColor:"white"}} >
            <ScrollView ref={(ref)=>{myRef.current=ref }} >
             {allRequests && allRequests.map((m,i)=>{
                if(m.query !==""){
                    if(m.type == "receive" )
                        return <ReceivingMessage key={i} Component={TextMsg} query={m.query} time={m.time}/>
                    else if(m.type == "sent")
                        return <SendingMessage key={i} Component={TextMsg} query={m.query} time={m.time}/>
                    else if(m.type == "card")
                        return <ReceivingMessage key={i} Component={TableMsg} query={m.query} time={m.time}/>
                    else if(m.type == "image"){
                            //return <ReceivingMessage key={i} Component={TextMsg} query={'hello'} time={'07:55 PM'}/>
                        return <ReceivingMessage key={i} Component={ImageMsg} query={m.query} time={m.time} />
                    
                    }
                
                }
                else return null
            })
            
            } 
                <ResponseButtons/>
               
            </ScrollView>
            
            <View style={{position:'relative'}}>
                <View
                     
                    style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center',marginBottom:10,width:'100%'}}
                >
                {/* <Text style={{paddingVertical:5,fontSize:15,backgroundColor:'#007bff'}}>Hold me</Text>     */}
                {/* <Image 
                    style={{backgroundColor:'gray',width:50,height:50}}
                    source={{
                        uri:'https://e7.pngegg.com/pngimages/333/606/png-clipart-microphone-computer-icons-dictation-machine-microphone-electronics-microphone.png'
                    }}
                /> */}
                
                {
                    visibleText ?
                    <View style={{position:'absolute',padding:10,bottom:75,right:10,borderRadius:8,backgroundColor:'teal'}}>
                    
                    
                    <Text style={{color:'white',zIndex:2}}>Hold to record, release to send</Text>
                    <View style={{position:'relative'}}>
                        <View style={{position:'absolute',zIndex:0,right:10,backgroundColor:'teal',width:15,height:15,transform: [{ rotate: '45deg'}]}}>
                        
                        </View>
                    </View>
                </View>:null
                }
                
                <TouchableOpacity 
                
                onPressOut={ () => {stopRecording();setTimeout(stopTimeCalculation,100) }}
                onLongPress={ () => {startRecording();startTimeCalculation()} }
                onPress={()=>startTimeCalculation()}

                style={{padding:10,borderColor:'#c72229',borderWidth:2,backgroundColor:'white',position:'absolute',bottom:10,right:10}}>

                    <Icon name="microphone" size={30} color= '#c72229'/>
                </TouchableOpacity>
                
                </View>
                {/* <Button onPress={()=>{}} title="Mic button"/> */}
                
            </View>
            </View>
            
            <FooterInput/>
        </>
         

    )
}