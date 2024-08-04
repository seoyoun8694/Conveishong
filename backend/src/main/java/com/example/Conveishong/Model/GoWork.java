package com.example.Conveishong.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "goWork")
public class GoWork {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goWorkId;
    private Long userId;
    private String goWorkDay;
    private String goWorkTime;
    private String goHomeTime;
}
