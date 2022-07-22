import React,{ useEffect } from 'react'
import {View,Text,StyleSheet,Keyboard,ScrollView,} from 'react-native'

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


export default function ChatWindow(){

    const {allRequests,myRef} = useApiData()
    
    const {keyboardStatus,visibleBottomSheet} = useInternalState()


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
            
            </View>
            
            <FooterInput/>
        </>
         

    )
}