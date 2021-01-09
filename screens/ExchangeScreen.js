import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'


export default class ExchangeScreen extends React.Component{
constructor(props) {
  super(props);
  this.state = {
    userId:firebase.auth().currentUser.email,
    ItemName: '',
    ItemDescription: '',
    itemStatus:"",
    docId: "",
  };
};
createUniqueId=()=>{
  return Math.random().toString(36).substring(7)
}
addItem = ()=>{
  var uniqueId = this.createUniqueId();
  var userId = this.state.userId;
    db.collection("requests").add({
        "userId":userId,
        item : this.state.ItemName,
        description : this.state.ItemDescription,
        "Exchange_Id":uniqueId,
        "item_status" : "requested",
        "date"       : firebase.firestore.FieldValue.serverTimestamp()
    });
    return(alert("item added"));
    await this.getExchangeRequest()
    db.collection('users').where("username","==",userName).get()
  .then()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      db.collection('users').doc(doc.id).update({
    IsExchangeRequestActive: true
    })
  })
})

    this.setState({
      ItemName : '',
      ItemDescription :''
    })
}
getIsExchangeRequestActive(){
  db.collection('users')
  .where('username','==',this.state.userName)
  .onSnapshot(querySnapshot => {
    querySnapshot.forEach(doc => {
      this.setState({
        IsExchangeRequestActive:doc.data().IsExchangeRequestActive,
        userDocId : doc.id
      })
    })
  })
}
getExchangeRequest =()=>{
  // getting the requested item
var exchangeRequest=  db.collection('exchange_requests')
  .where('username','==',this.state.userName)
  .get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      if(doc.data().item_status !== "received"){
        this.setState({
          exchangeId : doc.data().exchangeId,
          requestedItemName: doc.data().item_name,
          itemStatus:doc.data().item_status,
          docId     : doc.id
        })
      }
    })
})
}

componentDidMount(){
  this.getExchangeRequest()
  this.getIsExchangeRequestActive()

}
receivedItem=(bookName)=>{
  var userId = this.state.userName
  var exchangeId = this.state.exchangeId
  db.collection('received_items').add({
      "user_id": userId,
      "item_name":itemName,
      "exchange_id"  : exchangeId,
      "itemStatus"  : "received",

  })
}

updateExchangeRequestStatus=()=>{
  //updating the book status after receiving the book
  db.collection('requested_requests').doc(this.state.docId)
  .update({
    item_status : 'recieved'
  })

  //getting the  doc id to update the users doc
  db.collection('users').where('username','==',this.state.userName).get()
  .then((snapshot)=>{
    snapshot.forEach((doc) => {
      //updating the doc
      db.collection('users').doc(doc.id).update({
        IsExchangeRequestActive: false
      })
    })
  })

}
sendNotification=()=>{
  //to get the first name and last name
  db.collection('users').where('username','==',this.state.userName).get()
  .then((snapshot)=>{
    snapshot.forEach((doc)=>{
      var name = doc.data().first_name
      var lastName = doc.data().last_name

      // to get the donor id and item name
      db.collection('all_notifications').where('exchangeId','==',this.state.exchangeId).get()
      .then((snapshot)=>{
        snapshot.forEach((doc) => {
          var donorId  = doc.data().donor_id
          var bookName =  doc.data().item_name

          //targert user id is the donor id to send notification to the user
          db.collection('all_notifications').add({
            "targeted_user_id" : donorId,
            "message" : name +" " + lastName + " received the item " + itemName ,
            "notification_status" : "unread",
            "item_name" : itemName
          })
        })
      })
    })
  })
}

    render(){
        return(
            <View style={{flex:1}}>
              <MyHeader/>
              <TextInput style={styles.formTextInput} placeholder="Add Item name..."
                onChangeText= {(text)=>{
                   this.setState({
                            ItemName: text
                   })
               }}
               value={this.state.ItemName}/>
             <TextInput style={styles.formTextInput2} placeholder="Add Item Description..."
               multiline = {true}
               onChangeText= {(text)=>{
               this.setState({
                 ItemDescription: text
                })
                }}
                value={this.state.ItemDescription}/>
              <TouchableOpacity style={styles.button}

                 onPress={()=>{
                        this.addItem();
                        this.setState({
                            ItemName: "",
                            ItemDescription:"",
                        })
                    }}><Text style = {{color:'#fff'}}>Add Item</Text></TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"50%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:50,
      padding:10,
    },
    formTextInput2:{
      width:"50%",
      height:205,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"15%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      alignSelf:'center',
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
