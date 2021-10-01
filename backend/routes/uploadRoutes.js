// this is where we're going to place our route api/uploads and config, validations and other from multer
import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

// config
const storage = multer.diskStorage({
  // we pass in object with 2functions: destination and filename
  destination(req, file, cb) {
    cb(null, 'uploads/') // return null if theres no error, add where you want the file to be uploaded which is uploads folder.
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()) // we are checking the 'filetypes' against the extension of the file name we passed in
  const mimetype = filetypes.test(file.mimetype) // every file has one ie image/jpeg
  // extname variable - gives us a boolean true or false if the set ext and file ext matches or not
  // path.extname - gets the extension of a file

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

// we will pass this in as a middleware to our route
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// create the route or the endpoint
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})
// we place 'image' so when we upload it on the front end we want to remember to call it an 'image'
// req.file.path - it will give us the path then on the front end we can set it to the image piece of our state and it'll go to the DB.
export default router
