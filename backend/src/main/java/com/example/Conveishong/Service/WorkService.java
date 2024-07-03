package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.WorkDTO;
import com.example.Conveishong.Model.Work;
import com.example.Conveishong.Repository.WorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class WorkService {
    @Autowired
    WorkRepository workRepository;

    public WorkDTO createUserWorkTime(Long userId, WorkDTO workDTO) {
        Work work = new Work();
        work.setUserId(userId);
        work.setWorkDay(workDTO.getWorkDay());
        work.setWorkStartTime(workDTO.getWorkStartTime());
        work.setWorkEndTime(workDTO.getWorkEndTime());

        Work savedWork = workRepository.save(work);
        return convertToDTO(savedWork);
    }

    private WorkDTO convertToDTO(Work work) {
        WorkDTO dto = new WorkDTO();
        dto.setWorkId(work.getWorkId());
        dto.setWorkDay(work.getWorkDay());
        dto.setWorkStartTime(work.getWorkStartTime());
        dto.setWorkEndTime(work.getWorkEndTime());
        dto.setUserId(work.getUserId());
        return dto;
    }
}
