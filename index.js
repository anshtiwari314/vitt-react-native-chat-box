import React from 'react'
import {InternalStateProvider} from './contexts/InternalStateProvider'
import { ApiDataProvider } from './contexts/ApiDataProvider';
import Bot from './bot/Bot'

export default function VittChatBot({showChatWindow,setShowChatWindow,session=-1,url=null}){

    return <InternalStateProvider showChatWindow={showChatWindow} setShowChatWindow={setShowChatWindow} >
                <ApiDataProvider session={session} url={url}>
                    <Bot/>
                </ApiDataProvider> 
            </InternalStateProvider>
}