package com.example.Conveishong.Dto;

import lombok.Data;

@Data
public class BoardDTO {
    private Long boardId;
    private String title;
    private String tag;
    private String userId;
    private String writtenDate;
    private Long likeRate;
    private String boardPhoto;
    private String conveiLocation;
}
