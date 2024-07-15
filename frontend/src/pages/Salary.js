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
	const month = ['2024.05', '2024.04', '2024.03', '2024.02', '2024.01',];
	const money = '1000000'
	const work_day = ['2024.07.15', '2024.07.16', '2024.07.22', '2024.07.23'];
	const work_time = ['12:00', '14:00'];

	const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

	const handleLeftPress = () => {
		setCurrentMonthIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	};

	const handleRightPress = () => {
		setCurrentMonthIndex((prevIndex) => Math.min(prevIndex + 1, month.length - 1));
	};

	const formatMoney = (amount) => {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	const calculateWage = (times, hourlyRate) => {
		const startTime = times[0].split(':').map(Number);
		const endTime = times[1].split(':').map(Number);

		const startHours = startTime[0] + startTime[1] / 60;
		const endHours = endTime[0] + endTime[1] / 60;

		const hoursWorked = endHours - startHours;
		return hoursWorked * hourlyRate;
	};

	const hourlyRate = 9860;
	const wage = calculateWage(work_time, hourlyRate);

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between' }}>
					<images.Back_icon color={'white'} onPress={() => navigation.goBack()} />
					<images.setting onPress={() => navigation.navigate('Salary_Setting')}/>
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30, position: 'absolute' }}>근무 기록</MainText>
				<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
					<TouchableOpacity onPress={handleRightPress}>
						<images.calendar_left color={'white'} />
					</TouchableOpacity>
					<SubText style={{marginLeft: 30, marginRight: 30}}>{month[currentMonthIndex]}</SubText>
					<TouchableOpacity onPress={handleLeftPress}>
						<images.calendar_right color={'white'} />
					</TouchableOpacity>
				</View>
				<MoneyBox>
					<MainText style={{ fontSize: 18 }}>이번달 총 급여</MainText>
					<View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
						<images.coin style={{marginRight: 10}} />
						<MainText style={{ fontSize: 20 }}>{formatMoney(money)} 원</MainText>
					</View>
				</MoneyBox>
			</MainView>

			<MainBox>
				<View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
					<images.info style={{marginRight: 10}}/>
					<Text style={{fontSize: 10}}>총 급여는 세금 공제 전 금액입니다. {'\n'}개인 확인용 화면으로, 실제 급여와는 다를 수 있습니다. </Text>
				</View>
				<WorkBox>
					<ScrollView>
						<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
							<images.add style={{ marginRight: 10 }} />
							<View>
								<Text>{work_day[0]}</Text>
								<Text>{work_time[0]} ~ {work_time[1]}</Text>
							</View>
							<MainText style={{marginLeft: 50, color: '#0066FF'}}>+ {formatMoney(wage)}원</MainText>
						</View>
						<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
							<images.add style={{ marginRight: 10 }} />
							<View>
								<Text>{work_day[1]}</Text>
								<Text>{work_time[0]} ~ {work_time[1]}</Text>
							</View>
							<MainText style={{marginLeft: 50, color: '#0066FF'}}>+ {formatMoney(wage)}원</MainText>
						</View>
					</ScrollView>
				</WorkBox>
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

const MoneyBox = styled.TouchableOpacity`
	width: 280px;
	height: 90px;
	border-radius: 15px;
	background-color: #0050C9;
	align-self: center;
	margin-top: 10px;
	align-items: center;
	justify-content: center;
`;

const WorkBox = styled.TouchableOpacity`
	height: 80%;
	background-color: #f3f3f3;
	border-radius: 15px;
	margin-top: 10px;
	padding: 30px;
`;

const WorkView = styled.View`
	
`;

export default Salary;