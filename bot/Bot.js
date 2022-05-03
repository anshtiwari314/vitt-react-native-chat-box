import React from 'react'
import {View} from 'react-native'
import ChatWindow from './ChatWindow'
import { useInternalState } from '../contexts/InternalStateProvider'
// import BotIcon from './BotIcon'

export default function Bot(){
    const {showChatWindow} = useInternalState()
    return (
    <>
        <View visible={showChatWindow} style={{flex:1,flexDirection:"column",position:"relative",backgroundColor:"white"}} >
          <ChatWindow />
        </View>
        
    </>
    )
}