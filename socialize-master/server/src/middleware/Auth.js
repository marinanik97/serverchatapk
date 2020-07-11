const jwt = require('jsonwebtoken');
const UserModel = require('../db/models/User');

const AuthMiddleware = async (req, res, next) =>{
    try{
        if(req.headers && req.headers.authorization){
            const token = req.headers.authorization;
            const payload = await jwt.verify(token, 'marina');
            UserModel.findOne({email: payload.email}, (err, result) =>{
                if(!result || err){
                    res.status(401).send({error: "Not authenticated"});
                }else{
                    req.user = result;
                    next();
                }
            });
        }else{
            res.status(401).send({error: "Not authenticated"});
        }
    }catch (e) {
        res.status(401).send({error: "Not authenticated"});
    }
}

module.exports = {
    AuthMiddleware
}