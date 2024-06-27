/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	Image,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import { launchImageLibrary } from 'react-native-image-picker';

import images from '../components/imgaes';
import { TextInput } from 'react-native-gesture-handler';

function Register4({ }) {
	const navigation = useNavigation();

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

	return (
		<FullView>
			<images.Back_icon
				style={{ marginTop: 30, marginLeft: 20 }}
				onPress={() => navigation.goBack()}
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
				
				<View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 40}}>
					<MainText>전화번호를 입력해 주세요.</MainText>
					<TouchableOpacity onPress={() => navigation.navigate('Register5')} >
						<MainText style={{ color: "#0066FF", fontSize: 12, marginRight: 20 }}>건너뛰기</MainText>
					</TouchableOpacity>
				</View>

				<Text style={{fontSize: 10}}>비상시 점주님 및 근무자들에게 연락할 수 있어요!</Text>
				<TextInput
					placeholder='전화번호'
					value={UserPhoneNum}
					onChangeText={setUserPhoneNum}
					keyboardType='numeric'
				/>
				<TouchableOpacity style={{ width: 300, height: 1, backgroundColor: '#D9D9D9' }} />
				
				
			</MainView>

			<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100}}>
				<ResultCircle />
				<ResultCircle />
				<ResultCircle />
				<ResultCircle color={'#0066FF'} style={{width: 20}}/>
			</View>

			<ResultButton onPress={() => navigation.navigate('Register5')}>
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
