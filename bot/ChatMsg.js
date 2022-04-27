import React from 'react'
import {Text,View,StyleSheet } from 'react-native'

export function SendingMessage({Component,query,time}){
    return <View style={styles.SM}>
                <View style={styles.SM_container}>
                    {/* <Text style={styles.text}>Latest News</Text> */}
                    <Component data={query}/>
                    <Text style={styles.time}>{time}</Text>
                </View>
            </View>
}

export function ReceivingMessage({Component,query,time}){

    return (
        <View style={styles.RM}>
            <View style={styles.RM_container}>
                {/* <Text style={styles.text}>Hello Guest, can I help you by finding your product of interest?</Text> */}
                <Component data={query}/>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
    )
}
// RM => Receiving MSG 
// SM => Sending MSG
const styles = StyleSheet.create({
    RM:{
        flexDirection:"row",
        justifyContent:"flex-start",
        alignItems:"center",
        margin:10,
        boxSizing:"border-box",
        //backgroundColor:"#219f6e"
    },
    RM_container:{
        // position:"absolute",
        // left:5,
        justifyContent:"center",
        alignItems:"flex-start",
        minWidth:"10%",
        maxWidth:"95%",
        padding:10,
        borderRadius:20,
        borderBottomLeftRadius:0,
        backgroundColor:"#969f6e",
        
    },
    SM:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        margin:10,
        boxSizing:"border-box",
        //backgroundColor:"#219f6e"
    },
    SM_container:{
        // position:"absolute",
        // right:5,

        
        justifyContent:"center",
        alignItems:"flex-end",
        minWidth:"10%",
        maxWidth:"90%",
        padding:10,
        borderRadius:20,
        borderBottomRightRadius:0,
        backgroundColor:"#a8a8a8"
    },
   
    text:{
        color:"white",
        //backgroundColor:"green"
    },
    time:{
        marginTop:10,
        color:"white"
    }
})