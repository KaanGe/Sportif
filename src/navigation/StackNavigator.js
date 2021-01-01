import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Alert } from "react-native";

import Home from "../screens/Home";
import News from "../screens/News";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Logo from "../components/Logo";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home"
      screenOptions={({navigation})=>({
        headerStyle: {
          backgroundColor: "#9AC4F8",
        },
        headerTintColor: "white",
        headerBackTitle: "Geri",
        headerLeft:() => {
          return (
            <Logo onPress={() => navigation.toggleDrawer()}/>       
          );
        },
      })}>
      <Stack.Screen name="Home" component={Home}
      //  options={{headerTitle:props=> <Logo {...props}/>,}} 
        />
      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
    screenOptions={({navigation})=>({
      headerStyle: {
        backgroundColor: "#9AC4F8",
      },
      headerTintColor: "white",
      headerBackTitle: "Geri",
      headerLeft:() => {
        return (
          <Logo onPress={() => navigation.toggleDrawer()}/>       
        );
      },
    })}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
};




export { HomeStackNavigator , LoginStackNavigator };