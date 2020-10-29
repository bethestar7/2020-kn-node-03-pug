/** 전역 변수 *******************/
const express = require('express'); //express 모듈 불러오기
const app = express(); //express실행한 결과를 app변수에 담기
const path = require('path'); //node가 가진 내장 path모듈 가져오기 (nodemon은 글로벌(전역)로 다운해서 c드라이브(nodejs)에 저장된다)
//이 명령을 통해서 경로를 갖다 붙일 수 있다
require('dotenv').config(); //dotenv 안의 config 메서드 / dotenv를 쓸 수 있는 준비 / dotenv에 들어가는 환경변수는 .env 파일에 저장?



/** 전역 변수 *******************/
//mysql 등록하기
//const mysql = require('mysql');
//const connection = mysql.createConnection({ //db에 접근하기 (mysql의 createConnection메서드를 통해서)
	//host: '', //127.0.0.1 이라고 쓰거나 localhost라고 쓴다 (지금은)
	//user: '',
	//port: 3306, //3306은 mysql이 가진 기본 포트. 이럴때 생략 가능. 실제 작업에서는 다른 포트를 쓰므로 써줘야 함
	//password: '',
	//database: ''
//});
//console.log(connection); nodemon app 구동하면 Connection이 객체로 들어온다. 즉 접근이 되었다는 뜻
//connection.connect(); //db에 접근

//connection.query('SELECT * FROM books', (err, result, field) => { //콜백함수 인자는 세개 (보통 이벤트는 e, 에러는 err로 하신다고 함)
	//console.log(err, result, field); 터미널창에 이에 대한 내용이 들어옴. 첫번째 에러인자는 null(에러없음), result,데이터는 배열로 들어옴[]배열의 첫번째 인덱스?로 들어온다고?
	//console.log(result[0].id); //배열의 0번 인덱스로 result인자가 들어오니까 그것의 id를 불러올 수 있음
//});

//connection.end(); //db 종료 (작업 후)



/** 전역 변수 *******************/
//router 등록하기
const memberRouter = require('./routes/member');
const sqlRouter = require('./routes/sql'); //sql.js 파일 불러와.
const sqlRouter2 = require('./routes/sql2'); //sql.js 파일 불러와.



/** 서버 구동 *******************/
//서버 구동하기
app.listen(process.env.PORT, () => { console.log('http://127.0.0.1:3000') }); //process.env.PORT 하면 3000이 들어간다



/** Pug 등록 *******************/
//세팅하기
app.set('view engine', 'pug'); //view engine은 pug를 쓰겠다
app.set('views', './views') //views가 담겨있는 폴더는 views다
app.locals.pretty = true;


/** Router *******************/
//post방식 처리하고 경로 지정
//미들웨어 등록하기
app.use(express.json()); //json형식으로 바꾸는 함수? json()으로 안쓰고 json이라고만 쓰면 express안의 json변수를 찾게 된다!!
app.use(express.urlencoded({extended: false})); //post방식으로 넘어오는 것들 처리
//정적 폴더 지정 (절대경로 사용)
app.use('/', express.static(path.join(__dirname, './public'))); //전역 라우터 설정. path모듈 가져와서 거기에 이름 붙여서 경로만드는 것. 이렇게 등록을 해야만 접근이 가능하다
app.use('/storage', express.static(path.join(__dirname, './uploads')));
///member로 요청들어오면 응답보낼 수 있게 router연결?
app.use('/member', memberRouter);
app.use('/sql', sqlRouter); // /sql로 요청들어오면 sqlRouter로 보내!
app.use('/sql2', sqlRouter2); // /sql로 요청들어오면 sqlRouter로 보내!
