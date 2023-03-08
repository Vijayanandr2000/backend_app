const axios = require('axios');
const config = require('../config');

const token = config.TOKEN

exports.findUserById = async(req,res) => {
    try {
        let user = req.user;

        res.status(200).send(user.data)
    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.findCustomFieldByName = async(req,res) => {
    try {
        let customfield = req.query.customfield;

        let url = `${config.DOMAIN_URL}/custom-fields`;

        let allCustomFieldResData = await axios({
            method: 'get',
            url,
            headers:{
                Authorization: 'Bearer ' + token
            }
        })

        let allCustomField = allCustomFieldResData.data.customFields
        let customeFieldData = allCustomField.find(data => data.name === customfield)

        if(customeFieldData){
            return res.status(200).send(customeFieldData)
        }
        
        
        let postCustomField = `${config.DOMAIN_URL}/custom-fields/`
        
        let key = String(customfield.toLowerCase()).split(" ").join('_')
        let body = {
            name: customfield,
            fieldKey: `contact.${key}`,
            placeholder: '',
            dataType: 'TEXT',
            position: 50
        }

        let createCustomeField = await axios({
            method: 'post',
            url: postCustomField,
            data: body,
            headers:{
                Authorization: 'Bearer ' + token
            }
        })

        res.status(200).send(createCustomeField.data)

    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

exports.updateCustomFieldForUser = async(req,res) => {
    try {
        let data = req.body
        let userData = req.user;
        let userId = req.params.id;
        
        let user = userData.data.contact

        let customFieldData = {
            [data.id] : data.value,
        }

        let body = {
            ...user,
            customField: customFieldData
        }
        let url = `${config.DOMAIN_URL}/contacts/${userId}`;

        let updateUserCustomeField = await axios({
            method: 'put',
            url,
            data: body,
            headers:{
                Authorization: 'Bearer ' + token
            }
        })

        
        res.status(200).send(updateUserCustomeField.data)

    } catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            errorMessage: error.message
        })
    }
}

