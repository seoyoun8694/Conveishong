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
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import axios from 'axios';

import images from '../components/imgaes';

const denominations = [
	{ id: '1', value: 50000, label: '50,000원' },
	{ id: '2', value: 10000, label: '10,000원' },
	{ id: '3', value: 5000, label: '5,000원' },
	{ id: '4', value: 1000, label: '1,000원' },
	{ id: '5', value: 500, label: '500원' },
	{ id: '6', value: 100, label: '100원' },
	{ id: '7', value: 50, label: '50원' },
	{ id: '8', value: 10, label: '10원' },
];

function Money({ }) {
	const navigation = useNavigation();
	const user_id = '1';
	const [userLocation, setUserLocation] = useState('');

	const [counts, setCounts] = useState(denominations.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
	const [initialCounts] = useState({ ...counts });
	const [totalMoney, setTotalMoney] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		const fetchUserInfo = async () => {
			try {
				const response = await axios.get(`http://43.200.15.190:4000/api/v1/getUserInfo/${user_id}`);
				setUserLocation(response.data.userLocation);
			} catch (error) {
				console.error("Failed to fetch user info:", error);
			}
		};

		fetchUserInfo();
	}, [user_id]);

	useEffect(() => {
		const total = denominations.reduce((acc, item) => acc + (counts[item.id] * item.value), 0);
		setTotalMoney(total);
	}, [counts]);

	const incrementCount = (id) => {
		setCounts((prevCounts) => ({
			...prevCounts,
			[id]: prevCounts[id] + 1
		}));
	};

	const decrementCount = (id) => {
		setCounts((prevCounts) => ({
			...prevCounts,
			[id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0
		}));
	};

	const formatCurrency = (amount) => {
		return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	};

	const getModifiedItems = () => {
		return denominations.filter(item => counts[item.id] !== initialCounts[item.id]).map(item => ({
			...item,
			count: counts[item.id]
		}));
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<LocationBox style={{ alignSelf: 'center', marginTop: 30 }}>
					<images.location color={'white'} width={12} hight={12} />
					<SubText style={{ color: 'white', marginLeft: 5 }}>{userLocation}</SubText>
				</LocationBox>

				<FlatList style={{ marginTop: 20 }}
					data={denominations}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ItemContainer>
							<SubText style={{ fontWeight: 'bold', fontSize: 12 }}>{item.label}</SubText>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<CountButton onPress={() => incrementCount(item.id)}>
									<MainText style={{ color: '#0066FF' }}>+</MainText>
								</CountButton>
								<SubText style={{ marginHorizontal: 10, fontWeight: 'bold', fontSize: 12 }}>{counts[item.id]}</SubText>
								<CountButton onPress={() => decrementCount(item.id)}>
									<MainText style={{ color: '#FF0000' }}>-</MainText>
								</CountButton>
							</View>
						</ItemContainer>
					)}
				/>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<ModalView>
						<ModalContent>
							<ModalBar />
							<MainText style={{ marginBottom: 20, alignSelf: 'center', marginTop: 30, color: '#909090' }}>점검사항 확인</MainText>
							<ScrollView>
								{getModifiedItems().map((item) => (
									<ItemContainer key={item.id} style={{ width: '70%', alignSelf: 'center' }}>
										<SubText style={{ fontWeight: 'bold', fontSize: 12 }}>{item.label}</SubText>
										<SubText style={{ color: '#0066FF', fontWeight: 'bold', fontSize: 12 }}>
											{item.count > 0 ? `+${item.count}` : item.count}
										</SubText>
									</ItemContainer>
								))}
							</ScrollView>
							<View style={{ alignItems: 'center', marginTop: 10 }}>
								<MainText style={{ color: '#909090', marginBottom: 5 }}>총 시재 금액</MainText>
								<MainText style={{ fontSize: 25 }}>{formatCurrency(totalMoney)} 원</MainText>
							</View>
							<View style={{ alignItems: 'center', marginTop: 20 }}>
								<CompleteButton
									style={{ marginBottom: 30 }}
									onPress={() => {
										setModalVisible(false);
										navigation.navigate('Inspection');
									}}>
									<MainText style={{ color: 'white' }}>완료</MainText>
								</CompleteButton>
							</View>
						</ModalContent>
					</ModalView>
				</Modal>
			</MainView>

			<TotalContainer>
				<MainText style={{ color: '#909090', marginBottom: 5 }}>총 시재 금액</MainText>
				<MainText style={{ fontSize: 25 }}>{formatCurrency(totalMoney)} 원</MainText>
			</TotalContainer>

			<CompleteButton style={{ position: 'absolute', bottom: 30 }}
				onPress={() => setModalVisible(true)}
			>
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
	width: 90%;
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
	color: black;
	font-weight: normal;
`;

const LocationBox = styled.TouchableOpacity`
	width: 130px;
	height: 25px;
	align-items: center;
	justify-content: center;
	flex-direction: row;
	background-color: #0066FF;
	border-radius: 15px;
`;

const ItemContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 10px 0;
	width: 80%;
	align-self: center;
`;

const CountButton = styled.TouchableOpacity`
	width: 25px;
	height: 25px;
	align-items: center;
	justify-content: center;
`;

const TotalContainer = styled.View`
	width: 100%;
	align-items: center;
	position: absolute;
	bottom: 130px;
`;

const CompleteButton = styled.TouchableOpacity`
	width: 80%;
	height: 40px;
	background-color: #0066FF;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	align-self: center;
`;

const ModalView = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.View`
	width: 100%;
	height: 50%;
	background-color: white;
	border-top-right-radius: 20px;
	border-top-left-radius: 20px;
	position: absolute;
	bottom: 0px;
`;

const ModalBar = styled.TouchableOpacity`
	width: 120px;
	height: 3px;
	background-color: #D9D9D9;
	border-radius: 100px;
	align-self: center;
	margin-top: 15px;
`;

export default Money;
