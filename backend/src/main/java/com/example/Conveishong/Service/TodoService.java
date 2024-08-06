package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.TodoDTO;
import com.example.Conveishong.Model.Todo;
import com.example.Conveishong.Model.User;
import com.example.Conveishong.Repository.TodoRepository;
import com.example.Conveishong.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class TodoService {
    @Autowired
    TodoRepository todoRepository;
    @Autowired
    UserRepository userRepository;

    public void createTodo(Long userId, TodoDTO todoDTO){
        Todo todo = new Todo();
        User user = userRepository.findByUserId(userId);
        todo.setConveiLocation(user.getUserLocation());
        todo.setTodoDay(todoDTO.getTodoDay());
        todo.setTodoDone(todoDTO.getTodoDone());
        todo.setTodoName(todoDTO.getTodoName());

        todoRepository.save(todo);
    }
    public List<Todo> getTodoByLocation(Long userId){
        User user = userRepository.findByUserId(userId);
        return todoRepository.findAllByConveiLocation(user.getUserLocation());
    }
    public Todo getTodoByTodoId(Long todoId){
        return todoRepository.findByTodoId(todoId);
    }
    public void updateTodo(Long todoId, TodoDTO todoDTO){
         Todo todo = todoRepository.findByTodoId(todoId);
         if(todoDTO.getTodoName() != null) todo.setTodoName(todoDTO.getTodoName());
         if(todoDTO.getTodoDone() != null) todo.setTodoDone(todoDTO.getTodoDone());
         if(todoDTO.getTodoDay() != null) todo.setTodoDay(todoDTO.getTodoDay());

         todoRepository.save(todo);
    }
    @Transactional
    public void deleteTodo(Long todoId){
        todoRepository.deleteTodoByTodoId(todoId);
    }

}
