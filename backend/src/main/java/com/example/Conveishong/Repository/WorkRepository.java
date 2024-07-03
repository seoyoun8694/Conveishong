package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Work;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkRepository extends JpaRepository<Work, Long> {
    public Work findByUserId(Long userId);
}
