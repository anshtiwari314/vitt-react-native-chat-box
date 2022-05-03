import React,{ useEffect } from 'react'
import {View,Text,StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native'
import { ReceivingMessage, SendingMessage } from './ChatMsg'
import WindowHeader from './WindowHeader'
import FooterInput from './FooterInput'

import TableMsg from './TableMsg'
import TextMsg from './TextMsg'

import BottomSheetIcon from './BottomSheetIcon'
import ResponseButtons from './ResponseButtons'
import { useInternalState } from '../contexts/InternalStateProvider'
import { startTime } from '../utils/function'
import ImageMsg from './ImageMsg'
import { useApiData } from '../contexts/ApiDataProvider'
import BottomSheet from './BottomSheet'


export default function ChatWindow(){

    const {allRequests,error,setError,refs,setRefs,myRef} = useApiData()
    
    const {keyboardStatus,visibleBottomSheet} = useInternalState()


    return (
        <>
            
            <WindowHeader />
            
            {/* <ReceivingMessage Component={Text} data={"Hello Guest, can I help you by finding your product of interest?"}/> */}
            <View style={{height:"70%",flex:keyboardStatus ? 6 : 10,marginTop:2,backgroundColor:"white"}} >
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
                            console.log('i am image query',m.query)
                            //return <ReceivingMessage key={i} Component={TextMsg} query={'hello'} time={'07:55 PM'}/>
                        return <ReceivingMessage key={i} Component={ImageMsg} query={m.query} time={m.time} />
                    
                    }
                
                }
                else return null
            })
            
            } 
                <ResponseButtons/>

               
            </ScrollView>
            
            </View>
            
            <KeyboardAvoidingView style={{width:"90%",position:"absolute",bottom:keyboardStatus ? 75:100,right:5}}> 
                    {visibleBottomSheet && <BottomSheet/> }
                    <BottomSheetIcon/>
            </KeyboardAvoidingView>
                    
                    {/* <FooterInput/> */}
                    
            {/* <KeyboardAvoidingView style={{position:"absolute",bottom:0}}> 
                    <FooterInput/>
            </KeyboardAvoidingView> */}
            <KeyboardAvoidingView style={{flex:keyboardStatus ? 1 : 1}}> 
                    <FooterInput/>
            </KeyboardAvoidingView>
            
        </>
         

    )
}