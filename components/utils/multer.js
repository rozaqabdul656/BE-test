const multer = require('multer');
const { dirname } = require('path');
const appDir = dirname(require.main.filename);

// Set global directory
       global.__basedir = __dirname;
    //    console.log()
       // Multer Upload Storage
       const storage = multer.diskStorage({

           destination: (req, file, cb) => {
               cb(null, appDir + '/uploads/')
           },
           filename: (req, file, cb) => {
               cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
           }
       });
       // Filter for CSV file
       const csvFilter = (req, file, cb) => {
           if (file.mimetype.includes("csv")) {
               cb(null, true);
           } else {
               cb("Please upload only csv file.", false);
           }
       };
const upload = multer({ storage: storage, fileFilter: csvFilter,limits: { fileSize: 100000 } });



module.exports = upload;