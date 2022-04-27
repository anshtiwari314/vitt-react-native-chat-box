import React,{createContext,useContext,useState} from 'react'
import {View,Text} from 'react-native'


const InternalState = createContext()

export function useInternalState(){
   return useContext(InternalState)
} 

export function InternalStateProvider({children,showChatWindow,setShowChatWindow}){

    
    console.log('i am showChatWindow',showChatWindow)

    const [item,setItem] = useState({
        isActive:false,
        icon:"../images/Fab64x64.png"
    });
    

    const [notification,setNotification] = useState(-1);
    const [visibleBottomSheet,setVisibleBottomSheet] = useState(false)

    const values ={
        item,
        setItem,
        showChatWindow,
        setShowChatWindow,
        notification,
        setNotification,
        visibleBottomSheet,
        setVisibleBottomSheet
    }
    return(
        <InternalState.Provider value={values}>
            {children}
        </InternalState.Provider>
    )
}