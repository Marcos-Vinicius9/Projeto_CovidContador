const request = require('request');
const express = require("express");
const videos = require('./videos');
const email = require('nodemailer');

let transporter = email.createTransport({
  service:'gmail',
  auth:{
    user:'********',
    pass:'********'
  }
})

var mailOptions = {
  from:'*******',
  to:'*********',
  subject:'Mensagem do covid Contador',
  html:''
}


const app = express();

app.set('view engine','ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));

function getJson( req, res) {
  var options;  
  options = {
    url: 'https://covid19-brazil-api.now.sh/api/report/v1/brazil',
    method: 'GET',
  }

  
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      app.get('/',(req,res)=>{
        res.render('index',{casos:body})
      })
      return body;
    } else {
      console.log(error);
    }
  });
}


getJson();



app.get('/contato',(req,res)=>{
  res.render('contato')
});

app.get('/prevencao', (req,res) =>{
  res.render('prevencao',{videos:videos})
})
app.listen(3000,() =>{
  console.log('server run!')
});



app.post('/form',(req,res) =>{
  var nome = req.body.nome;
  var email = req.body.email;
  var mensagem = req.body.mensagem;
  
  mailOptions.html = `De: ${email} <br>nome:${nome}<br>Mensagem:${mensagem}`;

  transporter.sendMail(mailOptions, (error) =>{
    if(error){
      console.log(error);
    }else{
      res.redirect('/');
    }
  });
  
  
});
setInterval(() =>{
  getJson();
},3000);