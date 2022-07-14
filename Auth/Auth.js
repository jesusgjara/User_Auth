const User = require('../model/User')

exports.register = async (req, res, next) => {
    const {username, password} = req.body
    if (password.length < 6) {
        return res.status(400).json({message: "password less than 6 characters"})
    }
    try {
        await User.create({
            username,
            password,
        }).then(user => res.status(200).json({message: "User successfully created", user})
        ) 
    } catch(err) {
        res.status(401).json({
            message: "User creation not successfull",
            error: error.message,
        })
    }
}

exports.login = async (req, res, next) => {
    const{username, password} = req.body
    if(!username || !password) {
        return res.status(400).json({
            message:"Username or password is empty",
        })
    }
    try {
    const user = await User.findOne({username, password})
    if(!user) {
        res.status(401).json({
            message: "Login unsuccessful",
            error: "user not found",
        })
    } else {
        res.status(200).json({
            message: "login successful",
            user,
        })
    }
    } catch {
        res.status(400).json({
            message: "An error happened, I dunno",
            error: error.message,
        })
    }
}
