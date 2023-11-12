const express = require('express');
const session = require('express-session');

var app = express();
const db_config = require('config/db_config.json');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
const CheckUser = (user_name, password) =>{
    const mysql      = require('mysql');
    const connection = mysql.createConnection({
      host     : db_config.host,
      user     : db_config.user,
      password : process.env.SESSION_SECRET,
      database : db_config.database
    });
    
    connection.connect();
    
    connection.query('SELECT * from Users', function(err, rows, fields) {
      if (err) throw err;
    
      console.log(rows);
    });

    
    connection.end();
}
app.get('/',(req,res)=>{
    res.send('hi');
    const session = req.session;
    console.log(session);
    console.log('session.secret');
    test(session.secret);
});
app.listen(3000,(err)=>{
    if(err)
        console.log('err');
    else
        console.log(process.env.SESSION_SECRET);
} );