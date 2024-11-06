import React, { useEffect, useState } from 'react'
import {ScrollView,KeyboardAvoidingView,TouchableWithoutFeedback,View,StyleSheet,
        Text,Image,TextInput, Pressable, Keyboard, Platform} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useApiData } from '../contexts/ApiDataProvider'
import { useInternalState } from '../contexts/InternalStateProvider'


export default function FooterInput(){

    const {handleSearchQuery,loading,scrollToIndex,setScrollToIndex,scrollHandler} = useApiData()

    const [input,setInput] = useState('')
    const {keyboardStatus,visibleBottomSheet} = useInternalState()
    
    return(
        //FI => footer input
         
                        <View style={{flex:keyboardStatus? 0.13: 0.08,flexDirection:"row"}} >
                                <TextInput
                            style={styles.FI_input}

                            onChangeText={(text)=>setInput(text)}
                            value={input}
                            
                            placeholder="Type it here"
                            placeholderTextColor={"white"}
                            // keyboardType="numeric"
                        />
                        <Pressable style={{

                        }}>
                            
                        </Pressable>
                        <Pressable style={{
                            //borderWidth:5,
                            //borderColor:'black',
                            width:"15%",
                            height:"100%",
                            // minHeight:50,
                            justifyContent:"center",
                            alignItems:"center",
                            backgroundColor:"#c72229"
                        }} 
                        onPress={()=>{!loading && Keyboard.dismiss(); handleSearchQuery(input); setInput("");
                        }}>
                            <Image 
                                source={require('../images/send16x16.png')}
                                style={{
                                    width:"40%",
                                    height:"40%",
                                    backgroundColor:"#c72229"
                                }}
                            />
                        </Pressable>
                        </View>
        
    )
} 

const styles= StyleSheet.create({
    FI:{
           
    },
    FI_input:{
        height:"100%",
        width:"85%",
        borderWidth:1,
        borderColor:"#c72229",
        backgroundColor:"gray",
        paddingTop:5,
        paddingBottom:10,
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
