import React from 'react'
import {Modal} from 'react-native'
import ChatWindow from './ChatWindow'
import { useInternalState } from '../contexts/InternalStateProvider'
import BotIcon from './BotIcon'

export default function Bot(){
    const {showChatWindow} = useInternalState()
    return (
    <>
        <Modal visible={showChatWindow}>
          <ChatWindow />
        </Modal>
        
        {/* {!isModalOpen && <BotIcon/>} */}
    </>
    )
}