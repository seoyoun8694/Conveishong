package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    public List<Todo> findAllByConveiLocation(String conveiLocation);
    public Todo findByTodoId(Long todoId);
    void deleteTodoByTodoId(Long todoId);
}
