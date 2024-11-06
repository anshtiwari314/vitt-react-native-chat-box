# vitt-react-native-chat-box

A chat bot featured AI integration 
## Dependencies

Axios 

```bash
  npm install axios
```
React Navigation
```bash 
    npm install @react-navigation/native
```




React Native Vector Icons [[installation guide]](https://www.npmjs.com/package/react-native-vector-icons)
```bash 
    npm i react-native-vector-icons
```
## Installation

Clone in your root project directory

```bash
  git clone https://github.com/anshtiwari314/vitt-react-native-chat-box
```
  

```bash
  import VittBot from './vitt-react-native-chat-box'
```

Declare permissions in  android/app/src/main/AndroidManifest.xml
```bash
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
```


## Usage/Examples

App.js (with navigation) 
 

```javascript 

function App() {

// u can also use navigation other than stack

  const sessionId = 'provide session id here'
  const currentUrl = 'provide Ip from where the request to be sent'
  

  const Stack = createStackNavigator()

  return (
    
    <NavigationContainer >
      <Stack.Navigator>
          
         <Stack.Screen name="VittBot" options={{headerShown:false}}>
             {(props)=> <VittBot {...props} session={sessionId} url={currentUrl} />}
          </Stack.Screen> 
          
          <Stack.Screen name="Addtocart" component={Addtocart}/>
          <Stack.Screen name="ELSS" component={ELSS}/>
          <Stack.Screen name="ExploreNewFunds" component={ExploreNewFunds}/>
          <Stack.Screen name="Loans" component={Loans}/>
          <Stack.Screen name="MyReports" component={MyReports}/>
          <Stack.Screen name="MySip" component={MySip}/>
          <Stack.Screen name="MyTransaction" component={MyTransaction}/>
          <Stack.Screen name="NFO" component={NFO}/>
          <Stack.Screen name="Portfolio" component={Portfolio}/>
          <Stack.Screen name="Tax" component={Tax}/>
          <Stack.Screen name="TopTabBarDashboard" component={TopTabBarDashboard}/>
          <Stack.Screen name="Transaction" component={Transaction}/>
          <Stack.Screen name="WEALTH" component={WEALTH}/> 
      </Stack.Navigator>
    </NavigationContainer>
```


## Props


| Parameter           | Type        | Description    | Default value                |
| :--------           | :-------    | :------------  | :-------------------------   |  
| `session`           |  `String`   | **Optional**   | -1
| `url`               | `String`    | **Optional**   |   null


