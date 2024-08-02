package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findAllByConveiLocation(String conveiLocation);
    public List<Todo> findAllByTodoId(Long todoId);
}
