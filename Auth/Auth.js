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

exports.update = async (req, res, next) => {
    const {role, id} = req.body
    if (role && id) {
        if (role === "admin") {
            await User.findById(id)
                .then((user) => {
                    if (user.role !== "admin") {
                        user.role = role
                        user.save((err) => {
                            if (err) {
                                res.status(400).json({
                                    message: "An error occurred",
                                    error: err.message
                                })
                                process.exit(1)
                            }
                            res.status(201).json({
                                message: "update successful",
                                user
                            })
                        })
                    } else {
                        res.status(400).json({
                            message: "User is already an Admin"
                        })
                    }
                })
                .catch((error) => {
                    res.status(400).json({
                        message: "an error happened",
                        error: error.message
                    })
                })
        } else {
            res.status(400).json({
                message: "Role is not admin",
            })
        }
    } else {
        res.status(400).json({
            message: "Role or ID is missing"
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    const {id} = req.body
    await User.findById(id)
        .then(user => user.remove())
        .then(user => {
            res.status(201).json({
                message: "User successfully deleted", user
            })
        })
        .catch(error => {
            res.status(400).json({
                message: "an error occurred",
                error: error.message
            })
        })
}