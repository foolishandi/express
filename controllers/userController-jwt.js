const userService = require('../services/userService.js');
const JWT = require('../utils/jwt.js');

const userController = {
    addUser: async (req, res) => {
        // console.log(req.body)
        // 插入数据库
        var {
            username,
            password,
            age
        } = req.body;
        await userService.addUser(username, password, age)
        res.send({
            ok: 1
        })
    },
    putUser: async (req, res) => {
        // console.log(req.body)
        // 更新数据库
        const _id = req.params.id
        var {
            username,
            password,
            age
        } = req.body;
        await userService.putUser(_id, username, password, age)
        res.send({
            ok: 1
        })
    },
    delUser: async (req, res) => {

        // 删除数据库
        const _id = req.params.id
        await userService.delUser(_id)
        res.send({
            ok: `已删除${_id}`
        })

    },
    getUser: async (req, res) => {
        const {
            page,
            limit
        } = req.query
        const data = await userService.getUser(page, limit)
        res.send(data)
    },
    login: async (req, res) => {
        // console.log(req.body)
        // 插入数据库
        var {
            username,
            password
        } = req.body;
        // console.log(username, password)
        //const data = await userService.loginUser(username, password)
		 const data = [{_id:123,username:'qq'}]
        if (data.length === 0) {
            res.send({
                ok: 0
            })
        } else {
            // 开始设置token,设置在header中
            const token = JWT.generate({
                _id: data[0]._id,
                username: data[0].username
            }, '10s')
            res.header("Authorization", token)
            res.send({
                ok: 1
            })
        }
    },
    logout: (req, res) => {
        req.session.user = null
        res.send({
            ok: 1
        })
    },
    upload: async (req, res) => {
        console.log(req.file)
        // 获取文件信息
        const avatar=req.file?`/images/${req.file.filename}`:'/images/1.png'
        // 插入数据库
        var {
            username,
            password,
            age
        } = req.body;
        await userService.upload(username, password, age,avatar)
        res.send({
            ok: 1
        })
    },

}
module.exports = userController