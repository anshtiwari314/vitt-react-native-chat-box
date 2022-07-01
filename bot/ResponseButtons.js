import React from 'react'
import {View,Text, Pressable,StyleSheet} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'
import { useInternalState } from '../contexts/InternalStateProvider'
import {getSchemaId} from '../utils/function'
import JsonObj from '../utils/url-mappings'

export default function ResponseButtons(){

    const {responseButton,allRequests,setAllRequests,loading,setLoading,handleSearchQuery,scrollHandler} =useApiData()
    const {navigation} = useInternalState()

    
    const investNowProps = JsonObj.filter(ele=>ele.id===1)[0].props
    
    return(
        // RB => Response Buttons
        <View style={styles.RB}>
            {responseButton && responseButton.map((m,i)=>{
                if(m.newTabUrl ){
                    investNowProps.schemaCode = getSchemaId(m.newTabUrl)
                    return  <View key={i*39} style={styles.RB_wrapper}>
                                <Pressable style={styles.RB_wrapper_button} onPress={()=>{navigation.navigate('Addtocart',investNowProps )} }>
                                    <Text style={styles.RB_wrapper_button_text}>{m.query}</Text>
                                </Pressable>
                            </View>
                    
                }else {
                    return  <View key={i*59} style={styles.RB_wrapper}>
                                <Pressable style={styles.RB_wrapper_button} onPress={()=>{!loading &&  handleSearchQuery(m.query);}}>
                                    <Text style={styles.RB_wrapper_button_text}>{m.query}</Text>
                                </Pressable>
                            </View>
                }
            
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







