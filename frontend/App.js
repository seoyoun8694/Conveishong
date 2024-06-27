/* eslint-disable prettier/prettier */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import Login from "./src/pages/Login";
import Register1 from "./src/pages/Register1";
import Register2 from "./src/pages/Register2";
import Register3 from "./src/pages/Register3";
import Register4 from "./src/pages/Register4";
import Register5 from "./src/pages/Register5";

import Work from "./src/pages/Work";
import Inspection from "./src/pages/Inspection";

const Stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Register1" component={Register1} />
				<Stack.Screen name="Register2" component={Register2} />
				<Stack.Screen name="Register3" component={Register3} />
				<Stack.Screen name="Register4" component={Register4} />
				<Stack.Screen name="Register5" component={Register5} />

				<Stack.Screen name="Work" component={Work} />
				<Stack.Screen name="Inspection" component={Inspection} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}