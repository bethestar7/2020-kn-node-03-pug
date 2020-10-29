const express = require('express');
const router = express.Router(); //익스프레스가 가진 객체 인스턴스 가져옴

//mysql
const mysql = require('mysql');
const connection = mysql.createConnection({ //db에 접근하기 (mysql의 createConnection메서드를 통해서)
	host: process.env.DB_HOST, 
  user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS, 
});

router.get('/create', (req, res, next) => {
	const pug = {title:"도서 등록", scriptFile:""};
	res.render('./book/create.pug', pug) //view 폴더 안의 book 안의 create.pug  / 퍼그파일에 전달할 변수 pug 내용도 같이 보내줘 /render는 pug를 html로 해석해서 내보내라는 뜻. 고로 render에는 반드시 pug 파일이 와야 한다
});

/*
router.post('/save', (req, res, next) => { //create.pug에서 내용 저장하면 post방식으로 값이 /save로 온다.
	const {title, content, isbn, writer, wdate, price} = req.body; // 객체 안에 req.body 내용을 쫙 펼쳐서 받는다 (비구조화할당)
	const sql = `
	INSERT INTO books SET
	title='${title}',
	content='${content}',
	isbn='${isbn}',	
	writer='${writer}',
	wdate='${wdate}',
	price='${price}'
	`;
	connection.connect(); 
	connection.query(sql, (err, result, field) => { //쿼리의 결과가 오면 그 때 response 해준다
		res.json(result); //데이터를 json형태로 내려보내는 것  / send()는 데이터를 그대로 보내라 / sendFile()은 파일을 보내라
	});
	connection.end(); 
}); */

router.post('/save', (req, res, next) => {
	const {title, content, isbn, writer, wdate, price} = req.body; // 객체 안에 req.body 내용을 쫙 펼쳐서 받는다 (비구조화할당)
	const sql = `INSERT INTO books SET title=?, content=?, isbn=?,	writer=?, wdate=?, price=?`;
	const values = [title, content, isbn, writer, wdate, price]; //위에서 객체로 받은 데이터를 배열에 넣었음
	connection.connect(); //접속해서
	connection.query(sql, values, (err, result, field) => { //쿼리던지고
		//res.json(result); //콜백함수를 통해 리절트 받고
		if(result.serverStatus === 2){
			const sql2 = `SELECT * FROM books ORDER BY id DESC`;
			connection.query(sql2, (err, result) => { //field 인자는 보통 안쓴다고 함. 데이터베이스 필드 정보라고 함
				res.json(result); //json이니까 배열로 옴
				connection.end(); //성공해도 콜백함수로 끝내고  /  콜백지옥... 이를 보완하는 것 > promise ,async, awake?
			});
		}
		else connection.end();  //실패해도 콜백함수로 끝내고
	});	
});


module.exports = router; //router를 내보내야 app.js에서 얘를 불러와서 쓸 수 있다