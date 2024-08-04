package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    public List<Reply> findAllByBoardId(Long boardId);

    public Reply findByreplyId(Long replyId);

    public void deleteReplyByReplyId(Long replyId);
}
