const express = require('express');
const router = express.Router(); //익스프레스가 가진 객체 인스턴스 가져옴

//mysql
const mysql = require('mysql');
const connection = mysql.createConnection({ //db에 접근하기 (mysql의 createConnection메서드를 통해서)
	host: '', //127.0.0.1 이라고 쓰거나 localhost라고 쓴다 (지금은)
	user: '',
	port: 3306, //3306은 mysql이 가진 기본 포트. 이럴때 생략 가능. 실제 작업에서는 다른 포트를 쓰므로 써줘야 함
	password: '',
	database: ''
});

router.get('/create', (req, res, next) => {
	const pug = {title:"도서 등록", scriptFile:""};
	res.render('./book/create.pug', pug) //view 폴더 안의 book 안의 create.pug  / 퍼그파일에 전달할 변수 pug 내용도 같이 보내줘 /render는 pug를 html로 해석해서 내보내라는 뜻. 고로 render에는 반드시 pug 파일이 와야 한다
});

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
});


module.exports = router; //router를 내보내야 app.js에서 얘를 불러와서 쓸 수 있다