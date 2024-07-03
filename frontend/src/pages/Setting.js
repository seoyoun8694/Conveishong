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


function Setting({}) {
	const navigation = useNavigation();
	const user_name = '홍길동';
	const user_phonenum = '010-1234-5678';
	const user_location = 'GS25테크노파크점';
	const user_work = ['월, 12:00, 18:00', '화, 12:00, 19:00']

	const [UserName, setUserName] = useState(user_name);
	const [UserPhoneNum, setUserPhoneNum] = useState(user_phonenum);
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
				<MainText>전화번화</MainText>
			</MainView>
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

export default Setting;