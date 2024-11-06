// import {NetworkInfo} from 'react-native-network-info';
import axios from 'axios'

// export function getIpAddr(){
//     let ip = null
//     NetworkInfo.getIPAddress().then(ipAddress => {
//         ip= ipAddress
//     })
//     return ip
// }

export function getIndexOfSchemaId(url){
    if (!url)
    return 
    //let url = 'https://vitt'
    
    let subStr = 'schemeid'   

    let m = url.length 
    let n = subStr.length 

    for (let i = 0; i <= m ; i++) {
        let j;

        for (j = 0; j < n ; j++){
            
            // console.log(url.charAt(i + j)," ",subStr.charAt(j),i+j," ",j ,url.charAt(i + j) == subStr.charAt(j) )
            if (url.charAt(i + j) != subStr.charAt(j)){
                
                break;
            }
        }
        if (j === n)
            return i;
    }

    return -1;
}

export function isNum(val){
    return !isNaN(val)
}

export function getSchemaId(url){

    let index = getIndexOfSchemaId(url)
    
    //console.log(url.charAt(index+9))

    index= index+9
    let index2 = index
    
    while(isNum(url.charAt(index2) ) ){
        index2++ 
    }
    return parseInt(url.substring(index,index2))
    
}


export const startTime = () => {
    var dt = new Date();
    var h = dt.getHours(),
        m = dt.getMinutes();
    var time;

    if (h === 12) {
        time = h + ":" + (m < 10 ? "0" + m : m) + " PM";
    } else {
        time =
            h > 12
                ? (h - 12 < 10 ? "0" + (h - 12) : h - 12) +
                ":" +
                (m < 10 ? "0" + m : m) +
                " PM"
                : (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + " AM";
    }

    return time;
};

export function Conversation_id_function() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 32; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


// export function isClicked(){
//     setBottomSheet(false)
//      setLoader(1)
//     if (
//      temp.query.toString().trim() === undefined ||
//      temp.query.toString().trim() === null ||
//      temp.query.toString().trim() === ""
//      ) {
//      console.warn(
//          "isClicked: query is blank, please enter something in textarea"
//      );
//      setLoader(-1)
//      }
//      else{
//          setValues([...value,temp]);
         
//          Axios.post(url,temp).then((success)=>{
//              let sp = [];
//              let btn = [];
//              let actionText = [];
//              let news = [];

//              let table_Data={
//                  //session:cookieData
//                  query:{},
//                  type:"card",
//                  time:startTime(),
//                  count:value.length,
//                  conversationId:conversation_id
//              };
             
//              // if there is a table 
//              let flag = false 
//              // variable determine the position of table before text msg or after text msg
//              let table_Position = false 
             
//              if(success.data.result.fulfilment.data.type === 'card'){
//                  table_Data.query = success.data.result.fulfillment.data.data
//                  flag= true;

//                  //finding position of table 
//                  if (success.data.result.fulfillment.data.table == "up") 
//                      table_pos = true
//              }
             
//              if (flag && table_pos) {
//                  sp.push(table_Data)
//              }

//              let trial = []
//              success.data.result.fulfillment.data.DownButton.GenerativeQuestion.map((m,i)=>{
//                  if (trial.length <10) trial.push(m);
//              });
//              setGenerativeQn([...trial])

//              success.data.result.fulfillment.messages.map((m)=>{
                 
//                  if(m.type === 0 && m.speech !== ""){
//                      m.speech.map((mm, qq) => {
//                          var inital_message = {
//                              //session: cookieData,
//                              query: mm,
//                              type: "receive",
//                              time: startTime(),
//                              count: value.length,
//                              conversationId: conversation_id
//                          };
//                          sp.push(inital_message);
//                      });
//                  }
//                  else if (m.type === 2 || m.type === 5) {
//                      m.replies.map((mm) => {
//                          var inital_message = {
//                              session: cookieData,
//                              query: mm,
//                              newTabUrl: m.type === 5 ? m.urls[0] : null,
//                              type: "button",
//                              time: startTime(),
//                              count: value.length,
//                              conversationId: conversation_id
//                          };
//                          // console.log("replies: " + mm);
//                          btn.push(inital_message);
//                      });
//                  }else if (m.type === 3) {
//                      var inital_message = {
//                          session: cookieData,
//                          query: m.speech,
//                          type: "image",
//                          time: startTime(),
//                          count: value.length,
//                          conversationId: conversation_id
//                      };
//                      console.log("ImageLink: " + inital_message.query);
//                      sp.push(inital_message);
//                  } else if (m.type === 4 && m.speech !== "") {
//                      console.log(`i am type 4 data %c`,m.speech)
//                      var inital_message = {
//                          session: cookieData,
//                          query: m.speech,
//                          type: "receive",
//                          time: startTime(),
//                          count: value.length,
//                          conversationId: conversation_id
//                      };
//                      actionText.push(inital_message);
//                  }

//                  //pushing table data after text msg 
//                  if (flag && !table_pos) {
//                      sp.push(table_Data)
//                  }

//                  setValue([...value, temp].concat(sp).concat(actionText));
//                  setButtonValue([].concat(btn));
//                  setLoader(-1);

//              })
//          }).catch((error) => {
//              console.log(
//                  "isClicked: catch of abcl.vitt.ai fetching api and error is: " +
//                  error
//              );
//              /**If we get 500 Internal error. then we will show this query. */
//              var errors = "";
//              // console.log(error.message)
//              if (error.message.includes("Network")) errors = "There seems to be an issue with your internet connection. Please check."
//              else errors = "Oops! please Enter something related to Finance!"
//              var inital_message = {
//                  session: cookieData,
//                  query: errors,
//                  type: "receive",
//                  time: startTime(),
//                  count: value.length,
//                  conversationId: conversation_id
//              };
//              setValue([...value, temp, inital_message]);
//              setLoader(-1);
//              // console.log(error);
//          })
//      }
//      count++;
     
//  }