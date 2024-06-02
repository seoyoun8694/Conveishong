/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";

import images from '../components/imgaes';

function Register2({ }) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const [workLocation, setworkLocation] = useState(null);

	return (
		<FullView>
			<images.Back_icon
				style={{ marginTop: 30, marginLeft: 20 }}
				onPress={() => navigation.goBack()}
			/>
			<View style={{ flexDirection: 'row' }}>
				<Bar style={{ backgroundColor: '#0066FF', width: '40%' }} />
				<Bar />
			</View>
			
			<MainView>
				<MainText>어느 지역에서 근무하고 계신가요?</MainText>
				<SerchBox>
					<images.search />
					<InputBox
						placeholder='근무지를 검색해주세요'
						value={workLocation}
						onChangeText={setworkLocation}
					/>
				</SerchBox>
			</MainView>

			<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100}}>
				<ResultCircle />
				<ResultCircle color={'#0066FF'} style={{width: 20}}/>
				<ResultCircle />
				<ResultCircle />
			</View>

			<ResultButton onPress={() => navigation.navigate('Register3')}>
				<ResultButtonText>다음</ResultButtonText>
			</ResultButton>
		</FullView>
	);
}

const FullView = styled.View`
	width: 100%;
	height: 100%;
	background-color: white;
	align-self: center;
`;

const MainView = styled(FullView)`
	width: 80%;
	height: auto;
`;

const MainText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.color || "black"};
`;

const Bar = styled.View`
	width: 100%;
	height: 1.5px;
	background-color: ${props => props.style?.backgroundColor || "#D9D9D9"};
	margin-top: 20px;
`;

const SerchBox = styled.TouchableOpacity`
	width: 280px;
	height: 45px;
	background-color: #F3F3F3;
	border-radius: 15px;
	justify-content: center;
	flex-direction: row;
`;

const InputBox = styled.TextInput`
	color: black;
	font-size: 10px;
	font-weight: normal;
	width: 100%;
	height: 100%;
	margin-left: 10px;
`;

const ResultButton = styled.TouchableOpacity`
	width: 100%;
	height: 70px;
	background-color: #0066FF;
	position: absolute;
	bottom: 0px;
	justify-content: center;
	align-items: center;
`;

const ResultButtonText = styled.Text`
	color: white;
	font-size: 20px;
	font-weight: bold;
`;

const ResultCircle = styled.View`
	width: 5px;
	height: 5px;
	margin: 2px;
	background-color: ${props => props.color || "#D9D9D9"};
	border-radius: 100px;
`;

export default Register2;