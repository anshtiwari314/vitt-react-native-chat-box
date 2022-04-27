// predefined components
import React,{useState} from 'react'
import {Text,Image,View,Modal,Pressable,StyleSheet} from 'react-native'
import { RotationGestureHandler } from 'react-native-gesture-handler';

//utilities
import uuid from '../../utils/utils.js'
import { useInternalState } from '../contexts/InternalStateProvider';

// user defined components
import ChatWindow from './ChatWindow'


export default function BotIcon(){
    
    const {setIsModalOpen} = useInternalState()

    return (
        <View>
            
            <View style={styles.wrapper}>
                <Pressable onPress={()=>setIsModalOpen(true)} style={styles.button}>
                    <Image style={styles.image} source={require(`../../images/Fab64x64.png`)}  />
                </Pressable>
            </View>
            
        </View>
    )
}

const styles= StyleSheet.create({
    wrapper:{
        
        // backgroundColor:"violet",
        height:"100%",
        width:"100%",

    },
    button:{
        position:"absolute",
        right:5,
        bottom:25,
        backgroundColor:"black",
        padding:20,
        borderRadius:35,
    },
    image:{
        height:30,
        width:30 
    },
    
    
})