import Testimonial from '../models/testimonial.model';
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
 * Get testimonial list.
 * @property {number} req.query.skip - Number of testimonial to be skipped.
 * @property {number} req.query.limit - Limit number of testimonial to be returned.
 * @returns {testimonial[]}
 */
function list(req, res, next) {
  const {limit = 50, skip = 0} = req.query;
  Testimonial.list({limit, skip})
    .then((oTestimonial)=> {
      if (oTestimonial) {
        return res.send(oTestimonial);
      }
    })
    .catch(e => next(e));
}

/**
 * Get testimonial by Id.
 * @returns {testimonial[]}
 */
function getById(req, res) {
  Testimonial.findOne({_id: req.params.id})
    .then((oTestimonial)=> {
      if (oTestimonial) {
        return res.status(httpStatus.OK).send({message: "Get testimonial information", data: oTestimonial});
      }
      return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accuard while grt testimonial information"});
    })
    .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
}

/**
 * Create new testimonial
 * @returns {Testimonial}
 */
function create(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.json({error_code: 1, err_desc: err});
      return;
    } else {
      const testimonial = new Testimonial({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        testimonial: req.body.testimonial,
        file: 'http://localhost:4040/' + req.file.path
      });
      return testimonial.save(req.body)
        .then((savedTestimonial)=> {
          if (savedTestimonial) {
            return res.status(httpStatus.OK).send({message: "Testimonial has been added successfully."});
          }
          return res.status(httpStatus.OK).send({message: "Some error accrued while added testimonial."});
        })
        .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
    }
    //res.json({error_code: 0, err_desc: null});
  })
}

/**
 * Delete testimonial.
 * @returns {Testimonial}
 */
function remove(req, res) {
  Testimonial.findOneAndRemove({_id: req.params.id})
    .then((oTestimonial)=> {
      if (oTestimonial) {
        fs.exists(path.join("uploads/file-1493091308822.jpg"), function (exists) {
          if (exists) {
            console.log('File exists. Deleting now ...');
            fs.unlink(path.join("uploads/file-1493091308822.jpg"));
            return;
          } else {
            console.log('File not found, so not deleting.');
          }
        });
        return res.status(httpStatus.OK).send({message: "Testimonial has been deleted successfully"});
      }
      return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accrued while deleting testimonial"});
    })
    .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
}

/**
 * Update new testimonial
 * @returns {testimonial}
 */
function update(req, res) {
  upload(req, res, function (err) {
    if (err) {
      res.json({error_code: 1, err_desc: err});
      return;
    } else {
      var file1;
      if (req.body.isUpdate === "true")
        file1 = req.body.file;
      else
        file1 = 'http://localhost:4040/' + req.file.path;

      const testimonial = new Testimonial({
        name: req.body.name,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        _id: req.params.id,
        testimonial: req.body.testimonial,
        file: file1
      });
      return Testimonial.findOneAndUpdate({_id: req.params.id}, testimonial)
        .then((oTestimonial)=> {
          if (oTestimonial) {
            return res.status(httpStatus.OK).send({message: "Testimonial has been updated successfully"});
          }
          return res.status(httpStatus.BAD_REQUEST).send({message: "Some error accrued while update testimonial"})
        })
        .catch((err)=>res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: err}));
    }
    //res.json({error_code: 0, err_desc: null});
  })
}

export default {create, list, getById, remove, update};
