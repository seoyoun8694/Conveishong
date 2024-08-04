package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.TodoDTO;
import com.example.Conveishong.Model.Todo;
import com.example.Conveishong.Service.TodoService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping("/api/v1/createTodo/{userId}")
    public String createTodo(@PathVariable String userId, @RequestBody TodoDTO todoDTO){
        try{
            todoService.createTodo(Long.valueOf(userId), todoDTO);
            return("투두 생성 성공!");
        }
        catch (Exception e) {
            return("투두 생성 실패");
        }
    }
    @GetMapping("/api/v1/getTodoByLocation/{userId}")
    public ResponseEntity<?> getTodoByLocation(@PathVariable String userId){
        try{
            List<Todo> Todos = todoService.getTodoByLocation(Long.valueOf(userId));
            return ResponseEntity.ok(Todos);
        }
        catch (Exception e){
            return ResponseEntity.ok("실패!");
        }
    }

    @GetMapping("/api/v1/getTodoByTodoId/{todoId}")
    public ResponseEntity<?> getTodoByTodoId(@PathVariable String todoId){
        try{
            Todo Todos = todoService.getTodoByTodoId(Long.valueOf(todoId));
            return ResponseEntity.ok(Todos);
        }
        catch (Exception e){
            return ResponseEntity.ok("실패!");
        }
    }

    @PutMapping("/api/v1/updateTodo/{todoId}")
    public ResponseEntity<?> updateTodo(@PathVariable String todoId, @RequestBody TodoDTO todoDTO){
        try{
            todoService.updateTodo(Long.valueOf(todoId), todoDTO);
            return ResponseEntity.ok("반영 성공!");
        }
        catch(Exception e){
            return ResponseEntity.ok("반영 실패!");
        }
    }

    @DeleteMapping("/api/v1/deleteTodo/{todoId}")
    public ResponseEntity<?> deleteTodo(@PathVariable String todoId){
        try {
            todoService.deleteTodo(Long.valueOf(todoId));
            return ResponseEntity.ok("삭제 성공!");
        }
        catch (Exception e){
            return ResponseEntity.ok("삭제 실패!");
        }
    }

}
