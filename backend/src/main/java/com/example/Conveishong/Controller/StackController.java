package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.StackDTO;
import com.example.Conveishong.Model.Stack;
import com.example.Conveishong.Service.StackService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
            StackDTO createdStack = stackService.createStack(stackDTO);
            return("시재 기록 성공!");
        }
        catch(Exception e){
            return("시재 기록 실페!");
        }
    }

    @PostMapping("/api/v1/getStackByStackDayAndMarketId/{stackDay}/{marketId}")
    public ResponseEntity<?> getStackByStackDayAndMarketId(@PathVariable String stackDay, @PathVariable String marketId){
        try{
            List<Stack> stacks = stackService.getStackByStackDayAndMarketId(stackDay,Long.valueOf(marketId));
            List<StackDTO> stackDTOs = stacks.stream()
                    .map(this::convertToDTO)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(stackDTOs);
        }catch (Exception e){
            return ResponseEntity.ok("정보 불러오기 실패");
        }
    }
    @PostMapping("/api/v1/getStackDayAndMarketIdAndStackType/{stackDay}/{marketId}/{stackType}")
    public ResponseEntity<?> getStackDayAndMarketIdAndStackType(@PathVariable String stackDay, @PathVariable String marketId, @PathVariable String stackType){
        try{
            List<Stack> stacks = stackService.getByStackDayAndMarketIdAndStackType(stackDay,Long.valueOf(marketId), stackType);
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
        dto.setMarketId(stack.getMarketId());
        dto.setStackName(stack.getStackName());
        dto.setStackNum(stack.getStackNum());
        dto.setStackType(stack.getStackType());
        dto.setStackDay(stack.getStackDay());
        dto.setUserId(stack.getUserId());
        return dto;
    }
}
