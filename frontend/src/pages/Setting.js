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
	TextInput,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
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
	const [userWorkday, setUserWorkday] = useState('');
	
	useEffect(() => {
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
	}, []);

	const pickImage = () => {
		launchImageLibrary({ mediaType: 'photo' }, (response) => {
			if (response.assets && response.assets.length > 0) {
				const selectedImage = response.assets[0].uri;
				setProfileImage(selectedImage);
			}
		});
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
				<Text onPress={navigation.navigate('SettingLocation')}>{userLocation}</Text>

				
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

const Profile = styled.TouchableOpacity`
	width: 200px;
	height: 200px;
	border-radius: 100px;
	background-color: #F3F3F3;
	align-self: center;
	align-items: center;
	justify-content: center;
	margin-top: 40px;
	margin-bottom: 40px;
`;

const TextInputBox = styled.TextInput`
	border-color: gray;
	border-bottom-width: 1;
	margin-bottom: 20px;
	font-size: 12px;
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