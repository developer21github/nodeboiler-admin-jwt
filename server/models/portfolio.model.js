import promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * recent portfolio Schema
 */

const PortfolioSchema =new mongoose.Schema({

  title:{
    type:String,
    required:true
  },
  discription:{
    type:String,
    required:true
  },
  file:{
    type:String
  },
  /*imagePath:{
    type:String,
    required:true
  },
  imageName:{
    type:String,
    required:true
  },
  */
  isShow:{
    type:Boolean,
    default: false
  },
  link:{
    type:String,
    required:true
  }

});


/**
 * @typedef User
 */
export default mongoose.model('Portfolio', PortfolioSchema);
