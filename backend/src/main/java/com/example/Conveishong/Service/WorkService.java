package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.WorkDTO;
import com.example.Conveishong.Model.User;
import com.example.Conveishong.Model.Work;
import com.example.Conveishong.Repository.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkService {
    @Autowired
    WorkRepository workRepository;

    public void createUserWorkTime(Long userId, WorkDTO workDTO) {
        Work work = new Work();
        work.setUserId(userId);
        work.setWorkDay(workDTO.getWorkDay());
        work.setWorkStartTime(workDTO.getWorkStartTime());
        work.setWorkEndTime(workDTO.getWorkEndTime());

        workRepository.save(work);
    }
    public List<Work> getUserWorkTimes(Long userId) {
        return workRepository.findAllByUserId(userId);
    }

}
