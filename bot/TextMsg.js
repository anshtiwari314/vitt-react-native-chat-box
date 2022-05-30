import { View, Text,StyleSheet,TouchableOpacity,Linking } from 'react-native'
import React,{useState,useEffect} from 'react'
import urlMapping from '../utils/url-mappings'
import { useInternalState } from '../contexts/InternalStateProvider'

export default function TextMsg ({data,colorType}){

  const {navigation} = useInternalState()
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

  let flag = false

 

  return (
      <View>
            {checkUrlExist ? 
            <>
              <Text style={styles.TM_text}>{urlMsg?.mainText} {urlMsg?.string}</Text> 
                  
                  <>
                  {
                  urlMapping.map((ele,i) => {
                    
                      if(ele.url===urlMsg.link){
                        flag=true
                      return  <TouchableOpacity key={i} onPress={()=>navigation.navigate(ele.page,ele.props)}>
                                <Text style={styles.TM_link}>{urlMsg.link}</Text>
                              </TouchableOpacity>
                      }
                    })
                  }
                  
                  {
                    flag===false && 
                    <Text 
                        key={Math.floor(Math.random() * (3000 - 2077 + 1) + 2077)}      
                        style={styles.TM_link} 
                        onPress ={()=>{Linking.openURL(`${urlMsg.link}`)} }
                        >
                          {urlMsg.link}
                    </Text>
                   
                  }
                    </>
              
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
