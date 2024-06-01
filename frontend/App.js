/* eslint-disable prettier/prettier */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import Login from "./src/pages/Login";
import Register1 from "./src/pages/Register1";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register1" component={Register1} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}