import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import Admin from '../models/admin.model';

const config = require('../../config/env');

function loginAuth(req,res) {

     Admin.findOne({email:req.body.username,password:req.body.password})
      .then((oAdmin)=>{
        if(oAdmin) {
          const token = jwt.sign({
            username: req.body.username
          }, config.jwtSecret);
          return res.status(httpStatus.OK).send({message: "Login successfully", token, data: oAdmin});
        }
         return res.status(httpStatus.BAD_REQUEST).send({message:"Login failed"})
        })
      .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message:err}));
}

export default {loginAuth}
