const userModule = require('../module/userModel');
const userService = {
  addUser: (username, password, age) => {
    return userModule.create({
      username,
      password,
      age
    })
  },
  putUser: (_id, username, password, age) => {
    return userModule.updateOne({
      _id: _id
    }, {
      username,
      password,
      age
    })
  },
  delUser: (_id) => {
    return userModule.deleteOne({
      _id: _id
    })
  },
  getUser: (page, limit) => {
    return userModule.find({}, {
      "username": 1,
      "age": 1,
      "avatar":1
    }).sort({
      "age": 1
    }).skip((page - 1) * limit).limit(limit)
  },
  loginUser: (username, password) => {
    return userModule.find({
      'username': username,
      'password': password
    })
  },
  upload: (username, password, age,avatar) => {
    return userModule.create({
      username,
      password,
      age,
      avatar
    })
  },
}
module.exports = userService;