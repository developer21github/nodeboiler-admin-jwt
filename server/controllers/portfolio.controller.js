import Portfolio from '../models/portfolio.model';
import httpStatus from 'http-status';
import fs from 'fs';
var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
  }
});

var upload = multer({ //multer settings
  storage: storage
}).single('file');

/**
 *   Get recent portfolio list
 */
function list(req, res, next) {
  Portfolio.find()
    .then((oPortfolio)=> {
      if (oPortfolio) {
        return res.status(httpStatus.OK).send({message: 'Get portfolio list', data: oPortfolio});
      }
    })
    .catch(e=>next(e));
}

/**
 * Get recent portfolio list by Id
 */
function getById(req, res) {
  Portfolio.findOne({_id: req.params.id})
    .then((oPortfolio)=> {
      if (oPortfolio) {
        return res.status(httpStatus.OK).send({message: "Get portfolio list", data: oPortfolio});
      } else {
        return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accrued while get testimonial information"});
      }
    })
    .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
}

/**
 * Create new portfolio
 */
function create(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({error_code: 1, err_desc: err});
      return;
    } else {
      const portfolio = new Portfolio({
        title: req.body.title,
        discription: req.body.discription,
        link:req.body.link,
        file: 'http://localhost:4040/' + req.file.path
      });
      return portfolio.save(req.body)
        .then((savedPortfolio)=> {
          if (savedPortfolio) {
            return res.status(httpStatus.OK).send({message: "Portfolio has been added successfully."})
          } else {
            return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accrued while added testimonial."});
          }
        })
        .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
    }
  })
}

/**
 * Update portfolio
 */
function update(req, res) {
  return Portfolio.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((updatePortfolio)=> {
      if (updatePortfolio) {
        return res.status(httpStatus.OK).send({message: "Portfolio has been updated successfully"});
      } else {
        return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accrued while update portfolio"});
      }
    })
    .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
}

/**
 * Delete recent portfolio.
 */
function remove(req, res) {
  Portfolio.findOneAndRemove({_id: req.params.id})
    .then((oPortfolio)=> {
      return res.status(httpStatus.OK).send({message: "Portfolio has been deleted successfully"})
    })
}

export default {create, list, getById, remove, update};
