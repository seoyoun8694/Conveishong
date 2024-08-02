package com.example.Conveishong.Repository;

import com.example.Conveishong.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    public User findByUserId(Long userId);
    public User findByKakaoEmail(String kakaoEmail);
    public String findUserLocationByUserId(Long userId);
}
