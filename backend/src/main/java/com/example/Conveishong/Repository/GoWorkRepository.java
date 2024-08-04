package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.GoWork;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoWorkRepository extends JpaRepository<GoWork, Long> {
    public List<GoWork> findAllByUserId(Long userId);
}
