import React,{ useEffect } from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import { ReceivingMessage, SendingMessage } from './ChatMsg'
import WindowHeader from './WindowHeader'
import FooterInput from './FooterInput'

import TableMsg from './TableMsg'
import TextMsg from './TextMsg'

import BottomSheetIcon from './BottomSheetIcon'
import ResponseButtons from './ResponseButtons'
import { useInternalState } from '../contexts/InternalStateProvider'
import { startTime } from '../utils/function'
import {ImageMsg} from './ImageMsg'
import { useApiData } from '../contexts/ApiDataProvider'
import BottomSheet from './BottomSheet'


export default function ChatWindow(){

    const {allRequests,error,setError,refs,setRefs} = useApiData()
    const {visibleBottomSheet} = useInternalState()
    
    useEffect(()=>{
        console.log('i am length',allRequests.length)
        refs?.scrollTo({
            y:allRequests.length-1,
        })
    },[refs])

    return (
        <>
            <WindowHeader />
            
            {/* <ReceivingMessage Component={Text} data={"Hello Guest, can I help you by finding your product of interest?"}/> */}
            <View style={{height:"78%",backgroundColor:"white",position:'relative',marginTop:5,}} >
            <ScrollView ref={(ref)=>{setRefs(ref)}}  >
             {allRequests && allRequests.map((m,i)=>{
                if(m.query !==""){
                    if(m.type == "receive" )
                        return <ReceivingMessage key={i} Component={TextMsg} query={m.query} time={m.time}/>
                    else if(m.type == "sent")
                        return <SendingMessage key={i} Component={TextMsg} query={m.query} time={m.time}/>
                    else if(m.type == "card")
                        return <ReceivingMessage key={i} Component={TableMsg} query={m.query} time={m.time}/>
                    else if(m.type == "image")
                        return <ReceivingMessage key={i} Component={ImageMsg} query={m.query} time={m.time} />
                
                }
                else return null
            })
            
            } 
                <ResponseButtons/>
            </ScrollView>
            </View>
            

            {visibleBottomSheet && <BottomSheet/> }
            <BottomSheetIcon/>
            <FooterInput/> 
            
        </>
         

    )
}
