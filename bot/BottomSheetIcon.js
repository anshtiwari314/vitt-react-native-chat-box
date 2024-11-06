import React,{useState} from 'react' 
import {View,Text,StyleSheet,Pressable,Image} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'
import { useInternalState } from '../contexts/InternalStateProvider'
import BottomSheet from './BottomSheet'



export default function BottomSheetIcon(){

    // BSB => Bottom sheet Icon
    const {visibleBottomSheet,setVisibleBottomSheet} = useInternalState()
    
    return (
        <>
        <View style={styles.BSI}>
            <Pressable style={styles.BSI_button} onPress={()=>setVisibleBottomSheet(prev=>!prev)}>
                <Image 
                    style={styles.BSI_button_image}
                    source={visibleBottomSheet ?require('../images/arrowDown.png'): require("../images/arrowUp.png")}    
                />
            </Pressable>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    
    BSI:{
        position:"absolute",
        bottom:0,
        right:5,
        zIndex:5,
        // borderRadius:50,
        //backgroundColor:"red"
    },
    BSI_button:{
        borderRadius:50,
        padding:10,
        backgroundColor:"#d6d6d6",
        // borderWidth:5,
        // borderColor:"black"
    },
    BSI_button_image:{
        width:20,
        height:20
    }
})