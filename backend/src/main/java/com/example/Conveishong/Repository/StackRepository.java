package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Stack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StackRepository extends JpaRepository<Stack, Long> {
    public List<Stack> findByStackDay(String stackDay);
    public List<Stack> findByStackName(String stackName);
    public List<Stack> findByStackDayAndMarketName(String stackDay, String marketName);
    public List<Stack> findByStackDayAndMarketNameAndStackType(String stackDay, String marketName, String stackType);
}
