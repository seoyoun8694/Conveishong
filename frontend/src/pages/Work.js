/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";

import images from '../components/imgaes';
import CustomModal from '../components/CustomModal';

function Work({ }) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const user_position = '알바생';
	const user_location = 'GS25테크노파크점';
	const today = new Date();
	const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`;

	const [isWorking, setIsWorking] = useState(false);
	const [workTime, setWorkTime] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const formattedTime = `${now.getMonth() + 1}월 ${now.getDate()}일 ${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`;
		setWorkTime(formattedTime);
	}, []);

	const handleWork = () => {
		const now = new Date();
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const formattedTime = `${now.getMonth() + 1}월 ${now.getDate()}일 ${hours >= 12 ? '오후' : '오전'} ${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes}`;
		setWorkTime(formattedTime);
		setIsWorking(true);
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
					<TouchableOpacity onPress={() => setModalVisible(true)}>
						<images.menu color={'white'} />
					</TouchableOpacity>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<images.location />
						<MainText style={{ fontSize: 10, marginLeft: 5, fontWeight: 'normal' }}>{user_location}</MainText>
					</View>
					<images.chatting />
				</View>

				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
					<MainText>반가워요, {user_name}님! {'\n'}{formattedDate} 입니다 {'\n'}오늘도 화이팅 ✨</MainText>
					<Profile>
						<images.User_Profile width={60} hight={60} />
					</Profile>
				</View>
			</MainView>
			<MainBox>
				<View style={{ flexDirection: 'row', marginTop: 30, width: 230, justifyContent: 'space-between', alignSelf: 'center' }}>
					<MainText style={{ color: '#0066FF', fontSize: 15 }}>출근하기</MainText>
					<MainText style={{ color: '#909090', fontSize: 15 }} onPress={() => navigation.navigate('Inspection')}>시재점검</MainText>
				</View>
				<Bar style={{ marginLeft: 50 }} />

				<View style={{ alignItems: 'center' }}>
					<images.Card_Work style={{ elevation: 10, position: 'absolute', }} />
					<View style={{ top: 140, alignItems: 'center' }}>
						<images.PartTIme_Work />
						<SubText style={{ color: '#0066FF', marginTop: 15 }}>{user_position}</SubText>
						<MainText style={{ color: 'black' }}>{user_name}</MainText>
						<WorkBox onPress={handleWork} isWorking={isWorking}>
							<MainText style={{ color: isWorking ? 'white' : '#0066FF' }}>
								{isWorking ? '출근 완료' : '출근하기'}
							</MainText>
							<SubText style={{ color: '#D9D9D9', fontSize: 10, marginTop: 5 }}>{workTime}</SubText>
						</WorkBox>
					</View>
				</View>
			</MainBox>

			<CustomModal
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
				navigation={navigation}
			/>
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
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.color || "white"};
`;

const SubText = styled.Text`
	font-size: 12px;
`;

const MainBox = styled.TouchableOpacity`
	width: 100%;
	height: 520px;
	position: absolute;
	bottom: 0px;
	border-top-right-radius: 15px;
	border-top-left-radius: 15px;
	background-color: white;
`;

const Profile = styled.TouchableOpacity`
	width: 90px;
	height: 90px;
	border-radius: 100px;
	background-color: #F3F3F3;
	align-self: center;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
	margin-bottom: 40px;
`;

const Bar = styled.TouchableOpacity`
	width: 120px;
	height: 2px;
	background-color: #0066FF;
	margin-top: 8px;
`;

const WorkBox = styled.TouchableOpacity`
	width: 180px;
	height: 70px;
	border-radius: 15px;
	background-color: ${props => props.isWorking ? '#0066FF' : 'white'};
	border: 1px solid #0066FF;
	margin-top: 10px;
	justify-content: center;
	align-items: center;
`;

export default Work;
