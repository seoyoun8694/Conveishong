import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import images from '../components/imgaes';

function CustomModal({ visible, onClose, navigation }) {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}
		>
			<CenteredView>
				<ModalView>
					<View style={{ flexDirection: 'row' }}>
						<images.menu color={'#0066FF'} style={{marginRight: 15}} onPress={onClose} />
						<MenuText style={{ color: '#0066FF', marginBottom: 30 }}>MENU</MenuText>
					</View>
					
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
					<CloseButton onPress={onClose}>
						<ButtonText>닫기</ButtonText>
					</CloseButton>
				</ModalView>
			</CenteredView>
		</Modal>
	);
}

const CenteredView = styled.View`
	flex: 1;
`;

const ModalView = styled.View`
	width: 85%;
	height: 100%;
	background-color: white;
	border-top-right-radius: 15px;
	border-bottom-right-radius: 15px;
	padding: 40px;
	shadow-color: #000;
	shadow-offset: {
		width: 2px;
		height: 2px;
	};
	shadow-opacity: 0.25;
	shadow-radius: 4px;
	elevation: 5;
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

const CloseButton = styled.TouchableOpacity`
	background-color: #0066FF;
	border-radius: 15px;
	padding: 10px;
	elevation: 2;
	position: absolute;
	bottom: 30px;
	align-self: center;
	width: 100%;
	height: 40px;
	align-items: center;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: bold;
	text-align: center;
`;

export default CustomModal;
