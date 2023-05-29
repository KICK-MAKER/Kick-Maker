const { response } = require("express");
const mysql = require("../config/mysql");

module.exports = {

    //Match 전체 조회
    getAllMatch : function (callback) {
        const querystring = `Select * from Match;`;
        mysql.query(querystring, function (error, result) {
            if ( error ) throw error;
            callback(result);
        })
    },

    //match_id로 경기번호 조회
    getmatch_id: function (match_id, callback) {
        const querystring = `SELECT * FROM Matches Where match_id= ${match_id} limit 1;`;
        mysql.query(querystring, function (error, result) {
            if ( error ) throw error;
            if(result.length) {
                console.log("found Match: ", result[0]);
                callback(result[0]);
            }
            // 결과가 없을 시 
            result({kind: "not_found"}, null);
        })
    },

    //Match 메이킹시에 팀 삽입
    insertMatch: function ( home_userid, match_date, match_place, match_time_start, match_time_end, created, callback ) {
        const querystring = `INSERT INTO Matches ( home_userid, match_date, match_place, match_time_start, match_time_end, created) VALUES ( '${home_userid}', '${match_date}','${match_place}','${match_time_start}','${match_time_end}','${created}');`;
        mysql.query(querystring, (err, rows) => {
            if ( err ) throw err;
        callback(rows.insertId);
        });
    },

    //매치 정보 수정
    updateMatch: function (data, callback) {
        var querystring = `UPDATE Matches SET match_time='${data.match_time}', match_place='${data.match_place}', updated='${data.updated}', WHERE match_id=${data.match_id}`;
        mysql.query(querystring, (err, rows) => {
            if ( err ) throw err;
            console.log( rows );

            callback(rows);
        })
    },

    //매치 정보 삭제
    DeleteMatch: function (id, callback) {
        mysql.query(`DELETE FROM Matches WHERE match_id=${id}`, (err, rows) => {
            if ( err ) throw err;
            console.log( rows );

            callback(rows);
        })
    },



    }
