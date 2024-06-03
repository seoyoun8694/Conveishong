import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import images from '../components/imgaes';

function Register3({}) {
  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedStartTimes, setSelectedStartTimes] = useState({});
  const [selectedEndTimes, setSelectedEndTimes] = useState({});
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleDayClick = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((item) => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
      setSelectedStartTimes({
        ...selectedStartTimes,
        [day]: null,
      });
      setSelectedEndTimes({
        ...selectedEndTimes,
        [day]: null,
      });
    }
  };

  const handleStartTimeChange = (event, selectedDate, day) => {
    const selectedDateTime = selectedDate || new Date();
    setSelectedStartTimes({
      ...selectedStartTimes,
      [day]: selectedDateTime,
    });
    setShowStartTimePicker(false);
  };

  const handleEndTimeChange = (event, selectedDate, day) => {
    const selectedDateTime = selectedDate || new Date();
    setSelectedEndTimes({
      ...selectedEndTimes,
      [day]: selectedDateTime,
    });
    setShowEndTimePicker(false);
  };

  const showStartTimepicker = (day) => {
    setShowStartTimePicker(true);
  };

  const showEndTimepicker = (day) => {
    setShowEndTimePicker(true);
  };

	return (
		<FullView>
			<images.Back_icon
				style={{ marginTop: 30, marginLeft: 20 }}
				onPress={() => navigation.goBack()}
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

				{selectedDays.map((day, index) => (
					<DayTimeContainer key={index}>
						<DayText>{day}</DayText>
						<TimePickerContainer>
							<WorkTimeRow>
								<TimePickerLabel>시작 시간</TimePickerLabel>
								<WorkTime onPress={() => showStartTimepicker(day)} selected={selectedStartTimes[day] !== null}>
									<WorkTimeInputBox
										placeholder={'--:--'}
										editable={false}
										value={selectedStartTimes[day] ? selectedStartTimes[day].toLocaleTimeString() : ''}
									/>

									{showStartTimePicker && (
										<DateTimePicker
											testID="timePicker"
											value={selectedStartTimes[day] || new Date()}
											mode="time"
											is24Hour={true}
											display="default"
											onChange={(event, selectedDate) => handleStartTimeChange(event, selectedDate, day)}
										/>
									)}
								</WorkTime>
							</WorkTimeRow>
							<WorkTimeRow>
								<TimePickerLabel>종료 시간</TimePickerLabel>
								<WorkTime onPress={() => showEndTimepicker(day)} selected={selectedEndTimes[day] !== null}>
									<WorkTimeInputBox
										placeholder={selectedEndTimes[day] ? selectedEndTimes[day].toLocaleTimeString() : '--:--'}
										editable={false}
									/>
									{showEndTimePicker && (
										<DateTimePicker
											testID="timePicker"
											value={selectedEndTimes[day] || new Date()}
											mode="time"
											is24Hour={true}
											display="default"
											onChange={(event, selectedDate) => handleEndTimeChange(event, selectedDate, day)}
										/>
									)}
								</WorkTime>
							</WorkTimeRow>
						</TimePickerContainer>
					</DayTimeContainer>
				))}
			</MainView>

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

			<ResultButton onPress={() => navigation.navigate('Register4')}>
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
  width: 38px;
  height: 38px;
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

const DayText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const WorkTimeRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TimePickerContainer = styled.View`
  margin-top: 5px;
`;

const TimePickerLabel = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const WorkTime = styled.TouchableOpacity`
  width: 100px;
  height: 25px;
  border-radius: 15px;
  background-color: ${(props) => (props.selected ? 'white' : '#EFEFEF')};
  align-items: center;
  border: 1px solid ${(props) => (props.selected ? '#0066ff' : '#EFEFEF')};
`;

const WorkTimeInputBox = styled.TextInput`
  color: black;
  font-size: 10px;
  font-weight: normal;
  width: 100%;
  height: 100%;
  align-self: center;
`;

export default Register3;
