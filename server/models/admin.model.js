import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 *  Admin user Schema
 */

const AdminSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});


/**
 * @typedef Admin
 */

export default mongoose.model('Admin', AdminSchema);
