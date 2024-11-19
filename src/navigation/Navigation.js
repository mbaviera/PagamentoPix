import React, { useEffect } from "react";
import Payment from "../screens/Payment/Payment";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Payment"
      >
        <Stack.Screen name="Payment" component={Payment} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
