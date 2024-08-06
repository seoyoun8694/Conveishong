package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.StackDTO;
import com.example.Conveishong.Model.Stack;
import com.example.Conveishong.Repository.StackRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StackService {
    @Autowired
    StackRepository stackRepository;

    public StackDTO createStack(StackDTO stackDTO){
        Stack stack = new Stack();
        stack.setStackDay(stackDTO.getStackDay());
        stack.setStackName(stackDTO.getStackName());
        stack.setStackNum(stackDTO.getStackNum());
        stack.setStackType(stackDTO.getStackType());
        stack.setMarketName(stackDTO.getMarketName());
        stack.setUserId(stackDTO.getUserId());

        Stack savedStack = stackRepository.save(stack);
        return convertToDTO(savedStack);
    }

    public List<Stack> getStackByStackDayAndMarketName(StackDTO stackDTO){
        String stackDay = stackDTO.getStackDay();
        String marketName = stackDTO.getMarketName();
        return stackRepository.findByStackDayAndMarketName(stackDay, marketName);
    }

    public List<Stack> getByStackDayAndMarketNameAndStackType(StackDTO stackDTO){
        String stackDay = stackDTO.getStackDay();
        String marketName = stackDTO.getMarketName();
        String stackType = stackDTO.getStackType();
        return stackRepository.findByStackDayAndMarketNameAndStackType(stackDay, marketName, stackType);
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
