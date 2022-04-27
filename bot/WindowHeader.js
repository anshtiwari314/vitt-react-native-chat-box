import React from 'react'
import {Text,View,Image,StyleSheet, Pressable} from 'react-native'
import { useInternalState } from '../contexts/InternalStateProvider'

export default function WindowHeader(){

    const {setShowChatWindow} = useInternalState()

    
    return (
        <View style={styles.container}>
            <View style={styles.contA}>
                <Pressable onPress={()=>{setShowChatWindow(false)}}>
                    <Image  style={styles.contA_image} source={require("../images/remove.png")}/>
                </Pressable>
                
            </View>
            <View style={styles.contB}>
                <View style={styles.contB_textWrapper}>
                    <Text style={styles.contB_textWrapper_text}>Wealth assist</Text>
                </View>
                <Image 
                    source={{uri:"https://c3india.s3.ap-south-1.amazonaws.com/public_assets/data/000/000/344/original/BirlaCapitalLogo_jpeg?1538291690"}}
                    style={styles.contB_image}
                />


            </View>
            <View style={styles.contC}> 
                <Text style={styles.contC_text}>Aditya Birla Finance Limited (AMFL registered Fund Distributor)</Text>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        width:"100%",
        backgroundColor:"#c72229"
    },
    contA:{
        position:"relative",
        height:30,
    },
    contA_image:{
        width:20,
        height:20,
        position:"absolute",
        top:5,
        right:10
    },
    contB:{
        width:"95%",
        marginLeft:"2.5%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        // borderTopWidth:1,
        borderColor:'#e38f81'
    
    },
    contB_textWrapper:{
        
    },
    contB_textWrapper_text:{
        color:"white",
        letterSpacing:1,
        textTransform:"uppercase"
    },
    contB_image:{
        width:126,
        height:30,
    },
    contC:{
        backgroundColor:"#969f6e",
        marginTop:5
    },
    contC_text:{
        marginLeft:10,
        color:"white",
        
    }
})