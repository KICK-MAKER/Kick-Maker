const express = require("express");
const router = express.Router();
const path = require("path");
const req = require('http');
const res = require('express');
const controller = require('../controllers/controller');
//url이 빈 상태로 넘어올 경우
router.get('/',controller.mainview);

//url이 http://localhost:3000/test 인 경우
router.get('/test', (req, res) => {
    res.send('test about');
});

// 로그인 핸들러
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register')
    })

// 회원가입
router.post('/register',(req,res)=>{
})
router.post('/login',(req,res,next)=>{
  })

// 로그아웃
router.get('/logout',(req,res)=>{
 })

module.exports = router;