const express = require('express'); //라우터 만들면 들어가는 필수 세 줄
const router = express.Router(); //라우터 만들면 들어가는 필수 세 줄
const { pool } = require('../modules/mysql-conn');


router.get('/create', (req, res, next) => {
	const pug = {title:"도서 등록", scriptFile:""};
	res.render('./book/create2.pug', pug);
});

router.post('/save', async (req, res, next) => { //내가 실행하는 함수에 어싱크를 씌워야 그 안에서 await을 쓸 수 있다고?	
	const connect = await pool.getConnection(); //이 함수의 값을 connect에 저장하는 것! 콜백함수를 없앤 것

	//첫번째 쿼리
	const {title, content, isbn, writer, wdate, price} = req.body; // 객체 안에 req.body 내용을 쫙 펼쳐서 받는다 (비구조화할당)
	const sql = `INSERT INTO books SET title=?, content=?, isbn=?,	writer=?, wdate=?, price=?`;
	const values = [title, content, isbn, writer, wdate, price]; //위에서 객체로 받은 데이터를 배열에 넣었음
	const result = await connect.query(sql, values); 

	if(result[0].serverStatus == 2) { //mysql2의 프로미스는 다 배열로 정보가 온다
		//두번째 쿼리
		const sql2 = `SELECT * FROM books ORDER BY ID DESC`;
		const result2 = await connect.query(sql2);
		res.redirect('/sql2/list'); //result2의 배열의 첫번째에 뎅터가 들어오고 두번재는 필드 정보가 들어온다. 그래서 0번 인덱스만 부른 것임
	}
	else {
		res.json({err: "데이터 저장에 실패하였습니다."})
	}
	connect.release(); 
});


//async, await
router.get('/list', async (req, res, next) => { //내가 실행하는 함수에 어싱크를 씌워야 그 안에서 await을 쓸 수 있다고?
	//콜백 버전
	/* pool.getConnection(function(r) {
		r.query('SELECT * FROM books', function(r) {
			블라블라
		});
	}); */

	//어싱크 어웨이트 버전
	const connect = await pool.getConnection(); //getConnection => 풀에 있는 10개 중 접속 객체 하나를 빌려오는 것 (원래 콜백임)
	//list로 요청들어오면 pool로부터 커넥션 객체 기다려서 받아오고 그럼 connection 완료
	const result = await connect.query('SELECT * FROM books ORDER BY id DESC'); //쿼리를 던져서 결과를 변수로 받음. 원래는 books 뒤에 ,찍고 function으로 함
	connect.release(); //풀에 커넥션 객체를 돌려준다
	res.render('./book/list.pug', {title: "도서목록", scriptFile:"", lists:result[0]}); //pug를 html로 보내줌 / 전달할 변수를 객체로 보내줘 {} 총 세개의 변수를 list.pug로 전달한다
});


module.exports = router; //라우터 만들면 들어가는 필수 세 줄

