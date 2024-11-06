import React from 'react'
import {InternalStateProvider} from './contexts/InternalStateProvider'
import { ApiDataProvider } from './contexts/ApiDataProvider';
import Bot from './bot/Bot'
import {Text,View} from 'react-native' 


export default function VittChatBot({navigation ,session=-1,url=null,playAudio}){

    //console.warn(session,url)
    return  <InternalStateProvider navigation={navigation} session={session}>
                <ApiDataProvider session={session} url={url} playAudio={playAudio}>
                    <Bot/>
                </ApiDataProvider>
            </InternalStateProvider> 

}

