const jwt = require('jsonwebtoken')
const User = require('../schema/User')
const Role = require('./role')

const auth = async function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied: No Token Provided!');
    const data = jwt.verify(token, process.env.JWT_KEY);
    try {
        const user = User.findOne({ _id: data._id, role: data.role, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }

        if(Role[data.role].find(function(url){ return url==req.baseUrl})){
            req.user = user;
            req.token = token;
            next();
        }
        else
        return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }

}
module.exports = auth