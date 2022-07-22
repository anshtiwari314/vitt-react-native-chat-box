import React from 'react'
import {KeyboardAvoidingView, View,Dimensions, Platform} from 'react-native'
import ChatWindow from './ChatWindow'
import { useInternalState } from '../contexts/InternalStateProvider'
// import BotIcon from './BotIcon'

export default function Bot(){
    
    const HEIGHT_AT_TOP = Dimensions.get('window').height*0.05;
    const REMAINING_HEIGHT = Dimensions.get('window').height*0.95;

    return (
    <View style={{flex:1}}>
        <KeyboardAvoidingView style={{flex:1,backgroundColor:"black",paddingTop:Platform.OS =='ios' ? HEIGHT_AT_TOP: 0}} behavior={Platform.OS=='ios' ? 'padding':'none '}  >
        <ChatWindow />
        </KeyboardAvoidingView>
    </View>
    )
}