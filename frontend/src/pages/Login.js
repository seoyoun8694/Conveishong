/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled, { ThemeProvider } from "styled-components/native"

function Login({}) {
  const navigation = useNavigation();

	return (
		<FullView>
			<MainView>
				<MainText onPress={() => navigation.navigate('Work')}>로그인 화면</MainText>
				<Text
					onPress={() => navigation.navigate('Register1')}
					style={{ fontSize: 15, alignSelf: 'center', color: '#B7BABF', margin: 15 }}
				>
					회원가입
				</Text>
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

export default Login;