package com.example.Conveishong.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "work")
public class Work {

    @Id
    @Column(name = "work_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workId;
    private String workDay;
    private String workTime;
    private Long userId;

}
