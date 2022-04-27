import React from 'react'
import {View,Text, Pressable,StyleSheet} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'

export default function ResponseButtons(){

    const {responseButton,allRequests,setAllRequests,loading,setLoading,handleSearchQuery} =useApiData()
   
    return(
        // RB => Response Buttons
        <View style={styles.RB}>
            {responseButton && responseButton.map((m,i)=>{
            return  <View key={i} style={styles.RB_wrapper}>
                        <Pressable style={styles.RB_wrapper_button} onPress={()=>{!loading &&  handleSearchQuery(m.query);}}>
                            <Text style={styles.RB_wrapper_button_text}>{m.query}</Text>
                        </Pressable>
                    </View>
            }) }
            
        </View>
    )
}
const styles = StyleSheet.create({
    RB:{
        // position:"absolute",
        marginTop:20,
        bottom:"7%",
        justifyContent:"center",
        // backgroundColor:"pink",

        flexDirection:"row",
        justifyContent:"flex-start",
        flexWrap:"wrap"
    },
    RB_wrapper:{
        borderWidth:2,
        borderColor:"black",
        borderRadius:50,
        margin:5,
        minWidth:"25%",
        backgroundColor:"white",

        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    RB_wrapper_button:{

        padding:5
        
    },
    RB_wrapper_button_text:{
        color:"black"
    }
})

