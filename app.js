/** 전역 변수 *******************/
const express = require('express'); //express 모듈 불러오기
const app = express(); //express실행한 결과를 app변수에 담기
const path = require('path'); //node가 가진 내장 path모듈 가져오기 (nodemon은 글로벌(전역)로 다운해서 c드라이브(nodejs)에 저장된다)
//이 명령을 통해서 경로를 갖다 붙일 수 있다

/** 전역 변수 *******************/
//router 등록하기
const memberRouter = require('./routes/member');

/** 서버 구동 *******************/
//서버 구동하기
app.listen(3000, () => { console.log('http://127.0.0.1:3000') });

/** Pug 등록 *******************/
//세팅하기
app.set('view engine', 'pug'); //view engine은 pug를 쓰겠다
app.set('views', './views') //views가 담겨있는 폴더는 views다
app.locals.pretty = true;

/** Router *******************/
//미들웨어 등록하기
app.use(express.json()); //json형식으로 바꾸는 함수? json()으로 안쓰고 json이라고만 쓰면 express안의 json변수를 찾게 된다!!
app.use(express.urlencoded({extended: false})); //post방식으로 넘어오는 것들 처리
//정적 폴더 지정 (절대경로 사용)
app.use('/', express.static(path.join(__dirname, './public'))); //전역 라우터 설정. path모듈 가져와서 거기에 이름 붙여서 경로만드는 것. 이렇게 등록을 해야만 접근이 가능하다
app.use('/storage', express.static(path.join(__dirname, './uploads')));
///member로 요청들어오면 응답보낼 수 있게 router연결?
app.use('/member', memberRouter);
