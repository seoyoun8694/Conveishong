/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	FlatList,
	Modal,
	ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";

import images from '../components/imgaes';

const data = [
	{ id: '1', name: '말보로 레드' },
	{ id: '2', name: '말보로 미디엄' },
	{ id: '3', name: '말보로 골드' },
	{ id: '4', name: '말보로 실버' },
	{ id: '5', name: '가나' },
	{ id: '6', name: '다람쥐' },
	{ id: '7', name: '타요' },
	{ id: '8', name: '냠' },
	{ id: '9', name: '바보' },
];

const consonants = ['전체', 'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

const getChosung = (text) => {
	const choList = [
		"ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ",
		"ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
	];

	let result = "";
	for (let i = 0; i < text.length; i++) {
		const code = text.charCodeAt(i) - 44032;
		if (code > -1 && code < 11172) {
			result += choList[Math.floor(code / 588)];
		} else {
			result += text.charAt(i);
		}
	}
	return result;
};

function Cigarette({ }) {
	const navigation = useNavigation();
	const user_location = 'GS25테크노파크점';

	const [searchText, setSearchText] = useState('');
	const [selectedConsonant, setSelectedConsonant] = useState('전체');
	const [counts, setCounts] = useState(data.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
	const [initialCounts, setInitialCounts] = useState({ ...counts });
	const [modalVisible, setModalVisible] = useState(false);

	const filteredData = data.filter(item => {
		const itemChosung = getChosung(item.name);
		const matchesConsonant = selectedConsonant === '전체' || itemChosung.startsWith(selectedConsonant);
		const matchesSearchText = item.name.includes(searchText);
		return matchesConsonant && matchesSearchText;
	});

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

	const getModifiedItems = () => {
		return Object.keys(counts).filter(id => counts[id] !== initialCounts[id]).map(id => ({
			id,
			name: data.find(item => item.id === id).name,
			count: counts[id]
		}));
	};

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<LocationBox style={{ alignSelf: 'center', marginTop: 30 }}>
					<images.location width={12} hight={12} />
					<SubText style={{ color: 'white', marginLeft: 5 }}>{user_location}</SubText>
				</LocationBox>

				<SerchBox>
					<images.search style={{ marginLeft: 60, marginTop: 12 }} />
					<InputBox
						placeholder="담배명 검색"
						value={searchText}
						onChangeText={setSearchText}
					/>
				</SerchBox>

				<ConsonantContainer>
					{consonants.map((consonant) => (
						<ConsonantButton
							key={consonant}
							onPress={() => setSelectedConsonant(consonant)}
							isSelected={selectedConsonant === consonant}
						>
							<ConsonantText isSelected={selectedConsonant === consonant}>{consonant}</ConsonantText>
						</ConsonantButton>
					))}
				</ConsonantContainer>

				<FlatList
					data={filteredData}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ItemContainer>
							<SubText style={{ fontWeight: 'bold', fontSize: 12 }}>{item.name}</SubText>
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
										<SubText style={{ fontWeight: 'bold', fontSize: 12 }}>{item.name}</SubText>
										<SubText style={{ color: '#0066FF', fontWeight: 'bold', fontSize: 12 }}>
											{item.count > 0 ? `+${item.count}` : item.count}
										</SubText>
									</ItemContainer>
								))}
							</ScrollView>
							<View style={{ alignItems: 'center', marginTop: 80 }}>
								<CompleteButton onPress={() => {
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
	font-size: 10px;
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

const SerchBox = styled.TouchableOpacity`
	width: 100%;
	height: 45px;
	background-color: #F3F3F3;
	border-radius: 15px;
	justify-content: center;
	flex-direction: row;
	margin-top: 20px;
`;

const InputBox = styled.TextInput`
	color: black;
	font-size: 10px;
	font-weight: normal;
	width: 100%;
	height: 100%;
	margin-left: 10px;
`;

const ConsonantContainer = styled.View`
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 10px;
	justify-content: center;
	margin-bottom: 15px;
`;

const ConsonantButton = styled.TouchableOpacity`
	padding: 5px 8px;
	margin: 3px;
	border-radius: 8px;
	background-color: ${props => props.isSelected ? '#0066FF' : 'white'};
	border: 1px solid ${props => props.isSelected ? '#0066FF' : '#909090'};
`;

const ConsonantText = styled.Text`
	color: ${props => props.isSelected ? 'white' : '#909090'};
	font-weight: bold;
	font-size: 12px;
`;

const ItemContainer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
`;

const CountButton = styled.TouchableOpacity`
	width: 25px;
	height: 25px;
	align-items: center;
	justify-content: center;
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

export default Cigarette;
