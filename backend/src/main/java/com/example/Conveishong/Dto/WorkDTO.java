package com.example.Conveishong.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class WorkDTO {
    private Long workId;
    private String workDay;
    private String workStartTime;
    private String workEndTime;
    private Long userId;
}
