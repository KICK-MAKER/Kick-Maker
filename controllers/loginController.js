// 로그인 

const connection = require('../config/mysql');


module.exports.login = function( req , res ){
    const email = req.body.email;
    const password = req.body.password;

    connection.query(' SELECT * FROM users WHERE email = ? ', [email] , function (error, results, fields) {

      if (error) {
          res.json({
            status  : false,
            message : "error"
            })
            
      } else {
        if(results.length > 0){
            if(password == results[0].password){
                res.json({
                    status  : true,
                    message : "로그인 성공!"
                })
            }else{
                res.json({
                  status  : false,
                  message : "다시 로그인해주세요"
                 });
            }
         
        }
        else{
          res.json({
              status  : false,    
              message : "이메일이 존재하지 않습니다"
          });
        }
      }
    });
}