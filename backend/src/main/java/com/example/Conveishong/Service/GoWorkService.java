package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.GoWorkDTO;
import com.example.Conveishong.Model.GoWork;
import com.example.Conveishong.Repository.GoWorkRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class GoWorkService {
    @Autowired
    GoWorkRepository goWorkRepository;

    public void createGoWork(Long userId, GoWorkDTO goWorkDTO){
        GoWork goWork = new GoWork();
        goWork.setUserId(userId);
        goWork.setGoWorkDay(goWorkDTO.getGoWorkDay());
        goWork.setGoWorkTime(goWork.getGoWorkTime());
        goWork.setGoHomeTime(goWork.getGoHomeTime());

        goWorkRepository.save(goWork);
    }
    public List<GoWork> getGowork(Long userId){
        return goWorkRepository.findAllByUserId(userId);
    }
}
