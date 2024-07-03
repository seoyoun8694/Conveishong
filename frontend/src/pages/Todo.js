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


function Todo({}) {
	const navigation = useNavigation();
	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>할 일 점검</MainText>
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

export default Todo;