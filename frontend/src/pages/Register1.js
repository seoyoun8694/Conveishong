/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	ScrollView,
	TouchableOpacity,
	Alert,
	Text,
	Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native"

import images from '../components/imgaes';

function Register1({}) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const [selected, setSelected] = useState(null);

	const handleImageClick = (type) => {
		setSelected(type);
	};

	return (
		<FullView>
			<images.Back_icon style={{ marginTop: 30, marginLeft: 20 }} />
			<View style={{ flexDirection: 'row' }}>
				<Bar style={{ backgroundColor: '#0066FF', width: '25%' }} />
				<Bar />
			</View>
			
			<MainView>
				<MainText style={{ marginTop: 20 }}>안녕하세요 {user_name}님, {'\n'} 어떤 일을 하고 계신가요?</MainText>
				<View style={{ alignItems: 'center', justifyContent: 'center' }}>
					<TouchableOpacity onPress={() => handleImageClick('partTime')}>
						<images.PartTime_Register />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => handleImageClick('president')}>
						<images.President_Register />
					</TouchableOpacity>
				</View>
			</MainView>
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

export default Register1;
