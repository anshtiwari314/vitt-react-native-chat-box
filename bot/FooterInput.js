import React, { useEffect, useState } from 'react'
import {View,StyleSheet,Text,Image,TextInput, Pressable} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'


export default function FooterInput(){

    const {handleSearchQuery,loading,scrollToIndex,setScrollToIndex,scrollHandler} = useApiData()

    const [input,setInput] = useState()
    
    
    
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
                <Pressable style={styles.FI_button} onPress={()=>{!loading &&  handleSearchQuery(input); setInput(""); }}>
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
        position:"absolute",
        width:"100%",
        bottom:2,
        //backgroundColor:"pink"
    },
    container:{
        
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
       // backgroundColor:"aqua"
    },
    FI_input:{
        width:"85%",
        borderWidth:1,
        borderColor:"#c72229",
        backgroundColor:"gray",
        paddingLeft:10,
        color:"white"
    },
    FI_button:{
       width:"15%",
       height:"100%",
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

