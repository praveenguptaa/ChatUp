const User = require('../model/userModel');
const bcrypt = require('bcrypt');


module.exports.register = async (req, res, next) => {
    try {
        
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        if(usernameCheck)
            return res.json({msg: "Username already used", status: false});
        const emailCheck = await User.findOne({email});
        if(emailCheck)
            return res.json({msg: "Email already used", status: false});
        const hashedpassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedpassword,
        });
        delete user.password;
        return res.json({status: true, user})
    } catch (error) {
        next(error); 
    }
    
};


module.exports.login = async (req, res, next) => {
    try {
        
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user)
            return res.json({msg: "Incorrect Username or Password", status: false});
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.json({ status: false, msg:"Incorrect Username or Password"});
        }
        delete user.password;
        return res.json({status: true, user})
    } catch (error) {
        next(error); 
    }
    
};

module.exports.firebaseLogin = async (req,res,next) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if(user){
            delete user.password;
            return res.json({status: true, user });
        }else {
            return res.json({
                status: false,
                msg: "Email not found in database, Welcome new user.",
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        console.log(req.body);
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet: true,
            avatarImage,
        },
        { new: true }
    );
        console.log(userData);
        return res.json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage,
        });
    } catch (error) {
        next(error); 
    }
    
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id: { $ne: req.params.id}}).select([
            "_id",
            "email",
            "username",
            "avatarImage",
            
        ])
        return res.json(users);
    } catch (error) {
        next(error);
    }
}

module.exports.checkUsername = async (req, res, next) => {
    try {
        const {username} = req.body;
        const user = await User.findOne({username});
        if(user){
            return res.json({
                status: false,
                msg: "Username unavailable.",
            })
        } else {
            return res.json({
                status: true,
                msg: "Username available.",
            });
        }
    } catch (error) {
        next(error);
    }
};