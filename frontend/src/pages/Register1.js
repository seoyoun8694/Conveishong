import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components"

// SVG를 React 컴포넌트로 가져오기
import Back from '../assets/Back.svg';

function Register1({ }) {
  const navigation = useNavigation();
  
  return (
    <FullView>
      <MainView>
        <Back width={30} height={30} />
        <MainText>회원가입 화면</MainText>
      </MainView>
    </FullView>
  );
}
  
const FullView = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
`;
  
const MainView = styled(FullView)`
  width: 350px;
  height: auto;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${props => props.color || "black"};
  text-align: center;
`;

export default Register1;
