package com.example.Conveishong.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "todo")
public class Todo {
    @Id
    @Column(name = "todo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;
    private String todoName;
    private String todoDay;
    private String todoDone;
    private String conveiLocation;
}
