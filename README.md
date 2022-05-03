
# vitt-react-native-chat-box

A chat bot featured AI integration 




## Dependencies

Axios 

```bash
  npm install axios
```

## Installation

clone in your root project directory

```bash
  git clone https://github.com/anshtiwari314/vitt-react-native-chat-box
```
  

```bash
  import VittBot from './vitt-react-native-chat-box'
```
    
## Usage/Examples

App.js 

```javascript

import VittBot from './vitt-react-native-chat-box'
import React,{useState} from 'react'

const [showChatWindow,setShowChatWindow] = useState(true)

const sessionId = 'provide session id here'
const currentUrl = 'provide Ip from where the request to be sent'

function App() {

  return <VittBot 
              showChatWindow={showChatWindow} 
              setShowChatWindow={setShowChatWindow}
              session=sessionId 
              url = currentUrl
          />
}
```


## Props


| Parameter           | Type        | Description    | Default value                |
| :--------           | :-------    | :------------  | :-------------------------   |
| `showChatWindow`    | `boolean`   | **Required**.  |
| `setShowChatWindow` |  `function` | **Required**.  |  
| `session`           |  `String`   | **Optional**   | -1
| `url`               | `String`    | **Optional**   |   null




