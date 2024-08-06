package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.BoardDTO;
import com.example.Conveishong.Model.Board;
import com.example.Conveishong.Model.User;
import com.example.Conveishong.Repository.BoardRepository;
import com.example.Conveishong.Repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class BoardService {
    @Autowired
    BoardRepository boardRepository;

    @Autowired
    UserRepository userRepository;

    public void createBoard(Long userId, BoardDTO boardDTO){
        Board board = new Board();
        User user = userRepository.findByUserId(userId);

        board.setConveiLocation(user.getUserLocation());
        board.setBoardPhoto(boardDTO.getBoardPhoto());
        board.setTag(boardDTO.getTag());
        board.setLikeRate(boardDTO.getLikeRate());
        board.setTitle(boardDTO.getTitle());
        board.setUserId(boardDTO.getUserId());
        board.setWrittenDate(boardDTO.getWrittenDate());
        board.setContent(boardDTO.getContent());

        boardRepository.save(board);
    }
    public List<Board> getBoard(Long userId){
        User user = userRepository.findByUserId(userId);
        return boardRepository.findAllByConveiLocation(user.getUserLocation());
    }
    public void updateTodo(Long boardId, BoardDTO boardDTO){
        Board board = boardRepository.findByBoardId(boardId);
        board.setWrittenDate(boardDTO.getWrittenDate());
        board.setTag(boardDTO.getTag());
        board.setBoardPhoto(boardDTO.getBoardPhoto());
        board.setLikeRate(boardDTO.getLikeRate());
        board.setTitle(boardDTO.getTitle());
        board.setContent(boardDTO.getContent());

        boardRepository.save(board);
    }
    @Transactional
    public void deleteBoard(Long boardId){
        boardRepository.deleteBoardByBoardId(boardId);
    }
}
