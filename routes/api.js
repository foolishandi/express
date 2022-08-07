var express = require('express');
const userController = require('../controllers/userController-jwt');
var router = express.Router();


// 引入multer
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })

/* GET users listing. */
router.get('/', function (req, res, next) {

  // 读取前端cookie值
  // console.log(req.cookies)
  // 设置前端cookie值
  // res.cookie('neme','33')
  res.send('respond with a resource');
});
/**
 * 
 * @api {post} /api/users 添加用户
 * @apiName addUser
 * @apiGroup usersGroup
 * @apiVersion  1.0.0
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * 
 * @apiSuccess (200)   {Number} ok 成功字段:
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username : 'qq',
 *     password : '1213',
 *     age : 12,
 *     avatar :file对象
 * }
 * @apiSuccessExample {json} Success-Response:
 * {
 *     ok:1
 * }
 *
 */
router.post('/users', userController.addUser)
/**
 * 
 * @api {put} /users/:id 更新用户
 * @apiName putUser
 * @apiGroup usersGroup
 * @apiVersion  1.0.0
 * @apiParam  {String} username 用户名
 * @apiParam  {String} password 密码
 * @apiParam  {Number} age 年龄
 * @apiParam  {File} avatar 头像
 * @apiParam  {String} :id 目标_id
 * 
 * @apiSuccess (200)   {Number} ok 成功字段:
 * 
 * @apiParamExample  {multipart/form-data} Request-Example:
 * {
 *     username : 'qq',
 *     password : '1213',
 *     age : 12,
 *     avatar :file对象
 * }
 * :id : dakfdajfjkadadakdhadjafhdjaf
 * 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     ok:1
 * }
 *
 */
router.put('/users/:id', userController.putUser)
router.delete('/users/:id', userController.delUser)
router.get('/users/list', userController.getUser)

router.post('/login', userController.login)
router.get('/logout',userController.logout)
// single单个文件,array多个文件
router.post('/upload', upload.single('avatar'),userController.upload)


module.exports = router;