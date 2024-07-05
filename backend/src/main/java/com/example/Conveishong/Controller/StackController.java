package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.StackDTO;
import com.example.Conveishong.Service.StackService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class StackController {
    @Autowired
    private StackService stackService;

    @PostMapping("/api/v1/createStack")
    public String createStack(@RequestBody StackDTO stackDTO){
        try{
            StackDTO createdStack = stackService.createStack(stackDTO);
            return("시재 기록 성공!");
        }
        catch(Exception e){
            return("시재 기록 실페!");
        }
    }
}
