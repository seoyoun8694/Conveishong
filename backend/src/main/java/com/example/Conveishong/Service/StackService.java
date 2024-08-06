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

    public void createStack(StackDTO stackDTO){
        Stack stack = new Stack();
        stack.setStackDay(stackDTO.getStackDay());
        stack.setStackName(stackDTO.getStackName());
        stack.setStackNum(stackDTO.getStackNum());
        stack.setStackType(stackDTO.getStackType());
        stack.setMarketName(stackDTO.getMarketName());
        stack.setUserId(stackDTO.getUserId());

        stackRepository.save(stack);
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

}
