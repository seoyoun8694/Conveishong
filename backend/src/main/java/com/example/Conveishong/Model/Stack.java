package com.example.Conveishong.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "stack")
public class Stack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stackId;
    private String marketName;
    private String stackName;
    private Long stackNum;
    private String stackType;
    private String stackDay;
    private String userId;
}
