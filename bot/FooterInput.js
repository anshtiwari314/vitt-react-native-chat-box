import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,Image,TextInput, Pressable, Keyboard} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'
import { useInternalState } from '../contexts/InternalStateProvider'


export default function FooterInput(){

    const {handleSearchQuery,loading,scrollToIndex,setScrollToIndex,scrollHandler} = useApiData()

    const [input,setInput] = useState('')
    

    
    
    return(
        //FI => footer input
        <View style={styles.FI}>
            <View style={styles.container}>
                <TextInput
                    style={styles.FI_input}
                    onChangeText={(text)=>setInput(text)}
                    value={input}
                    
                    placeholder="Type it here"
                    placeholderTextColor={"white"}
                    // keyboardType="numeric"
                />
                <Pressable style={styles.FI_button} onPress={()=>{!loading && Keyboard.dismiss(); handleSearchQuery(input); setInput("");}}>
                    <Image 
                        source={require('../images/send16x16.png')}
                        style={styles.FI_button_image}
                    />
                </Pressable>
            </View>
        </View>
    )
} 

const styles= StyleSheet.create({
    FI:{
        height:"100%",
        //position:"absolute",
        width:"100%",
        //bottom:0,
        backgroundColor:"orange"
    },
    container:{
        height:"100%",
        backgroundColor:"pink",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
       // backgroundColor:"aqua"
    },
    FI_input:{
        // minHeight:50,
        height:"100%",
        width:"85%",
        borderWidth:1,
        borderColor:"#c72229",
        backgroundColor:"gray",
        paddingTop:0,
        paddingBottom:0,
        paddingLeft:10,
        color:"white"
    },
    FI_button:{
        width:"15%",
        height:"100%",
        // minHeight:50,
       justifyContent:"center",
       alignItems:"center",
       backgroundColor:"#c72229"
    },
    FI_button_image:{
        width:"40%",
        height:"40%",
        backgroundColor:"#c72229"
    }
})
