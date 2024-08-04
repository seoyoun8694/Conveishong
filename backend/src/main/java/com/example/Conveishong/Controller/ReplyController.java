package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.ReplyDTO;
import com.example.Conveishong.Model.Reply;
import com.example.Conveishong.Service.ReplyService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class ReplyController {
    @Autowired
    ReplyService replyService;

    @PostMapping("/api/v1/createReply/{userId}")
    public ResponseEntity<?> createReply(@PathVariable String userId, @RequestBody ReplyDTO replyDTO){
        try{
            replyService.createReply(Long.valueOf(userId), replyDTO);
            return ResponseEntity.ok("생성 성공!");
        }
        catch (Exception e){
            return ResponseEntity.ok("생성 실패!");
        }
    }
    @GetMapping("/api/v1/getReply/{boardId}")
    public ResponseEntity<?> getReply(@PathVariable String boardId){
        try{
            List<Reply> Replies = replyService.getReply(Long.valueOf(boardId));
            return ResponseEntity.ok(Replies);
        }
        catch (Exception e){
            return ResponseEntity.ok("가져오기 실패!");
        }
    }
    @PutMapping("/api/v1/updateReply/{replyId}")
    public ResponseEntity<?> updateReply(@PathVariable String replyId, @RequestBody ReplyDTO replyDTO){
        try{
            replyService.updateReply(Long.valueOf(replyId), replyDTO);
            return ResponseEntity.ok("업데이트 성공!");
        }
        catch (Exception e){
            return ResponseEntity.ok("업데이트 실패!");
        }
    }
    @DeleteMapping("/api/v1/deleteReply/{replyId}")
    public ResponseEntity<?> deleteReply(@PathVariable String replyId){
        try{
            replyService.deleteReply(Long.valueOf(replyId));
            return ResponseEntity.ok("삭제 성공!");
        }
        catch (Exception e){
            return ResponseEntity.ok("삭제 실패!");
        }
    }
}
