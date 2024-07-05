/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import axios from 'axios';

import images from '../components/imgaes';

function Salary_Setting({}) {
	const navigation = useNavigation();
	const user_id = '1';

	const [money, setMoney] = useState('9,860');

	const handleMoneyChange = (text) => {
		const numericValue = text.replace(/[^0-9]/g, '');
		const formattedValue = formatNumberWithCommas(numericValue);
		setMoney(formattedValue);
	};

	const formatNumberWithCommas = (number) => {
		return number.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const updateUserMoney = async () => {
		try {
			const response = await axios.post(`http://43.200.15.190:4000/api/v1/updateUserInfo/${user_id}`, {
				userMoney: money
			});
		  
			if (response.status === 200) {
				navigation.navigate('Salary');
			} else {
				Alert.alert('오류', '시급 업데이트에 실패했습니다.');
			}
		} catch (error) {
			console.error('Error updating user location:', error);
			Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다.');
		}
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>시급 변경</MainText>

				<SubText style={{ marginTop: 40, marginLeft: 10 }}>시급 입력</SubText>
				<MoneyInput
					placeholder='9,860'
					value={money}
					onChangeText={handleMoneyChange}
					keyboardType='numeric'
				/>
			</MainView>

			<CompleteButton onPress={updateUserMoney}>
				<MainText style={{ color: 'white' }}>완료</MainText>
			</CompleteButton>
		</FullView>
	);
}

const FullView = styled.View`
	width: 100%;
	height: 100%;
	background-color: white;
	align-self: center;
	justify-content: space-between;
`;

const MainView = styled.View`
	width: 80%;
	height: auto;
	align-self: center;
	padding-bottom: 10px;
`;

const MainText = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: ${props => props.color || "black"};
`;

const SubText = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: black;
`;

const MoneyInput = styled.TextInput`
	width: 100%;
	height: 50px;
	background-color: #F3F3F3;
	border-radius: 15px;
	padding-horizontal: 15px;
	font-size: 15px;
	margin-top: 10px;
	font-weight: bold;
`;

const CompleteButton = styled.TouchableOpacity`
	width: 80%;
	height: 40px;
	background-color: #0066FF;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	align-self: center;
	position: absolute;
	bottom: 30px;
`;

export default Salary_Setting;
