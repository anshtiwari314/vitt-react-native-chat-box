import React from 'react'
import {Text,View,StyleSheet } from 'react-native'

export function SendingMessage({Component,query,time}){
    return <View style={styles.SM}>
                <View style={styles.SM_container}>
                    {/* <Text style={styles.text}>Latest News</Text> */}
                    <Component data={query} colorType={styles.SM_text}/>
                    <Text style={styles.SM_time}>{time}</Text>
                </View>
            </View>
}

export function ReceivingMessage({Component,query,time}){

    return (
        <View style={styles.RM}>
            <View style={styles.RM_container}>
                {/* <Text style={styles.text}>Hello Guest, can I help you by finding your product of interest?</Text> */}
                <Component data={query} colorType={styles.RM_text}/>
                <Text style={styles.RM_time}>{time}</Text>
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
        
        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        shadowOpacity:0.5,

        elevation:10,
    },
    SM:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        margin:10,
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
        backgroundColor:"#f1f3f6",

        shadowColor:"#000000",
        shadowOffset:{width:0,height:2},
        shadowRadius:5,
        shadowOpacity:0.5,

        elevation:10,
    },
    RM_text:{
        color:"white"
    },
    SM_text:{
        color:"#3e593c"
    },
    RM_time:{
        marginTop:10,
        color:"white"
    },
    SM_time:{
        marginTop:10,
        color:"#3e593c"
    }
    
})