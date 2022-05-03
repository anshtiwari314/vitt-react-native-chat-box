import { View, Text,StyleSheet } from 'react-native'
import React,{useState,useEffect} from 'react'

export default function TextMsg ({data,colorType}){


  const [checkUrlExist,setCheckUrlExist] = useState(false)
  const [urlMsg,setUrlMsg] = useState({mainText:"",string:"",link:""})
    
    useEffect(() => {

      function urlFinder(){
        var i1 = data.indexOf('<')

        var i2 = data.indexOf('<', i1 + 1)

        if (i1 !== -1 && i2 !== -1 && i2 - i1 === 1) {

          var index = data.indexOf(":", i2 + 1)
          var index2 = data.indexOf(">", index)

          setUrlMsg({
            mainText: "" + data.substring(0, i1),
            string: "" + data.substring(i2 + 1, index),
            link: "" + data.substring(index + 1, index2)
          })

          setCheckUrlExist(true)

		      }
      }

		data && urlFinder()
	}, [data])


  return (
      <View>
            {checkUrlExist ? 
            <>
              <Text style={styles.TM_text}>{urlMsg?.mainText} {urlMsg?.string}</Text> 
              <Text style={styles.TM_link}>{urlMsg.link}</Text>
            </> 
            : 
            <Text style={colorType}>{data}</Text>
            }
      </View>
  )
}

const styles = StyleSheet.create({
  TM:{

  },
  TM_text:{
    color:"white"
  },
  TM_link:{
    color:"#3E593c"
  },
  text:{
    color:"white",
  },
})
