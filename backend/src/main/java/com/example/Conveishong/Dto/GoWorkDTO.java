package com.example.Conveishong.Dto;

import lombok.Data;

@Data
public class GoWorkDTO {
    private Long goWorkId;
    private Long userId;
    private String goWorkDay;
    private String goWorkTime;
    private String goHomeTime;
}
