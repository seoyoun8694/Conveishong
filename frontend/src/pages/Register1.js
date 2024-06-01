/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { ThemeProvider } from "styled-components/native"

function Register1({}) {
  const navigation = useNavigation();

	return (
		<FullView>
			<MainView>
				<MainText>회원가입 화면1</MainText>
			</MainView>
		</FullView>
	);
}

const FullView = styled.View`
	width: 100%;
	height: 100%;
	background-color: white;
	align-self: center;
	justify-content: center;
`;

const MainView = styled(FullView)`
	align-self: center;
	justify-content: center;
`;

const MainText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${props => props.color || "black"};
    text-align: center;
`;

export default Register1;