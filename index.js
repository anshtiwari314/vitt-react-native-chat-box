import React from 'react'
import {InternalStateProvider} from './contexts/InternalStateProvider'
import { ApiDataProvider } from './contexts/ApiDataProvider';
import Bot from './bot/Bot'
import {Text,View} from 'react-native' 


export default function VittChatBot({navigation ,session=-1,url=null}){


    return  <InternalStateProvider navigation={navigation}>
                <ApiDataProvider session={session} url={url}>
                    <Bot/>
                </ApiDataProvider>
            </InternalStateProvider> 

}

