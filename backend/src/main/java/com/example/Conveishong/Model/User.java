package com.example.Conveishong.Model;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "user")
public class User {

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String userName;
    private String userRole;
    private String userLocation;
    private String userPhoneNum;
    private String userImage;
    private String userMoney;
    private Long kakaoId;
    private String kakaoEmail;
    @Builder
    public User(Long userId, String userName, String userRole, String userLocation, String userPhoneNum, String userImage, String userMoney, Long kakaoId, String kakaoEmail){
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.userLocation = userLocation;
        this.userPhoneNum = userPhoneNum;
        this.userImage = userImage;
        this.userMoney = userMoney;
        this.kakaoId = kakaoId;
        this.kakaoEmail = kakaoEmail;
    }
    public void updateUserInfo(String userName, String userRole, String userLocation, String userPhoneNum, String userImage, String userMoney){
        if(userName != null) this.userName = userName;
        if(userRole != null) this.userRole = userRole;
        if(userLocation != null) this.userLocation = userLocation;
        if(userPhoneNum != null) this.userPhoneNum = userPhoneNum;
        if(userImage != null) this.userImage = userImage;
        if(userMoney != null) this.userMoney = userMoney;
    }
}
