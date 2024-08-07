/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';
import { launchImageLibrary } from 'react-native-image-picker';

import images from '../components/imgaes';

function Info2({}) {
	const navigation = useNavigation();
	const user_location = 'GS25테크노파크점';

	const route = useRoute();
	const { selectedMenu } = route.params || {};

	let imageSource;
	switch (selectedMenu) {
		case '공지':
			imageSource = images.Ann_Ann;
			break;
		case '정보':
			imageSource = images.Ann_Info;
			break;
		case '대타':
			imageSource = images.Ann_User;
			break;
		default:
			imageSource = images.Ann_Home;
			break;
	}

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [selectedImages, setSelectedImages] = useState([]);

	const pickImage = () => {
		if (selectedImages.length < 3) {
			launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, (response) => {
				if (response.assets && response.assets.length > 0) {
					setSelectedImages([...selectedImages, response.assets[0].uri]);
				}
			});
		} else {
			alert('You can only upload up to 3 images.');
		}
	};

	const removeImage = (uri) => {
		setSelectedImages(selectedImages.filter(image => image !== uri));
	};

	return (
		<FullView>
			<MainView>
				<LocationBox style={{ alignSelf: 'center', marginTop: 30 }}>
					<images.location color={'white'} width={12} hight={12} />
					<SubText style={{ color: 'white', marginLeft: 5 }}>{user_location}</SubText>
				</LocationBox>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<View style={{ alignItems: 'center', marginTop: 20 }}>
					<AnnBox>
						<AnnImg source={imageSource} />
						<SubText style={{ color: 'white' }}>{selectedMenu}</SubText>
					</AnnBox>
				</View>

				<TextInput
					style={{
						width: '90%',
						borderColor: '909090',
						borderBottomWidth: 1,
						paddingHorizontal: 10,
						marginTop: 20,
						alignSelf: 'center',
						fontWeight: 'bold',
						textAlign: 'center'
					}}
					placeholder="제목을 입력해 주세요."
					onChangeText={text => setTitle(text)}
					value={title}
				/>

				<TextInput
					style={{
						height: 300,
						backgroundColor: '#F3F3F3',
						borderRadius: 15,
						paddingHorizontal: 15,
						paddingVertical: 15,
						marginTop: 10,
						textAlignVertical: 'top',
						fontSize: 10,
					}}
					placeholder="내용을 입력해 주세요."
					multiline
					value={content}
					onChangeText={setContent}
				/>

				<View style={{ flexDirection: 'row', marginTop: 10 }}>
					{selectedImages.map((imageUri, index) => (
						<TouchableOpacity key={index} onPress={() => removeImage(imageUri)}>
							<Image
								source={{ uri: imageUri }}
								style={{ width: 100, height: 80, marginRight: 10, borderRadius: 10 }}
							/>
						</TouchableOpacity>
					))}
					{selectedImages.length < 3 && (
						<TouchableOpacity onPress={pickImage} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#E0E0E0', width: 100, height: 80, borderRadius: 10 }}>
							<Text style={{ fontSize: 24 }}>+</Text>
						</TouchableOpacity>
					)}
				</View>

				<CompleteButton style={{}} onPress={() => navigation.goBack()}>
					<MainText style={{ color: 'white' }}>완료</MainText>
				</CompleteButton>
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
	background-color: #0066FF;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
`;

const AnnImg = styled.Image`
	width: 40px;
	height: 40px;
	margin: 5px;
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

const CompleteButton = styled.TouchableOpacity`
	width: 100%;
	height: 40px;
	background-color: #0066FF;
	border-radius: 15px;
	align-items: center;
	justify-content: center;
	align-self: center;
	position: absolute;
	bottom: -60px;
`;

export default Info2;