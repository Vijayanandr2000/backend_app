const axios = require('axios');
const config = require('../config');

const token = config.TOKEN

exports.validateUserId = async (req, res, next) => {
    try {
        let userId = req.params.id;

        let url = `${config.DOMAIN_URL}/contacts/${userId}`;

        let user = await axios({
            method: 'get',
            url,
            headers:{
                Authorization: 'Bearer ' + token
            }
        }).catch((err) => {
            return res.status(403).send({
                messae: "Invalid User"
            })
        })

        req.user = user
        next()
    } catch (error) {
        return res.status(500).send({
            messae: "internal error"
        })
    }
}