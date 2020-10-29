const mysql = require('mysql2/promise'); //callback이 아닌 promise 가 와야되니까 promise.js파일이 필요함
const pool = mysql.createPool({ //pool은 동접자 처리 가능  / 접속 정보 생성?
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASS, 
  waitForConnections: true, //10개 커넥션이 다 사용 중이면 기다리겠다는 것. 동접자가 커넥션객체를 돌려줄때까지.
  connectionLimit: 10, //풀에 들어갈 커넥션 개수
  queueLimit: 0 //큐에 대한 한계. 써도되고 안써도 된다고 함
});

module.exports = { mysql, pool };