import React from 'react'
import {Image,StyleSheet} from 'react-native'

export default function ImageMsg({data}){
    return <Image style={styles.img} source={{uri:`${data}`}}/>
} 

const styles = StyleSheet.create({
    img:{
        marginTop:10,
        width:250,
        height:160,
        borderRadius:10
    }
})