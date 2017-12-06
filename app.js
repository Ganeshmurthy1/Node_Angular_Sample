var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var nodemailer  = require("nodemailer");
var xoauth2 = require('xoauth2');
mongoose.connect("mongodb://localhost:27017/RestApi");
var Schema = mongoose.Schema;
var userSchema = new Schema({
	"userid":Number,
	"name": String,
	"age": Number,
	"design" : String
});

var user = mongoose.model("users",userSchema);
var app = express();
app.use(bodyParser());


app.get('/api/users',function(req,res){
	console.log("reqqqq",req);

user.find({},function(err,obj){
	if(err){
			return res.json({status: "error",msg:"error"})
		}
		return res.json({ status:'Success',data:obj});
})
});
app.post('/api/users',function(req,res){
	var data = req.body;
	user.create(data,function(err,obj){
		if(err){
			return res.json({status: "error",msg:"error"})
		}
		return res.json({ status:'Success',data:obj});

	})
	
})

app.post('/api/users/delete', function(req,res) {
 
        user.deleteOne({ "_id": req.body.id }, function(err, results) {
           
			return res.json({ status:'Success',data:results});
        });
		

});


app.get(/.*?\.\w{2,4}$/,function(req,res){
	console.log("req url",req.url);
	console.log("dir",__dirname);
res.sendFile(__dirname+'/client/'+req.url);
})
app.get("*",function(req,res){
res.sendFile(__dirname+'/client/index.html')
})


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth:{
		xoauth2: xoauth2.createXOAuth2Generator({
			user:'ganeshmurthy.p@gmail.com',
			clientId: '',
            clientSecret: '',
            refreshToken: ''


		})
	}
})
var mailOption = {
	from: 'ganesh<ganeshmurthy.p@gmail.com>',
	to: 'ganeshmurthy1989@gmail.com',
	subject:'node mail test',
	comment:'test to check mail coming'
}

transporter.sendMail(mailOption, function(err,res){
	if(err){
		console.log("error");
	}else{
		console.log('Email sent');
	}
})

app.listen(9000,function(){
	console.log("Listening To Port 9000");
})