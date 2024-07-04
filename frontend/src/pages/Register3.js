import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import images from '../components/imgaes';

function Register3({}) {
	const navigation = useNavigation();
	const user_id = '1';

	const [selectedDays, setSelectedDays] = useState([]);
	const [selectedStartTimes, setSelectedStartTimes] = useState({});
	const [selectedEndTimes, setSelectedEndTimes] = useState({});
	const [currentDay, setCurrentDay] = useState(null);
	const [isStartTime, setIsStartTime] = useState(true);

	const handleDayClick = (day) => {
		if (selectedDays.includes(day)) {
			setSelectedDays(selectedDays.filter((item) => item !== day));
			const newStartTimes = { ...selectedStartTimes };
			const newEndTimes = { ...selectedEndTimes };
			delete newStartTimes[day];
			delete newEndTimes[day];
			setSelectedStartTimes(newStartTimes);
			setSelectedEndTimes(newEndTimes);
		} else {
			setSelectedDays([...selectedDays, day]);
		}
	};

	const handleTimeChange = (event, selectedDate) => {
		const selectedDateTime = selectedDate || new Date();
		if (isStartTime) {
			setSelectedStartTimes({
				...selectedStartTimes,
				[currentDay]: selectedDateTime,
			});
		} else {
			setSelectedEndTimes({
				...selectedEndTimes,
				[currentDay]: selectedDateTime,
			});
		}
		setCurrentDay(null);
	};

	const showTimepicker = (day, isStart) => {
		setCurrentDay(day);
		setIsStartTime(isStart);
	};

	const formatTime = (date) => {
		if (!date) return '';
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		return `${hours}:${minutes}`;
	};

	const sendDataToServer = async () => {
		try {
			const workTimesData = selectedDays.map(day => ({
				userId: parseInt(user_id),
				workDay: day,
				workStartTime: selectedStartTimes[day] ? formatTime(selectedStartTimes[day]) : null,
				workEndTime: selectedEndTimes[day] ? formatTime(selectedEndTimes[day]) : null,
			}));

			for (const workTime of workTimesData) {
				const response = await axios.post(`http://43.200.15.190:4000/api/v1/createWorkTime/${user_id}`, workTime, {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.status !== 200) {
					throw new Error(`근무 시간 업데이트에 실패했습니다. (status: ${response.status})`);
				}
			}

			navigation.navigate('Register4');
		} catch (error) {
			console.error('Error sending data to server:', error.response ? error.response.data : error.message);
			Alert.alert('오류', '근무 시간 저장 중 오류가 발생했습니다.');
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
				<Bar style={{ backgroundColor: '#0066FF', width: '60%' }} />
				<Bar />
			</View>

			<MainView>
				<MainText style={{ marginTop: 20 }}>
					근무 요일과 근무 시간을 설정해 주세요.
				</MainText>
				<SubText style={{ marginTop: 20, marginBottom: 10 }}>
					근무 요일(복수 선택 가능)
				</SubText>
				<WorkDayContainer>
					{['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
						<WorkDay
							key={index}
							selected={selectedDays.includes(day)}
							onPress={() => handleDayClick(day)}
						>
							<SubText selected={selectedDays.includes(day)}>{day}</SubText>
						</WorkDay>
					))}
				</WorkDayContainer>

				<SubText style={{ marginTop: 40 }}>
					근무 시간(시작 시간~종료 시간)
				</SubText>
				{selectedDays.map((day, index) => (
					<DayTimeContainer key={index}>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300, alignSelf: 'center' }}>
							<WorkTimeText style={{ marginRight: 5, fontSize: 15 }}>{day}</WorkTimeText>
							<TimePickerContainer>
								<WorkTimeRow>
									<WorkTime
										onPress={() => showTimepicker(day, true)}
										selected={!!selectedStartTimes[day]}
									>
										<WorkTimeText>
											{formatTime(selectedStartTimes[day])}
										</WorkTimeText>
									</WorkTime>
								</WorkTimeRow>
								<WorkTimeText style={{ alignSelf: 'center' }}>~</WorkTimeText>
								<WorkTimeRow>
									<WorkTime
										onPress={() => showTimepicker(day, false)}
										selected={!!selectedEndTimes[day]}
									>
										<WorkTimeText>
											{formatTime(selectedEndTimes[day])}
										</WorkTimeText>
									</WorkTime>
								</WorkTimeRow>
							</TimePickerContainer>
						</View>
					</DayTimeContainer>
				))}
			</MainView>

			{currentDay && (
				<DateTimePicker
					testID="timePicker"
					value={new Date()}
					mode="time"
					is24Hour={true}
					display="default"
					onChange={handleTimeChange}
				/>
			)}

			<View
				style={{
					flexDirection: 'row',
					alignSelf: 'center',
					marginTop: 20,
					position: 'absolute',
					bottom: 100,
				}}
			>
				<ResultCircle />
				<ResultCircle />
				<ResultCircle color={'#0066FF'} style={{ width: 20 }} />
				<ResultCircle />
			</View>

			<ResultButton onPress={sendDataToServer}>
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
	color: ${(props) => props.color || 'black'};
`;

const Bar = styled.View`
	width: 100%;
	height: 1.5px;
	background-color: ${(props) => props.style?.backgroundColor || '#D9D9D9'};
	margin-top: 20px;
`;

const ResultButton = styled.TouchableOpacity`
	width: 100%;
	height: 70px;
	background-color: #0066ff;
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
	background-color: ${(props) => props.color || '#D9D9D9'};
	border-radius: 100px;
`;

const SubText = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: ${(props) => (props.selected ? 'white' : '#3E3E3E')};
`;

const WorkDayContainer = styled.View`
	width: 300px;
	height: auto;
	flex-direction: row;
	align-self: center;
	justify-content: space-between;
`;

const WorkDay = styled.TouchableOpacity`
	width: 37px;
	height: 37px;
	border-radius: 100px;
	background-color: ${(props) => (props.selected ? '#0066ff' : 'white')};
	align-items: center;
	justify-content: center;
	border: ${(props) => (props.selected ? 'none' : '1px solid #0066ff')};
	border-color: ${(props) => (props.selected ? '#0066ff' : '#d9d9d9')};
`;

const DayTimeContainer = styled.View`
  	margin-top: 20px;
`;

const WorkTimeRow = styled.View`
	flex-direction: row;
	align-items: center;
	margin-left: 10px;
	margin-right: 10px;
`;

const TimePickerContainer = styled.View`
	flex-direction: row;
`;

const WorkTime = styled.TouchableOpacity`
	width: 120px;
	height: 30px;
	border-radius: 15px;
	background-color: ${(props) => (props.selected ? 'white' : '#EFEFEF')};
	align-items: center;
	justify-content: center;
	border: 1px solid ${(props) => (props.selected ? '#0066ff' : '#EFEFEF')};
`;

const WorkTimeText = styled.Text`
	color: #3E3E3E;
	font-size: 12px;
	font-weight: normal;
	text-align: center;
`;

export default Register3;
