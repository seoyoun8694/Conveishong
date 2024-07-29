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
import Cigarette from "./src/pages/Cigarette";
import Money from "./src/pages/Money";
import GiftCard from "./src/pages/GiftCard";

import Setting from "./src/pages/Setting";

import Todo from "./src/pages/Todo";

import Salary from "./src/pages/Salary";
import Salary_Setting from "./src/pages/Salary_Setting";

import Info1 from "./src/pages/Info1";

import Chatting from "./src/pages/Chatting";

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
				<Stack.Screen name="Cigarette" component={Cigarette} />
				<Stack.Screen name="Money" component={Money} />
				<Stack.Screen name="GiftCard" component={GiftCard} />

				<Stack.Screen name="Setting" component={Setting} />

				<Stack.Screen name="Todo" component={Todo} />

				<Stack.Screen name="Salary" component={Salary} />
				<Stack.Screen name="Salary_Setting" component={Salary_Setting} />

				<Stack.Screen name="Info1" component={Info1} />

				<Stack.Screen name="Chatting" component={Chatting} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}