package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.BoardDTO;
import com.example.Conveishong.Model.Board;
import com.example.Conveishong.Service.BoardService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class BoardController {
    @Autowired
    private BoardService boardService;

    @PostMapping("/api/v1/createBoard/{userId}")
    public ResponseEntity<?> createBoard(@PathVariable String userId, @RequestBody BoardDTO boardDTO){
        try{
            boardService.createBoard(Long.valueOf(userId), boardDTO);
            return ResponseEntity.ok("생성 성공!");
        }
        catch(Exception e){
            return ResponseEntity.ok("생성 실패!");
        }
    }
    @GetMapping("/api/v1/getBoard/{userId}")
    public ResponseEntity<?> getBoard(@PathVariable String userId){
        try{
            List<Board> Boards = boardService.getBoard(Long.valueOf(userId));
            return ResponseEntity.ok(Boards);
        }
        catch(Exception e){
            return ResponseEntity.ok("가져오기 실패!");
        }
    }
    @PutMapping("/api/v1/updateBoard/{todoId}")
    public ResponseEntity<?> updateBoard(@PathVariable String todoId, @RequestBody BoardDTO boardDTO){
        try{
            boardService.updateTodo(Long.valueOf(todoId), boardDTO);
            return ResponseEntity.ok("업데이트 성공!");
        }
        catch(Exception e){
            return ResponseEntity.ok("업데이트 실패!");
        }
    }
    @DeleteMapping("/api/v1/deleteBoard/{todoId}")
    public ResponseEntity<?> deleteBoard(@PathVariable String todoId){
        try{
            boardService.deleteBoard(Long.valueOf(todoId));
            return ResponseEntity.ok("삭제 성공!");
        }
        catch(Exception e){
            return ResponseEntity.ok("삭제 실패!");
        }
    }
}
