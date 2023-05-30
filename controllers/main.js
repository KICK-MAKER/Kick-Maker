const path = require("path");
const model = require("../models/Team");
const match = require("../models/Match");
const notif = require("../models/Notification");

require('dotenv').config();

module.exports = {

    mainview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        if (req.user_id) {
            isLogin = true;
        } else if (!req.user_id) {
            isLogin = false;
        }
        notif.getnotif_userid(req.user_id, function (notifications) {
            console.log(notifications);
            model.getOneTeam(req.user_id, function (loginresult) {
                res.render(path.join(__dirname + '/../views/main.ejs'), {
                    isLogin: isLogin,
                    loginTeam: loginresult,
                    notifications: notifications
                });
            });
        });
    },

    testview : (req, res) => {
        if(req.user_id.length) {
            console.log(req.user_id);
        } else {
            console.log("없당");
        }
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id,function( loginresult ) {
            res.render(path.join(__dirname + '/../views/test.ejs'), {
                title: "testtitle",
                loginTeam: loginresult
            });
            //console.log(result);
        });
    },

    match_listview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            match.getAllMatch(function( result ) {
                res.render(path.join(__dirname + '/../views/match_list.ejs'), {
                    loginTeam: loginresult,
                    Team: result
                });
            });
        });
    },

    match_makingview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        if(req.user_id == null) {
            res.redirect('/signin')
        } else {
            model.getOneTeam(req.user_id, function( loginresult ) {
                res.render(path.join(__dirname + '/../views/match_making.ejs'), {
                    title: "testtitle",
                    loginTeam: loginresult
                });
            });
        }
    },

    noMatchview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            model.getAllTeam(function( result ) {
                res.render(path.join(__dirname + '/../views/noMatch.ejs'), {
                    title: "testtitle",
                    loginTeam:loginresult,
                    Team: result
                });
                //console.log(result);
            });
        });
    },

    matchedview : (req,res) => {

        result = req.findMatches;
        model.getOneTeam(req.user_id, function( loginresult ) {
            res.render(path.join(__dirname + '/../views/matched.ejs'), {
                loginTeam: loginresult,
                findTeams: result
            }); 
        }); 
    },

    completeview : (req,res) => {
        result = req.myMatch;
        console.log(result);
        model.getOneTeam(req.user_id, function( loginresult ) {
            res.render(path.join(__dirname + '/../views/complete.ejs'), {
                loginTeam: loginresult,
                myMatch: result
            }); 
        }); 
    },

    team_infoview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            res.render(path.join(__dirname + '/../views/team_info.ejs'), {
                loginTeam: loginresult
            });
            //console.log(result);
        });
    },

    signinview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            res.render(path.join(__dirname + '/../views/signin.ejs'),{
                loginTeam: loginresult
            });
            //로그인 실패시!!!!
            if(req.query.value == 'fail') {
                console.log("login failed");
            };
        });
    },

    signupview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            model.getAllTeam(function( result ) {
                res.render(path.join(__dirname + '/../views/signup.ejs'), {
                    loginTeam: loginresult,
                    Team: result
                });
                //console.log(result);
            });
        });
    },

    testsview : (req, res) => {
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.getOneTeam(req.user_id, function( loginresult ) {
            res.render(path.join(__dirname + '/../views/test.ejs'), {
                loginTeam: loginresult
            });
            //console.log(result);
        });
    },

    createteam : (req, res) => {
        // const key = process.env;
        // let token = "";
        // token = jwt.sign(
        //     {
        //         type: "JWT",
                
        //     }
        // )
        //상대경로 사용할 것 (팀원들 각자 디렉토리 다르니 절대경로 안돼)
        //index.ejs 렌더링 및 변수 ejs에 넘기기
        model.insertTeamtest(req.body.id,req.body.pass,function( result ) {
            console.log(req.body);
            console.log(result);
            //res.send({id:result});
        });    
        res.redirect('/login_demo')
    },

    tomain : (req, res) => {
        res.cookie('findMatchestoken', null, {
            maxAge: 0,
        });
        res.cookie('myMatchtoken', null, {
            maxAge: 0,
        });
        res.redirect('/')
    },

}