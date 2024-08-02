package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.TodoDTO;
import com.example.Conveishong.Model.Todo;
import com.example.Conveishong.Repository.TodoRepository;
import com.example.Conveishong.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    @Autowired
    UserRepository userRepository;

    public TodoDTO createTodo(Long userId, TodoDTO todoDTO){
        Todo todo = new Todo();
        todo.setConveiLocation(userRepository.findUserLocationByUserId(userId));
        todo.setTodoDay(todoDTO.getTodoDay());
        todo.setTodoDone(todoDTO.getTodoDone());
        todo.setTodoName(todoDTO.getTodoName());

        Todo savedTodo = todoRepository.save(todo);
        return convertToDTO(savedTodo);

    }
    public List<Todo> getTodoByLocation(Long userId){
        return todoRepository.findAllByConveiLocation(userRepository.findUserLocationByUserId(userId));
    }
    public List<Todo> getTodoByTodoId(Long todoId){
        return todoRepository.findAllByTodoId(todoId);
    }
    public String updateTodo(Long todoId, TodoDTO todoDTO){
        
    }

    private TodoDTO convertToDTO(Todo todo){
        TodoDTO dto = new TodoDTO();
        dto.setTodoId(todo.getTodoId());
        dto.setTodoName(todo.getTodoName());
        dto.setTodoDay(todo.getTodoDay());
        dto.setConveiLocation(todo.getConveiLocation());
        dto.setTodoDone(todo.getTodoDone());
        return dto;
    }

}
