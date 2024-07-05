import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import axios from 'axios';

import images from '../components/imgaes';

const locationList = [
	{
		name: 'GS25테크노파크점',
		address: '경기 부천시 오정구 석천로345, 300동 114호(삼청동 365)'
	},
	{
		name: 'GS2538선휴게소점',
		address: '강원 양양군 현북면 동해대로1242, 38선 휴게소 (잔교리 41-10, 38휴게소)'
	}
];

function Register2({ }) {
	const navigation = useNavigation();
	const user_id = '1';
	const [workLocation, setworkLocation] = useState(null);
	const [selectedLocation, setSelectedLocation] = useState(null);

	const handleLocationClick = (index) => {
		setSelectedLocation(index === selectedLocation ? null : index);
	};

	const updateUserLocation = async () => {
		if (selectedLocation === null) {
			Alert.alert('알림', '근무지를 선택해주세요.');
			return;
		}
	
		try {
			const response = await axios.post(`http://43.200.15.190:4000/api/v1/updateUserInfo/${user_id}`, {
				userLocation: locationList[selectedLocation].name
			});
		  
			if (response.status === 200) {
				navigation.navigate('Register3');
			} else {
				Alert.alert('오류', '근무지 업데이트에 실패했습니다.');
			}
		} catch (error) {
			console.error('Error updating user location:', error);
			Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다.');
		}
	};

	return (
		<FullView>
			<images.Back_icon
				style={{ marginTop: 30, marginLeft: 20 }}
				onPress={() => navigation.goBack()}
				color={'#D9D9D9'}
			/>
			<View style={{ flexDirection: 'row' }}>
				<Bar style={{ backgroundColor: '#0066FF', width: '40%' }} />
				<Bar />
			</View>
			
			<MainView>
				<MainText style={{ marginTop: 20 }}>어느 지역에서 근무하고 계신가요?</MainText>
				<View style={{alignItems: 'center'}}>
				<SerchBox>
					<images.search style={{marginLeft: 60, marginTop: 12}} />
					<InputBox
						placeholder='근무지를 검색해주세요'
						value={workLocation}
						onChangeText={setworkLocation}
					/>
				</SerchBox>

				<View style={{marginTop: 20}}>
					{locationList.map((location, index) => (
					<LocationBox
						key={index}
						onPress={() => handleLocationClick(index)}
						selected={selectedLocation === index}
					>
						<MainText style={{ fontSize: 12 }}>{location.name}</MainText>
						<LocationText>{location.address}</LocationText>
					</LocationBox>
				))}
				</View>
				</View>
			</MainView>

			<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100 }}>
				<ResultCircle />
				<ResultCircle color={'#0066FF'} style={{ width: 20 }} />
				<ResultCircle />
				<ResultCircle />
			</View>

			<ResultButton onPress={updateUserLocation}>
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
	width: 300px;
	height: 45px;
	background-color: #F3F3F3;
	border-radius: 15px;
	justify-content: center;
	flex-direction: row;
	margin-top: 15px;
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

const LocationBox = styled.TouchableOpacity`
	width: 300px;
	height: 70px;
	border: 1px solid ${props => props.selected ? '#0066FF' : 'transparent'};
	padding: 10px;
	border-radius: 15px;
	margin-bottom: 5px;
`;

const LocationText = styled.Text`
	font-size: 10px;
    font-weight: normal;
`;

export default Register2;
