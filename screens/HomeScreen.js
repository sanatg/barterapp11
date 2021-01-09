import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    TextInput,
    Modal,
    FlatList,
} from 'react-native';
import db from "../config";
import firebase from "firebase";
import {SearchBar} from 'react-native-elements'
import MyHeader from '../components/MyHeader'

export default class HomeScreen extends React.Component {
  constructor(){
      super();
      this.state ={
        allStories:[],
        dataSource:[],
        search : '',
      }
    }

    componentDidMount(){
      this.retrieveGoods()
    }

    updateSearch = search => {
      this.setState({ search });
    };


    retrieveGoods=()=>{
      try {
        var allStories= []
        var stories = db.collection("requests")
          .get().then((querySnapshot)=> {
            querySnapshot.forEach((doc)=> {
                // doc.data() is never undefined for query doc snapshots

                allStories.push(doc.data())
            })
            this.setState({allStories})
          })
      }
      catch (error) {
        console.log(error);
      }
    };


    SearchFilterFunction(text) {
      //passing the inserted text in textinput
      const newData = this.state.allStories.filter((item)=> {
        //applying filter for the inserted text in search bar
        const itemData = item.item ? item.item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        search: text,
      });
    }

      render(){
        return(
          <ScrollView>
          <View style ={styles.container}>
              <MyHeader/>
            <View styles ={{height:20,width:'100%'}}>
                <SearchBar
                placeholder="Type Here..."
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                value={this.state.search}
              />
            </View>

            <FlatList
                  data={this.state.search === "" ?  this.state.allStories: this.state.dataSource}
                  renderItem={({ item }) => (

                    <View style={styles.itemContainer}>

                      <Text>Item Name: {item.item}</Text>
                      <Text>Description: {item.description}</Text>
                        <TouchableOpacity style={styles.viewButtonstyle} onPress={()=>{
                  this.props.navigation.navigate('UserDetails',{"details":item})
                }} >
                            <Text style = {{ color: 'white'}}>
                              View
                            </Text>
                              
                        </TouchableOpacity>
                    </View>

                  )}
                  keyExtractor={(item, index) => index.toString()}
                  />


          </View>
           </ScrollView>
        );
      }

  }


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    itemContainer: {
      width:'100%',
      borderWidth: 0.1,
      justifyContent:'center',
      alignSelf: 'center',
      padding:10
    },
    viewButtonstyle: { 
      width:"20%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      marginTop:20,
    }
  });
