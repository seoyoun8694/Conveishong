/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import {
	View,
	TouchableOpacity,
	Text,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";

import images from '../components/imgaes';

function GiftCard({ }) {
	const navigation = useNavigation();
	const user_location = 'GS25테크노파크점';

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, alignItems: 'center' }}>
					<images.Back_icon onPress={() => navigation.goBack()} />
					<LocationBox style={{ marginLeft: 75}}>
						<images.location width={12} hight={12} />
						<SubText style={{ color: 'white', marginLeft: 5}}>{user_location}</SubText>
					</LocationBox>
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

export default GiftCard;