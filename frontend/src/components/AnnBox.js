// AnnBox.js

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

function AnnBox({ onClose, navigation }) {
	return (
		<AnnBoxContainer>
			<MenuItem onPress={() => { navigation.navigate('Setting'); onClose(); }}>
				<MenuText>회원 정보 수정</MenuText>
			</MenuItem>
			<MenuItem onPress={() => { navigation.navigate('Todo'); onClose(); }}>
				<MenuText>할 일 점검</MenuText>
			</MenuItem>
			<MenuItem onPress={() => { navigation.navigate('Salary'); onClose(); }}>
				<MenuText>근무 기록</MenuText>
			</MenuItem>
			<MenuItem onPress={() => { navigation.navigate('Info1'); onClose(); }}>
				<MenuText>공지사항</MenuText>
			</MenuItem>
		</AnnBoxContainer>
	);
}

const AnnBoxContainer = styled.View`
	/* Add any necessary styles for the container */
`;

const MenuItem = styled.TouchableOpacity`
	padding: 10px;
	margin-vertical: 10px;
`;

const MenuText = styled.Text`
	font-size: 12px;
	color: black;
	font-weight: bold;
`;

export default AnnBox;
