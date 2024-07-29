/* eslint-disable prettier/prettier */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/self-closing-comp */

import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styled from "styled-components/native";
import { CalendarProvider, WeekCalendar } from "react-native-calendars";

import images from '../components/imgaes';

function Todo({}) {
    const navigation = useNavigation();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonthYear, setCurrentMonthYear] = useState(currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }));
    const [todos, setTodos] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState({});
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        setCurrentMonthYear(currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }));
    }, [currentDate]);

    const handleAddTodo = () => {
        setTodos([...todos, { id: todos.length, text: '내용', completed: false }]);
    };

    const handleTodoPress = (id) => {
        setSelectedTodos(prevState => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleEditPress = (todo) => {
        setEditingTodo(todo.id);
        setEditedText(todo.text);
    };

    const handleSavePress = () => {
        setTodos(todos.map(todo => todo.id === editingTodo ? { ...todo, text: editedText } : todo));
        setEditingTodo(null);
        setEditedText('');
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>할 일 점검</MainText>
				<MainText style={{ alignSelf: 'center', marginTop: 30, marginBottom: 10, color: '#0066FF' }}>{currentMonthYear}</MainText>
			</MainView>
			<CalendarProvider
				date={currentDate.toISOString().split('T')[0]}
				onDateChanged={(date) => setCurrentDate(new Date(date))}
			>
				<WeekCalendar firstDay={1} />
			</CalendarProvider>

			<MainView style={{ height: '68%' }}>
				<View style={{ flexDirection: 'row', marginBottom: 20 }}>
					<TouchableOpacity onPress={handleAddTodo}>
						<images.add style={{ marginRight: 10 }} />
					</TouchableOpacity>
					<Text>항목 추가하기</Text>
				</View>
				{todos.map(todo => (
					<View key={todo.id} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ flexDirection: 'row' }}>
							<Todos onPress={() => handleTodoPress(todo.id)} selected={selectedTodos[todo.id]}>
								{selectedTodos[todo.id]}
							</Todos>
							{editingTodo === todo.id ? (
								<TextInput
									style={{ borderBottomWidth: 1, borderColor: '#0066FF', width: '70%', height: 40 }}
									value={editedText}
									onChangeText={setEditedText}
								/>
							) : (
								<TouchableOpacity onPress={() => handleEditPress(todo)}>
									<Text style={{ color: selectedTodos[todo.id] ? '#A9A9A9' : 'black' }}>{todo.text}</Text>
								</TouchableOpacity>
							)}
						</View>
						{editingTodo === todo.id ? (
							<TouchableOpacity onPress={handleSavePress}>
								<Text style={{ color: '#0066FF' }}>완료</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => handleDeleteTodo(todo.id)}>
								<images.trash />
							</TouchableOpacity>
						)}
					</View>
				))}
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

const Todos = styled.TouchableOpacity`
	width: 20px;
	height: 20px;
	border-color: #0066FF;
	border-width: 2px;
	background-color: ${props => props.selected ? '#0066FF' : 'white'};
	border-radius: 100px;
	margin-right: 10px;
	justify-content: center;
	align-items: center;
`;

export default Todo;
