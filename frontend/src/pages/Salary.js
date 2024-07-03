/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	FlatList,
	Modal,
	ScrollView,
	Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import { launchImageLibrary } from 'react-native-image-picker';

import images from '../components/imgaes';


function Salary({}) {
	const navigation = useNavigation();
	const month = ['2024.05', '2024.04', '2024.03'];

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
					<images.Back_icon color={'white'} onPress={() => navigation.goBack()} />
					<images.setting onPress={() => navigation.navigate('Salary_Setting')}/>
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30, position: 'absolute' }}>근무 기록</MainText>
				<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
					<images.calendar_left color={'white'} />
					<SubText style={{marginLeft: 30, marginRight: 30}}>{month[0]}</SubText>
					<images.calendar_right color={'white'} />
				</View>
			</MainView>

			<MainBox>
				<Text>기록</Text>
			</MainBox>
		</FullView>
	);
}

const FullView = styled.View`
	width: 100%;
	height: 100%;
	background-color: white;
	align-self: center;
	background-color: #0066FF;
`;

const MainView = styled(FullView)`
	width: 80%;
	height: auto;
`;

const MainText = styled.Text`
	font-size: 15px;
	font-weight: bold;
	color: ${props => props.color || "white"};
`;

const SubText = styled.Text`
	font-size: 12px;
	font-weight: normal;
	color: white;
`;

const MainBox = styled.TouchableOpacity`
	width: 100%;
	height: 520px;
	position: absolute;
	bottom: 0px;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	background-color: white;
	padding: 20px 10%;
`;

const moneyBox = styled.TouchableOpacity`
	width: 200px;
	height: 100px;
	border-radius: 15px;
	background-color: white;
`;

export default Salary;