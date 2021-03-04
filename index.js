const request = require('request');
const express = require("express");


const ejs = require('ejs')

const app = express();

app.set('view engine','ejs');
app.use(express.static('public'))

function getJson( req, res) {
  var headers, options;

  headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  
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

app.listen(3000,() =>{
  console.log('server run!')
})

