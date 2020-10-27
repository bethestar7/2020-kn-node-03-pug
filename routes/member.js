const express = require('express'); //express 모듈 불러오기
const router = express.Router(); //express의 Router 객체 불러오기 // new Router();와 동일. 생성자로 인스턴스(공간) 객체 만드는 것

router.get('/login', (req, res, next) => { //router에 /login으로 요청이 들어오면~
	const pug = {
		title: "로그인 페이지",
		scriptFile: '../js/f-member.js' //내가 쓰는 자바스크립트 등록
	}
	res.render('./member/login.pug', pug)
});

router.get('/join', (req, res, next) => { //router에 /login으로 요청이 들어오면~
	const pug = {
		title: "회원가입 페이지",
		scriptFile: '../js/f-join.js'
	}
	res.render('./member/join.pug', pug)
});

//네이버 html 을 pug파일로 변환해서 이렇게 하면 비슷하게 보인다 / html2pug 에서 변환 가능
router.get('/naver', (req, res, next) => {
	res.render('./naver.pug')
});

module.exports = router; //router 내보내기