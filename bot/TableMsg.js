import { View, Text,StyleSheet,Pressable } from 'react-native'
import React from 'react'
import { useApiData } from '../contexts/ApiDataProvider'


export default function TableMsg ({data}) {
    const {loading,allRequests,setAllRequests,setLoading,handleSearchQuery} = useApiData()
  return (

    
      //TM => TableMsg
    <View style={styles.TM}>

        {/* Table Title */}
        <Text style={styles.TM_title}>{data.entries.title}</Text>

         {/* Table headings */}
        <View style={styles.TM_row_header}>
          {data.entries.headings.map((heading,i)=>{
              return <View key={i} style={styles.TM_col_header}>
                        <Text style={styles.TM_text_header}>
                            {heading}
                        </Text>
                    </View>
          })}
        
         {/* Table data */}
        </View>

          {
              data.entries.values.map((dataRows,i)=>{
                  return <View style={styles.TM_row_data} key={i*723}>
                      {dataRows.map((entry,i)=>{
                        return <View style={styles.TM_col_data} key={i*333}>
                                    <Pressable 
                                        style={styles.TM_text_data} 
                                        onPress={()=>{entry.hyperlink!==null && !loading &&  handleSearchQuery(entry.value,allRequests,setAllRequests,setLoading)}}>
                                            <Text style={[styles.TM_text_data,{color:`${entry.hyperlink ? '#c72229':'white'}`,fontWeight:"bold"}]} >
                                                {entry.value}
                                            </Text>
                                    </Pressable>
                                </View>
                      })}
                      </View>
                
                })
          }
      
    </View> 
  )
}

const styles = StyleSheet.create({
    TM:{
        backgroundColor:"#969f6e",
        width:250
    },
    TM_title:{
        color:"white",
        paddingTop:5,
        paddingBottom:10
    },
    TM_row_header:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"white",
        
    },
    TM_row_data:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"white",
        
    },
    TM_col_header:{
        //borderWidth:1,
        //borderColor:"white",
        fontWeight:"bold",
        padding:5,
        flex:1,
    },
    TM_col_data:{
        //borderWidth:1,
        //borderColor:"white",
        padding:5,
        flex:1,
    },
   TM_text_header:{
        color:"white"
   },
   TM_text_data:{
        color:"white",
        
        textDecorationColor:"#223344",
        //textDecorationLine:"underline blue"
   }
})