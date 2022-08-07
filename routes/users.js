var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('get 成功！');
});
router.post('/', function(req, res, next) {
  const {name,age}=req.body
  res.send(`post成功,访问数据:name:${name},age:${age}`);
});
router.put('/', function(req, res, next) {
  const {name,age}=req.query
  // console.log('a',req);
  res.send(`post成功,访问数据:name:${name},age:${age}`);
});
router.delete('/', function(req, res, next) {
  const {id}=req.query
  console.log('a',req);
  res.send(`post成功,访问数据:id:${id}`);
});
module.exports = router;
