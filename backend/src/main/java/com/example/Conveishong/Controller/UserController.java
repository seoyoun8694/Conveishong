package com.example.Conveishong.Controller;

import com.example.Conveishong.Dto.UserDTO;
import com.example.Conveishong.Model.User;
import com.example.Conveishong.Oauth.OauthToken;
import com.example.Conveishong.Repository.UserRepository;
import com.example.Conveishong.Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
@RestController
@AllArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/api/v1/auth", method = {RequestMethod.GET, RequestMethod.POST})
    public RedirectView getLoginNative(@RequestParam String code) throws JsonProcessingException {
        // 넘어온 인가 코드를 통해 access_token 발급
        OauthToken oauthToken = userService.getAccessToken(code);
        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
        String jwtToken = userService.SaveUserAndGetToken(oauthToken.getAccess_token());

        // 클라이언트에게 전달할 커스텀 URL 생성
        String redirectUrl = "http://43.200.15.190:4000/success&token=" + jwtToken;

        // 클라이언트를 리디렉트 URL로 리디렉션
        return new RedirectView(redirectUrl);
    }

    @PostMapping("/api/v1/updateUserInfo/{userId}")
    public String updateUserInfo(@PathVariable String userId, @RequestBody UserDTO userDTO){
        try{
            userService.updateUserInfo(Long.valueOf(userId), userDTO);
            return ("유저 정보 업데이트 성공!");
        }catch(Exception e){
            return ("유저 정보 업데이트 실패");
        }
    }
    @GetMapping("/api/v1/getUserInfo/{userId}")
    public User getUserInfo(@PathVariable String userId){
        return userService.getUserInfo(Long.valueOf(userId));
    }
}

