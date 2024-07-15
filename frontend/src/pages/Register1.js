/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import
 {
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import axios from 'axios';

import images from '../components/imgaes';

function Register1({}) {
	const navigation = useNavigation();
	const user_id = '1';

	const [selected, setSelected] = useState('partTime');

	const handleImageClick = (type) => {
		setSelected(type);
	};

	const updateUserRole = async () => {
		try {
			const response = await axios.post(`http://43.200.15.190:4000/api/v1/updateUserInfo/${user_id}`, {
				userRole: selected === 'partTime' ? '알바' : '점주'
			});
		  
			if (response.status === 200) {
				navigation.navigate('Register2');
			} else {
				Alert.alert('오류', '역할 업데이트에 실패했습니다.');
			}
		} catch (error) {
			console.error('Error updating user role:', error);
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
				<Bar style={{ backgroundColor: '#0066FF', width: '20%' }} />
				<Bar />
			</View>
			
			<MainView>
				<MainText style={{ marginTop: 20 }}>컨비숑에 오신걸 환영합니다 ⭐{'\n'} 어떤 일을 하고 계신가요?</MainText>
				<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
					<MainText>알바생</MainText>
					<TouchableOpacity
						style={{ marginBottom: 40 }}
						onPress={() => handleImageClick('partTime')}
					>
						<StyledImage
							source={selected === 'partTime' ? images.Register_PT : images.Register_PT1}
						/>
					</TouchableOpacity>

					<MainText>점주</MainText>
					<TouchableOpacity onPress={() => handleImageClick('president')}>
						<StyledImage
							source={selected === 'president' ? images.Register_P : images.Register_P1}
						/>
					</TouchableOpacity>
				</View>
			</MainView>

			<View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: 100 }}>
				<ResultCircle color={'#0066FF'} style={{ width: 20 }} />
				<ResultCircle />
				<ResultCircle />
				<ResultCircle />
			</View>

			<ResultButton onPress={updateUserRole}>
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

const StyledImage = styled.Image`
	width: 250px;
	height: 146px;
	margin: 10px;
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

export default Register1;
