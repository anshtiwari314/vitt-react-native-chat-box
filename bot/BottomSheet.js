import React from 'react' 
import {StyleSheet,View,Text,Pressable} from 'react-native'
import { useApiData } from '../contexts/ApiDataProvider'
import { useInternalState } from '../contexts/InternalStateProvider'

export default function BottomSheet(){

    const {generativeQn,handleSearchQuery,allRequests,setAllRequests,loading,setLoading} = useApiData()
    
    const {setVisibleBottomSheet} = useInternalState()
    
    return (
        //BS => Bottom sheet
    <View style={styles.BS}>
        {generativeQn && generativeQn.map((m,i)=>{
            return <View key={i} style={styles.BS_item}>
                        <Pressable style={styles.BS_item_button} onPress={()=>{ setVisibleBottomSheet(false);!loading && handleSearchQuery(m)}}>
                            <Text style={styles.BS_item_button_text}>{m}</Text>
                        </Pressable>
                    </View>
            })}
    </View>
    )
}

const styles = StyleSheet.create({
    BS:{
        position:"absolute",
        bottom:100,
        width:"90%",
        marginLeft:"3%",
        backgroundColor:"white",
        borderWidth:2,
        borderColor:"gray"
    },
    BS_item:{
        borderWidth:1,
        borderColor:"gray", 

        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    BS_item_button:{
        width:"100%",
        height:"100%",
        padding:5,
      
    },
    BS_item_button_text:{
        color:"black"
    }
})