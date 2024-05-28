package com.example.Conveishong.Controller;

import com.example.Conveishong.Oauth.OauthToken;
import com.example.Conveishong.Repository.UserRepository;
import com.example.Conveishong.Service.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;
@RestController
@AllArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @RequestMapping(value = "/auth", method = {RequestMethod.GET, RequestMethod.POST})
    public RedirectView getLoginNative(@RequestParam String code) throws JsonProcessingException {
        // 넘어온 인가 코드를 통해 access_token 발급
        OauthToken oauthToken = userService.getAccessToken(code);
        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장
        String jwtToken = userService.SaveUserAndGetToken(oauthToken.getAccess_token());

        // 클라이언트에게 전달할 커스텀 URL 생성
        String redirectUrl = "http://localhost:4000/success&token=" + jwtToken;

        // 클라이언트를 리디렉트 URL로 리디렉션
        return new RedirectView(redirectUrl);
    }
}

