import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import User from "../screens/User";
import QrCode from "../screens/QrCode";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="QRCode" component={QrCode} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;