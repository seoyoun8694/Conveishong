package com.example.Conveishong.Dto;

import lombok.Data;

@Data
public class ReplyDTO {
    private Long replyId;
    private String replyContent;
    private Long userId;
    private Long boardId;
}
