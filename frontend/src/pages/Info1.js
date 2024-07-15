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

function Info1({}) {
	const navigation = useNavigation();
	
	const [selectedMenu, setSelectedMenu] = useState('전체');

	const handleMenuSelect = (menu) => {
		setSelectedMenu(menu);
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>공지사항</MainText>

				<View style={{ flexDirection: 'row', marginTop: 20, alignSelf: 'center' }}>
					<AnnBox style={{ marginRight: 15, backgroundColor: selectedMenu === '전체' ? '#0066FF' : '#F3F3F3' }}
						onPress={() => handleMenuSelect('전체')}
					>
						<AnnImg source={images.Ann_Home} />
						<SubText style={{ color: selectedMenu === '전체' ? 'white' : 'black' }}>전체</SubText>
					</AnnBox>
					<AnnBox style={{ marginRight: 15, backgroundColor: selectedMenu === '공지' ? '#0066FF' : '#F3F3F3' }}
						onPress={() => handleMenuSelect('공지')}
					>
						<AnnImg source={images.Ann_Ann} />
						<SubText style={{ color: selectedMenu === '공지' ? 'white' : 'black' }}>공지</SubText>
					</AnnBox>
					<AnnBox style={{ marginRight: 15, backgroundColor: selectedMenu === '정보' ? '#0066FF' : '#F3F3F3' }}
						onPress={() => handleMenuSelect('정보')}
					>
						<AnnImg source={images.Ann_Info} />
						<SubText style={{ color: selectedMenu === '정보' ? 'white' : 'black' }}>정보</SubText>
					</AnnBox>
					<AnnBox style={{ backgroundColor: selectedMenu === '대타' ? '#0066FF' : '#F3F3F3' }}
						onPress={() => handleMenuSelect('대타')}
					>
						<AnnImg source={images.Ann_User} />
						<SubText style={{ color: selectedMenu === '대타' ? 'white' : 'black' }}>대타</SubText>
					</AnnBox>
				</View>
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

const SubText = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: black;
`;

const AnnBox = styled.TouchableOpacity`
	width: 65px;
	height: 80px;
	background-color: #F3F3F3;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
`;

const AnnImg = styled.Image`
	width: 40px;
	height: 40px;
	margin: 5px;
`;

export default Info1;