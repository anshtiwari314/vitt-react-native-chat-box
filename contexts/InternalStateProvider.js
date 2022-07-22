import React,{createContext,useContext,useState,useEffect,useRef} from 'react'
import {View,Text,Keyboard} from 'react-native'


const InternalState = createContext()

export function useInternalState(){
   return useContext(InternalState)
} 

export function InternalStateProvider({children,navigation}){

    const [item,setItem] = useState({
        isActive:false,
        icon:"../images/Fab64x64.png"
    });
    
    const [notification,setNotification] = useState(-1);
    const [visibleBottomSheet,setVisibleBottomSheet] = useState(false)
    const [keyboardStatus,setKeyboardStatus] = useState(false)
    const keyboardRef=useRef(false)

    useEffect(()=>{
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus(true);
            keyboardRef.current =true
          });

          const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus(false);
            keyboardRef.current = false
          });
      
          return () => {
            showSubscription.remove();
            hideSubscription.remove();
          };
    },[])
    
    const values ={
        item,
        setItem,
        notification,
        setNotification,
        visibleBottomSheet,
        setVisibleBottomSheet,
        keyboardStatus,
        keyboardRef,
        navigation
    }
    return(
        <InternalState.Provider value={values}>
            {children}
        </InternalState.Provider>
    )
}