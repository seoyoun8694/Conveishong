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

function Register1({}) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const [selected, setSelected] = useState('partTime');

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
				<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
					<MainText>알바생</MainText>
					<TouchableOpacity
						style={{ marginBottom: 40 }}
						onPress={() => handleImageClick('partTime')}
					>
						<StyledImage
							source={selected === 'partTime' ? images.Register_PT : images.Register_PT1}
						/>
					</TouchableOpacity>

					<MainText>점주</MainText>
					<TouchableOpacity onPress={() => handleImageClick('president')}>
						<StyledImage
							source={selected === 'president' ? images.Register_P : images.Register_P1}
						/>
					</TouchableOpacity>
				</View>
			</MainView>

			<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50}}>
				<ResultCircle color={'#0066FF'} style={{width: 15}} />
				<ResultCircle />
				<ResultCircle />
				<ResultCircle/>
			</View>

			<ResultButton>
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

const StyledImage = styled.Image`
	width: 250px;
	height: 146px;
	margin: 10px;
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

export default Register1;
