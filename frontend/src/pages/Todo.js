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
import axios from 'axios';

import images from '../components/imgaes';

function Todo() {
	const navigation = useNavigation();
	const user_id = '1';
	
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMonthYear, setCurrentMonthYear] = useState(currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }));
    const [todos, setTodos] = useState([]);
    const [selectedTodos, setSelectedTodos] = useState({});
    const [editingTodo, setEditingTodo] = useState(null);
    const [editedText, setEditedText] = useState('');

    useEffect(() => {
        setCurrentMonthYear(currentDate.toLocaleString('ko-KR', { year: 'numeric', month: 'long' }));
    }, [currentDate]);

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://43.200.15.190:4000/api/v1/getTodoByLocation/${user_id}`);
            if (Array.isArray(response.data)) {
                setTodos(response.data);
                const initialSelectedTodos = {};
                response.data.forEach(todo => {
                    initialSelectedTodos[todo.todoId] = todo.todoDone === "true";
                });
                setSelectedTodos(initialSelectedTodos);
            } else {
                console.error('Unexpected response structure:', response.data);
                setTodos([]);
            }
        } catch (error) {
            console.error('Error fetching todos:', error);
            setTodos([]);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        const newTodo = { todoId: todos.length + 1, todoName: '내용', todoDone: false, todoDay: currentDate.toISOString().split('T')[0] };
        setTodos([...todos, newTodo]);

        try {
            await axios.post(`http://43.200.15.190:4000/api/v1/createTodo/${user_id}`, {
                todoDay: newTodo.todoDay,
                todoDone: "false",
                todoName: newTodo.todoName,
            });
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const handleTodoPress = async (id) => {
        const selectedTodo = todos.find(todo => todo.todoId === id);
        const updatedDoneStatus = !selectedTodos[id];
    
        setSelectedTodos(prevState => ({
            ...prevState,
            [id]: updatedDoneStatus,
        }));
    
        try {
            await axios.put(`http://43.200.15.190:4000/api/v1/updateTodo/${id}`, {
                todoDone: updatedDoneStatus ? "true" : "false",
                todoName: selectedTodo.todoName,
            });
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const handleEditPress = (todo) => {
        setEditingTodo(todo.todoId);
        setEditedText(todo.todoName);
    };

    const handleSavePress = async () => {
        try {
            await axios.put(`http://43.200.15.190:4000/api/v1/updateTodo/${editingTodo}`, {
                todoName: editedText,
                todoDone: selectedTodos[editingTodo] ? "true" : "false",
            });
            setTodos(todos.map(todo => 
                todo.todoId === editingTodo ? { ...todo, todoName: editedText } : todo
            ));
            setEditingTodo(null);
            setEditedText('');
        } catch (error) {
            console.error('Error updating todo name:', error);
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`http://43.200.15.190:4000/api/v1/deleteTodo/${id}`);
            setTodos(todos.filter(todo => todo.todoId !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const filteredTodos = todos.filter(todo => todo.todoDay === currentDate.toISOString().split('T')[0]);

	return (
		<FullView>
			<MainView>
				<View style={{ flexDirection: 'row', marginTop: 30, position: 'absolute' }}>
					<images.Back_icon color={'#D9D9D9'} onPress={() => navigation.goBack()} />
				</View>
				<MainText style={{ alignSelf: 'center', marginTop: 30 }}>할 일 점검</MainText>
				<MainText style={{ alignSelf: 'center', marginTop: 20, marginBottom: 10 }}>{currentMonthYear}</MainText>
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
				{filteredTodos.map(todo => (
					<View key={todo.todoId} style={{ justifyContent: 'space-between', flexDirection: 'row', marginBottom: 20 }}>
						<View style={{ flexDirection: 'row' }}>
							<Todos onPress={() => handleTodoPress(todo.todoId)} selected={selectedTodos[todo.todoId]}>
								{selectedTodos[todo.todoId]}
							</Todos>
							{editingTodo === todo.todoId ? (
								<TextInput
									style={{ borderBottomWidth: 1, borderColor: '#0066FF', width: '70%', height: 40 }}
									value={editedText}
									onChangeText={setEditedText}
									autoFocus={true}
								/>
							) : (
								<TouchableOpacity onPress={() => handleEditPress(todo)}>
									<Text style={{ color: selectedTodos[todo.todoId] ? '#A9A9A9' : 'black' }}>{todo.todoName}</Text>
								</TouchableOpacity>
							)}
						</View>
						{editingTodo === todo.todoId ? (
							<TouchableOpacity onPress={handleSavePress}>
								<Text style={{ color: '#0066FF' }}>완료</Text>
							</TouchableOpacity>
						) : (
							<TouchableOpacity onPress={() => handleDeleteTodo(todo.todoId)}>
								<images.trash />
							</TouchableOpacity>
						)}
					</View>
				))}
			</MainView>
			<CompleteButton style={{ position: 'absolute', bottom: 30 }} onPress={() => navigation.goBack()}>
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

export default Todo;
