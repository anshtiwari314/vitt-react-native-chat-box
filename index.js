import React from 'react'
import {InternalStateProvider} from './contexts/InternalStateProvider'
import { ApiDataProvider } from './contexts/ApiDataProvider';
import Bot from './bot/Bot'
import {Text,View} from 'react-native' 


export default function VittChatBot({navigation,showChatWindow,setShowChatWindow=null,session=-1,url=null}){


    return  <InternalStateProvider showChatWindow={showChatWindow} setShowChatWindow={setShowChatWindow} navigation={navigation}>
                <ApiDataProvider session={session} url={url}>
                    <Bot/>
                </ApiDataProvider>
            </InternalStateProvider> 
}

