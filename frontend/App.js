import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import Login from "./src/pages/Login";
import Register from "./src/pages/Register";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register" component={Register} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}