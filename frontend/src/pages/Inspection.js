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

function Inspection({ }) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const user_position = '알바생';
	const user_location = 'GS25테크노파크점';
	const today = new Date();
	const formattedDate = `${today.getMonth() + 1}월 ${today.getDate()}일`;

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
					<images.menu />
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
					<MainText style={{ color: '#909090', fontSize: 15 }} onPress={() => navigation.navigate('Work')}>출근하기</MainText>
					<MainText style={{ color: '#0066FF', fontSize: 15 }}>시재점검</MainText>
				</View>
				<Bar style={{ marginRight: 50, alignSelf: 'flex-end' }} />
				
				<View style={{ width: 300, alignSelf: 'center' }}>
					<View style={{flexDirection: 'row'}}>
						<SubText style={{ marginTop: 20 }}>시재 점검 목록</SubText>
						<InfoText style={{ marginTop: 22, marginLeft: 10 }}>시재 점검할 항목을 선택해주세요</InfoText>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Inspec_Box style={{marginRight: 15}} onPress={() => navigation.navigate('Cigarette')}>
							<images.cigarette />
							<SubText style={{marginTop: 5}}>담배</SubText>
						</Inspec_Box>
						<Inspec_Box style={{marginRight: 15}} onPress={() => navigation.navigate('Money')}>
							<images.money />
							<SubText style={{marginTop: 5}}>현금</SubText>
						</Inspec_Box>
						<Inspec_Box onPress={() => navigation.navigate('GiftCard')}>
							<images.giftcard />
							<SubText style={{marginTop: 5}}>문화상품권</SubText>
						</Inspec_Box>
					</View>

					<View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
						<View style={{flexDirection: 'row'}}>
							<SubText style={{ marginTop: 40 }}>시재 기록</SubText>
							<InfoText style={{ marginTop: 42, marginLeft: 10 }}>최대 30일 보관</InfoText>
						</View>
						<InfoText style={{ marginTop: 42, color: '#0066FF' }}>전체보기</InfoText>
					</View>
					<Inspec_his>
						<Text>시재 기록</Text>
					</Inspec_his>
				
				</View>
				
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
	font-size: 18px;
	font-weight: bold;
	color: ${props => props.color || "white"};
`;

const SubText = styled.Text`
	font-size: 12px;
	color: black;
	font-weight: bold;
`;

const InfoText = styled.Text`
	font-size: 10px;
	color: #909090;
	font-weight: normal;
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

const Inspec_Box = styled.TouchableOpacity`
	width: 90px;
	height: 90px;
	background-color: #F3F3F3;
	border-radius: 15px;
	margin-top: 10px;
	align-items: center;
	justify-content: center;
`;

const Inspec_his = styled.TouchableOpacity`
	width: 300px;
	height: 200px;
	background-color: #F3F3F3;
	border-radius: 15px;
	align-self: center;
	margin-top: 10px;
`;

export default Inspection;