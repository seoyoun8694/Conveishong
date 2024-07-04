/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	KeyboardAvoidingView,
	ScrollView,
	Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

import images from '../components/imgaes';
import { TextInput } from 'react-native-gesture-handler';

function Register4({ }) {
	const navigation = useNavigation();
	const user_id = '1';

	const [UserName, setUserName] = useState(null);
	const [UserPhoneNum, setUserPhoneNum] = useState(null);
	const [profileImage, setProfileImage] = useState(null);

	const pickImage = () => {
		launchImageLibrary({ mediaType: 'photo' }, (response) => {
			if (response.assets && response.assets.length > 0) {
				const selectedImage = response.assets[0].uri;
				setProfileImage(selectedImage);
			}
		});
	};

	const formatPhoneNumber = (input) => {
		const numbers = input.replace(/\D/g, '');
		const trimmed = numbers.slice(0, 11);
		if (trimmed.length > 7) {
			return `${trimmed.slice(0, 3)}-${trimmed.slice(3, 7)}-${trimmed.slice(7)}`;
		} else if (trimmed.length > 3) {
			return `${trimmed.slice(0, 3)}-${trimmed.slice(3)}`;
		}
		return trimmed;
	};
	
	const handlePhoneChange = (text) => {
		const formatted = formatPhoneNumber(text);
		setUserPhoneNum(formatted);
	};

	const updateUserInfo = async () => {
		if (!UserName) {
			Alert.alert('알림', '이름(닉네임)을 입력해주세요.');
			return;
		}
	  
		try {
			const data = {
				userName: UserName,
				userPhoneNum: UserPhoneNum,
				userImage: profileImage,
			};
	  
			const response = await axios.post(
				`http://43.200.15.190:4000/api/v1/updateUserInfo/${user_id}`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
		  
			if (response.status === 200) {
				navigation.navigate('Register5');
			} else {
				Alert.alert('오류', '정보 업데이트에 실패했습니다.');
			}
		} catch (error) {
			console.error('Error updating user info:', error);
			Alert.alert('오류', '서버와의 통신 중 문제가 발생했습니다.');
		}
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<FullView>
					<images.Back_icon
						style={{ marginTop: 30, marginLeft: 20 }}
						onPress={() => navigation.goBack()}
						color={'#D9D9D9'}
					/>
					<View style={{ flexDirection: 'row' }}>
						<Bar style={{ backgroundColor: '#0066FF', width: '80%' }} />
						<Bar />
					</View>
			
					<MainView>
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

						<MainText>이름(닉네임)을 입력해 주세요. *</MainText>
						<TextInput
							placeholder='닉네임'
							value={UserName}
							onChangeText={setUserName}
						/>
						<TouchableOpacity style={{ width: 300, height: 1, backgroundColor: '#D9D9D9' }} />
				
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40 }}>
							<MainText>전화번호를 입력해 주세요.</MainText>
							<TouchableOpacity onPress={() => navigation.navigate('Register5')} >
								<MainText style={{ color: "#0066FF", fontSize: 12, marginRight: 20 }}>건너뛰기</MainText>
							</TouchableOpacity>
						</View>

						<Text style={{ fontSize: 10 }}>비상시 점주님 및 근무자들에게 연락할 수 있어요!</Text>
						<TextInput
							placeholder='전화번호'
							value={UserPhoneNum}
							onChangeText={handlePhoneChange}
							keyboardType='numeric'
							maxLength={13}
						/>
						<TouchableOpacity style={{ width: 300, height: 1, backgroundColor: '#D9D9D9' }} />
				
				
					</MainView>

					<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100 }}>
						<ResultCircle />
						<ResultCircle />
						<ResultCircle />
						<ResultCircle color={'#0066FF'} style={{ width: 20 }} />
					</View>
					
					<ResultButton onPress={updateUserInfo}>
						<ResultButtonText>다음</ResultButtonText>
					</ResultButton>
				</FullView>
			</ScrollView>
		</KeyboardAvoidingView>
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

export default Register4;
