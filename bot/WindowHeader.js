import React from 'react'
import {Text,View,Image,StyleSheet, Pressable} from 'react-native'
import { useInternalState } from '../contexts/InternalStateProvider'

export default function WindowHeader(){
    

    const {keyboardStatus} = useInternalState()


    return (
        <View style={{flex:keyboardStatus ? 2: 2,backgroundColor:"#c72229",justifyContent:"space-between",flexDirection:"column"}}>
            <View style={styles.contA}>
                
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
        backgroundColor:"#c72229",
        position:"relative",
        flexDirection:"column",
        justifyContent:"space-between",
        // height:100,
        
    },
    contA:{
        position:"relative",
        // height:"20%",
        flex:1
        //backgroundColor:"violet"
    },
    contA_image:{
        width:20,
        height:20,
        position:"absolute",
        top:5,
        right:10
    },
    contB:{
        // height:"35%",
        flex:4,
        width:"95%",
        marginLeft:"2.5%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"flex-end",
        // borderTopWidth:1,
        //borderColor:'#e38f81',
        //backgroundColor:"orange",
        
    },
    contB_textWrapper:{
        marginTop:0,
        paddingTop:0
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
        // position:"absolute",
        // bottom:0,
        //height:
        flex:5,
        marginTop:2,
        width:"100%",
        display:"flex",
        justifyContent:"center"
    },
    contC_text:{
        //marginLeft:"5%",
        textAlignVertical:"center",
        height:"100%",
        fontSize:13,
        padding:"1%",
        paddingLeft:"2.5%",
        paddingRight:"2.5%",
        color:"white",
        width:"100%",
        backgroundColor:"#969f6e",
    }
})