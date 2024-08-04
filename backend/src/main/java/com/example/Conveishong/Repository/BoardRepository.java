package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    public List<Board> findAllByConveiLocation(String conveiLocation);
    public Board findByBoardId(Long boardId);

    public void deleteBoardByBoardId(Long boardId);
}
