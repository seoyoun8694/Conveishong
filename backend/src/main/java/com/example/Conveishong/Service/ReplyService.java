package com.example.Conveishong.Service;

import com.example.Conveishong.Dto.ReplyDTO;
import com.example.Conveishong.Model.Reply;
import com.example.Conveishong.Repository.ReplyRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor
public class ReplyService {
    @Autowired
    ReplyRepository replyRepository;

    public void createReply(Long userId, ReplyDTO replyDTO){
        Reply reply = new Reply();

        reply.setReplyContent(replyDTO.getReplyContent());
        reply.setUserId(userId);
        reply.setBoardId(replyDTO.getBoardId());

        replyRepository.save(reply);
    }

    public List<Reply> getReply(Long boardId){
        return replyRepository.findAllByBoardId(boardId);
    }

    public void updateReply(Long replyId, ReplyDTO replyDTO){
        Reply reply = replyRepository.findByreplyId(replyId);
        reply.setReplyContent(replyDTO.getReplyContent());

        replyRepository.save(reply);
    }
    @Transactional
    public void deleteReply(Long replyId){
        replyRepository.deleteReplyByReplyId(replyId);
    }
}
