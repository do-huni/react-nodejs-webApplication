const express = require("express");
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const crypto = require('crypto');
const methodOverride = require('method-override')
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient
const mongoUrl = process.env.DB_URL;
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');
app.use("/public", express.static('public'));
app.use(session({secret: '비밀코드', resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
MongoClient.connect(mongoUrl, (error, client) =>{
	if(error) return console.log(error);
	db = client.db('todoapp');
	const port = process.env.PORT
	app.listen(port, function(){
		console.log("listening on " + port);
	});
});

passport.use(new LocalStrategy({
  usernameField: 'id',
  passwordField: 'pw',
  session: true,
  passReqToCallback: false,
}, function (입력한아이디, 입력한비번, done) {
  db.collection('login').findOne({ id: 입력한아이디 }, function (에러, 결과) {
    if (에러) return done(에러)
    if (!결과) return done(null, false, { message: '존재하지않는 아이디요' }) //done(서버 에러, 성공시 사용자DB데이터(실패면 false를 넣기), 에러메세지)
	const hashPw = crypto.createHash('sha512').update(입력한비번).digest('base64');		 
    if (hashPw == 결과.pw) {
      return done(null, 결과)
    } else {
      return done(null, false, { message: '비번틀렸어요' })
    }
  })
}));

passport.serializeUser(function (user, done) { //이 유저의 정보를 암호문으로 만들어서 저장. user == 위의 done함수 2번째 파라미터
  done(null, user.id) 
});

passport.deserializeUser(function (아이디, done) { //세션 있는 지 찾을 때 실행하는 함수
  db.collection('login').findOne({id: 아이디}, function(err, result){
  	done(null, {result});
  });
}); 
	

app.get('/', (req, res) => { 
  res.render('index.ejs');
});
app.get("/write", (req, res) => {
	res.render('write.ejs')
});


app.get("/list", (req, res) =>{
	const queryVal = req.query.value;	;
	if(!queryVal){
		db.collection('post').find().toArray(function(err1, result1){
			res.render('list.ejs', {posts: result1});		
		});			
	} else{
		const searchCondition = [
			{
				$search: {
					index: 'titleSearch',
					text: {
						query: queryVal,
						path: 'title'
					}
				}
				
			},
			// {$sort: {_id : 1}}, 
			// {$limit: 10}
			// {$project : {title: 1, _id: 0, score: { $meta : "searchScore" }}}
		];
		db.collection('post').aggregate(searchCondition).toArray(function(err1,result1){
			res.render('list.ejs', {posts: result1});
		})
	}
	
});

app.get("/detail/:id", (req, res)=>{
	const queryId = parseInt(req.params.id);
	db.collection('post').findOne({_id: queryId}, function(err1, result1){
		res.render("detail.ejs", {data: result1})		
	});
});

app.delete("/delete/:id", (req, res)=>{	
	const queryId = parseInt(req.params.id);
	let author = "익명";
	if(req.user){
		author = req.user.result.id;
	}
	db.collection("post").deleteOne({_id: queryId, author: author}, function(err1, result1){
		if(result1.deletedCount == 1){
			res.status(200).send({ message: "req success"});			
		} else{
			res.status(401).send({ message: "unauthorized"});
		}
	});
});

app.get("/edit/:id", (req, res) =>{
	const queryId = parseInt(req.params.id);
	let author = "익명";
	if(req.user){
		author = req.user.result.id;
	}
	db.collection("post").findOne({_id: queryId, author: author}, function(err1, result1){
		if(result1){
			res.render("edit.ejs", {data: result1});			
		} else{
			res.redirect("/list")
		}
	})
});

app.put("/edit", (req, res) =>{
	let data = req.body;
	db.collection("post").updateOne({_id: parseInt(data._id)}, { $set: { title: data.title, date: data.date, content: data.content} }, (err1, result1) => {
		res.redirect("/list");
	})	
});
app.get("/signup", (req, res) =>{
	res.render("signup.ejs");
})

app.post("/signup", (req, res) =>{
	const id = req.body.id;
	const pw = req.body.pw;
	const hashPw = crypto.createHash('sha512').update(pw).digest('base64');	
	db.collection("login").insertOne({id: id, pw: hashPw},(err, result)=>{
		res.status(200).send({ message: "req success"});
	});
});
app.get('/mypage', ifLogin, (req, res) =>{
	res.render("mypage.ejs", req.user);
})

function ifLogin(req, res, next){
	if(req.user){
		next();
	} else{
		res.send("로그인 안하셨음");
	}
}

app.get('/login', (req,res) =>{
	res.render("login.ejs");
})
app.post('/login', passport.authenticate('local', {
	failureRedirect: '/fail'
}),(req, res) =>{
	res.redirect("/mypage");
})


app.post("/add", (req, res) =>{
	
	function dateFormat(date) {
		let dateFormat2 = date.getFullYear() +
			'-' + ( (date.getMonth()+1) < 9 ? "0" + (date.getMonth()+1) : (date.getMonth()+1) )+
			'-' + ( (date.getDate()) < 9 ? "0" + (date.getDate()) : (date.getDate()) );
		return dateFormat2;
	}		
	
	const post = req.body;
	const date = dateFormat(new Date);
	console.log(req.user);
	let userid;
	if(req.user){
		userid = req.user.result.id;
	} else{
		userid = "익명";
	}

	db.collection("counter").findOne({name: 'postCounter'}, function(err1, result1){
		let totalPost = result1.totalPost + 1;
		const sendingObj = {title: post.title, date: date, content: post.content, _id: totalPost, author: userid};		
		db.collection("post").insertOne(sendingObj, function(err2, result2){
			db.collection("counter").updateOne({name: "postCounter"}, {$inc: {totalPost:1}}, function(err3, result3){				
				res.redirect("/list");							
			});
		});		
	})
});	
