/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import LinearGradient from 'react-native-linear-gradient';

import images from '../components/imgaes';

function Register5({ }) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const user_position = '알바생';
	const user_location = 'GS25테크노파크점';

	return (
		<FullView>
			<GradientBackground colors={['#0066FF', '#69A5FF']}>
				<Card />
				<PartTime_Img />
				<View style={{marginTop: 10, padding: 5, alignItems: 'center'}}>
					<MainText style={{ color: '#0066FF', fontSize: 12 }}>{user_position}</MainText>
					<MainText style={{ fontSize: 18 }}>{user_name}</MainText>
					<Text style={{ fontSize: 12, marginTop: 10 }}>{user_location}</Text>
				</View>
				<View style={{ position: 'absolute', bottom: 40, alignItems: 'center' }}>
					<Text style={{ fontSize: 12, color: 'white', marginBottom: 10 }}>프로필 생성이 완료되었습니다!</Text>
					<ResultButton onPress={() => navigation.navigate('Work')}>
						<ResultButtonText>시작하기</ResultButtonText>
					</ResultButton>
				</View>
			</GradientBackground>
		</FullView>
	);
}

const FullView = styled.View`
	width: 100%;
	height: 100%;
	align-self: center;
`;

const GradientBackground = styled(LinearGradient)`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

const MainText = styled.Text`
    font-size: 15px;
    font-weight: bold;
    color: ${props => props.color || "black"};
`;

const ResultButton = styled.TouchableOpacity`
	width: 300px;
	height: 70px;
	background-color: white;
	justify-content: center;
	align-items: center;
	border-radius: 15px;
`;

const ResultButtonText = styled.Text`
	color: #0066FF;
	font-size: 18px;
	font-weight: bold;
`;

const Card = styled(images.Card_Register)`
	position: absolute;
	top: -20px;
`;

const PartTime_Img = styled(images.PartTIme_Work)`
	bottom: 25px;
`;

export default Register5;
