var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');
var db = 'test';
var con = 'name';
var con1 = 'xr';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
//注册;
router.post('/api/submit', function(req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    Mongo.find(db, con, { 'name': name }, function(result) {
        //判断是否有这个人;
        if (result.length > 0) {
            res.send({ code: 0, msg: '用户名已经存在' })
        } else {
            Mongo.insert(db, con, { 'name': name, 'pwd': pwd }, function(rs) {
                if (!rs) {
                    res.json({ code: 0, msg: '注册失败' })
                } else {
                    res.json({ code: 1, msg: '注册成功' })
                }
            })
        }
    })
});
//登录;
router.post('/api/login', function(req, res, next) {
    var name = req.body.name;
    var pwd = req.body.pwd;
    Mongo.find(db, con, { "name": name, "pwd": pwd }, function(result) {
        if (result.length > 0) {
            res.json({ code: 0, msg: '登录失败' })
        } else {
            res.json({ code: 1, msg: '登陆成功' })
        }
    })
});
//增删改查;
//渲染;
router.post('/api/render', function(req, res, next) {
    Mongo.find(db, con1, function(result) {
        if (!result) {
            res.json({ code: 0, msg: '查找失败' })
        } else {
            res.json({ code: 1, data: result })
        }
    })
});
//删除;
router.post('/api/remove', function(req, res, next) {
    var id = req.body.id;
    Mongo.remove(db, con1, { '_id': id }, function(result) {
        if (result.deleteCount == 0) {
            res.json({ code: 0, msg: '删除失败' })
        } else {
            res.json({ code: 1, msg: '删除成功' })
        }
    })
});
//修改
router.post('/api/update', function(req, res, next) {
    var id = req.body.id;
    var name = req.body.name;
    var pwd = req.body.pwd;
    var sex = req.body.sex;
    var address = req.body.address;
    var status = req.body.status;
    Mongo.update(db, con1, [{ '_id': id }, { 'name': name, 'pwd': pwd, 'sex': sex, 'address': address, 'status': status }], function(result) {
        if (!result) {
            res.json({ code: 0, msg: '更新失败' })
        } else {
            res.json({ code: 1, data: result })
        }
    })
});
//模糊搜索
router.post('/api/search', function(req, res, next) {
    var name = new RegExp(req.body.name);
    Mongo.find(db, con1, { 'name': name }, function(result) {
        if (!result) {
            res.json({ code: 0, msg: '更新失败' })
        } else {
            res.json({ code: 1, data: result })
        }
    })
});
module.exports = router;