/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState, useCallback } from 'react';
import {
	View,
	TouchableOpacity,
	Image,
} from "react-native";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import styled from "styled-components/native";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import images from '../components/imgaes';


function Setting({}) {
	const navigation = useNavigation();
	const user_id = '1';

	const [userName, setUserName] = useState('');
	const [userPhoneNum, setUserPhoneNum] = useState('');
	const [profileImage, setProfileImage] = useState(null);
	const [userLocation, setUserLocation] = useState('');
	const [userWorkTime, setUserWorkTime] = useState([]);
	
	useFocusEffect(
		useCallback(() => {
		axios.get(`http://43.200.15.190:4000/api/v1/getUserInfo/${user_id}`)
			.then(response => {
				const { userName, userPhoneNum, userImage, userLocation } = response.data;
				setUserName(userName);
				setUserPhoneNum(userPhoneNum);
				setProfileImage(userImage);
				setUserLocation(userLocation);
			})
			.catch(error => {
				console.error(error);
			});
		
		axios.get(`http://43.200.15.190:4000/api/v1/getWorkTime/${user_id}`)
			.then(response => {
				const formattedWorkTime = response.data.map(workTime => {
					return `${workTime.workDay}요일(${workTime.workStartTime}~${workTime.workEndTime})`;
				});
				setUserWorkTime(formattedWorkTime);
			})
			.catch(error => {
				console.error(error);
			});
		}, [])
	);

	const pickImage = () => {
		launchImageLibrary({ mediaType: 'photo' }, (response) => {
			if (response.assets && response.assets.length > 0) {
				const selectedImage = response.assets[0].uri;
				setProfileImage(selectedImage);
			}
		});
	};

	const renderWorkTime = () => {
		if (userWorkTime.length > 2) {
			return (
				<TouchableOpacity style={{flexDirection: 'row', marginTop: 15, paddingHorizontal: 10}}  onPress={() => navigation.navigate('Setting_Workday')}>
					{userWorkTime.slice(0, 2).map((workTime, index) => (
						<SubText key={index} style={{marginRight: 5}}>{workTime}</SubText>
					))}
					<SubText>...</SubText>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity style={{flexDirection: 'row', marginTop: 15, paddingHorizontal: 10}}  onPress={() => navigation.navigate('Setting_Workday')}>
					{userWorkTime.map((workTime, index) => (
						<SubText key={index} style={{marginRight: 5}}>{workTime}</SubText>
					))}
				</TouchableOpacity>
			);
		}
	};

	const handleSubmit = () => {
		const updatedUserInfo = {};
		if (userName) {
			updatedUserInfo.userName = userName;
		}
		if (userPhoneNum) {
			updatedUserInfo.userPhoneNum = userPhoneNum;
		}
		if (profileImage) {
			updatedUserInfo.userImage = profileImage;
		}

		axios.post(`http://43.200.15.190:4000/api/v1/updateUserInfo/${user_id}`, updatedUserInfo)
			.then(response => {
				console.log('User information updated successfully', response.data);
				navigation.goBack();
			})
			.catch(error => {
				console.error('Error updating user information', error);
			});
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>회원 정보 수정</MainText>

				<View style={{ alignSelf: 'center', flexDirection: 'row' }}>
					<Profile onPress={pickImage}>
						{profileImage ? (
							<Image 
								source={{ uri: profileImage }} 
								style={{ width: 200, height: 200, borderRadius: 100 }} 
							/>
						) : (
							<images.User_Profile />
						)}
					</Profile>
				</View>

				<MainText>이름(닉네임) *</MainText>
				<TextInputBox
					style={{paddingHorizontal: 10}}
					value={userName}
					onChangeText={(text) => setUserName(text)}
				/>

				<MainText>전화번호</MainText>
				<TextInputBox
					style={{paddingHorizontal: 10}}
					value={userPhoneNum}
					onChangeText={(text) => setUserPhoneNum(text)}
				/>

				<MainText>근무 지역</MainText>
				<TouchableOpacity style={{flexDirection: 'row', marginTop: 15, paddingHorizontal: 10}} onPress={() => navigation.navigate('Setting_location')}>
					<images.location color='gray' style={{marginRight: 5}} />
					<SubText>{userLocation}</SubText>
				</TouchableOpacity>
				<TouchableOpacity style={{borderBottomWidth: 1, borderColor: 'gray', marginTop: 15, marginBottom: 20}} />

				<MainText>근무 요일/시간</MainText>
				{renderWorkTime()}
				<TouchableOpacity style={{borderBottomWidth: 1, borderColor: 'gray', marginTop: 15}} />
			</MainView>
			<CompleteButton onPress={handleSubmit}>
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
`;

const Profile = styled.TouchableOpacity`
	width: 200px;
	height: 200px;
	border-radius: 100px;
	background-color: #F3F3F3;
	align-self: center;
	align-items: center;
	justify-content: center;
	margin-top: 30px;
	margin-bottom: 40px;
`;

const TextInputBox = styled.TextInput`
	border-color: gray;
	border-bottom-width: 1;
	margin-bottom: 20px;
	font-size: 12px;
	height: 40px;
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

export default Setting;