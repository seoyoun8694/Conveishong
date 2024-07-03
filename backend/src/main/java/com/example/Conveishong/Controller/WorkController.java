package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.WorkDTO;
import com.example.Conveishong.Service.WorkService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class WorkController {
    @Autowired
    private WorkService workService;
    @PostMapping("/api/v1/createWorkTime/{userId}")
    public String createUserWorkTime(@PathVariable String userId, @RequestBody WorkDTO workDTO) {
        try {
            WorkDTO createdWork = workService.createUserWorkTime(Long.valueOf(userId), workDTO);
            return ("유저 근무시간 반영 성공!");
        } catch (Exception e) {
            return ("유저 근무시간 반영 실패!");
        }
    }
}
