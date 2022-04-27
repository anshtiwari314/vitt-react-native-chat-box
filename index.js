import React from 'react'
import {InternalStateProvider} from './contexts/InternalStateProvider'
import { ApiDataProvider } from './contexts/ApiDataProvider';
import Bot from './bot/Bot'

export default function VittChatBot({showChatWindow,setShowChatWindow}){

    return <InternalStateProvider showChatWindow={showChatWindow} setShowChatWindow={setShowChatWindow} >
                <ApiDataProvider>
                    <Bot/>
                </ApiDataProvider> 
            </InternalStateProvider>
}