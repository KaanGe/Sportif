import React ,{Component} from "react";
import firebase from 'firebase';
import { createDrawerNavigator , DrawerContentScrollView ,DrawerItemList ,DrawerItem } from "@react-navigation/drawer";

import { HomeStackNavigator, LoginStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";

import { render } from "react-dom";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator();

class DrawerNavigator extends Component {


  state={
    loggedIn:false
  };

  componentDidMount(){

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({loggedIn:true});Alert.alert("giris yapti");
      }else{
        this.setState({loggedIn:false});Alert.alert("cikis yapti");
      }
    });
  }



render(){
    return (
    <Drawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          
          {this.state.loggedIn && <DrawerItem label="Cikis yap" onPress={()=>{firebase.auth().signOut(); }} /> }
        </DrawerContentScrollView>
      )
    }}>
      <Drawer.Screen name="Anasayfa" component={ HomeStackNavigator } />
      {this.state.loggedIn && <Drawer.Screen name="Kullanici" component={ TabNavigator } />}
      { !this.state.loggedIn && <Drawer.Screen name="Giris yap" component={ LoginStackNavigator } />}
    </Drawer.Navigator> 
  );
}

};

export default DrawerNavigator;