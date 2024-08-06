package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.StackDTO;
import com.example.Conveishong.Model.Stack;
import com.example.Conveishong.Service.StackService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.geom.RectangularShape;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class StackController {
    @Autowired
    private StackService stackService;

    @PostMapping("/api/v1/createStack")
    public String createStack(@RequestBody StackDTO stackDTO){
        try{
            stackService.createStack(stackDTO);
            return("시재 기록 성공!");
        }
        catch(Exception e){
            return("시재 기록 실페!");
        }
    }

    @GetMapping("/api/v1/getStackByStackDayAndMarketId")
    public ResponseEntity<?> getStackByStackDayAndMarketId(@RequestBody StackDTO stackDTO){
        try{
            List<Stack> stacks = stackService.getStackByStackDayAndMarketName(stackDTO);
            List<StackDTO> stackDTOs = stacks.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(stackDTOs);
        }catch (Exception e){
            return ResponseEntity.ok("정보 불러오기 실패");
        }
    }
    @GetMapping("/api/v1/getByStackDayAndMarketNameAndStackType")
    public ResponseEntity<?> getStackDayAndMarketIdAndStackType(@RequestBody StackDTO stackDTO){
        try{
            List<Stack> stacks = stackService.getByStackDayAndMarketNameAndStackType(stackDTO);
            List<StackDTO> stackDTOs = stacks.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(stackDTOs);
        }catch (Exception e){
            return ResponseEntity.ok("정보 불러오기 실패");
        }
    }

    private StackDTO convertToDTO(Stack stack) {
        StackDTO dto = new StackDTO();
        dto.setStackId(stack.getStackId());
        dto.setMarketName(stack.getMarketName());
        dto.setStackName(stack.getStackName());
        dto.setStackNum(stack.getStackNum());
        dto.setStackType(stack.getStackType());
        dto.setStackDay(stack.getStackDay());
        dto.setUserId(stack.getUserId());
        return dto;
    }
}
