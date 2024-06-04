package com.example.Conveishong.Dto;

import com.example.Conveishong.Model.User;
import lombok.Data;

@Data
public class UserDTO {
    private Long userId;
    private String userName;
    private String userRole;
    private String userLocation;
    private String userPhoneNum;
    private String userImage;
    private String userMoney;
    private Long kakaoId;
    private String kakaoEmail;

    public User toEntity(){
        return User.builder()
                .userId(userId)
                .userName(userName)
                .userRole(userRole)
                .userLocation(userLocation)
                .userPhoneNum(userPhoneNum)
                .userImage(userImage)
                .userMoney(userMoney)
                .kakaoEmail(kakaoEmail)
                .kakaoId(kakaoId)
                .build();
    }
}
