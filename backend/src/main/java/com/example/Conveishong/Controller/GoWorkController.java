package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.GoWorkDTO;
import com.example.Conveishong.Model.GoWork;
import com.example.Conveishong.Service.GoWorkService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class GoWorkController {
    @Autowired
    GoWorkService goWorkService;
    @PostMapping("/api/v1/createGoWork/{userId}")
    public ResponseEntity<?> createGoWork(@PathVariable String userId, @RequestBody GoWorkDTO goWorkDTO){
        try{
            goWorkService.createGoWork(Long.valueOf(userId), goWorkDTO);
            return ResponseEntity.ok("출근 생성 성공!");
        }
        catch(Exception e){
            return ResponseEntity.ok("출근 생성 실패!");
        }
    }

    @GetMapping("/api/v1/getGoWork/{userId}")
    public ResponseEntity<?> getGoWork(@PathVariable String userId){
        try{
            List<GoWork> goWorks = goWorkService.getGowork(Long.valueOf(userId));
            return ResponseEntity.ok(goWorks);
        }
        catch(Exception e){
            return ResponseEntity.ok("가져오기 실패!");
        }
    }
}
