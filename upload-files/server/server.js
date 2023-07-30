const express = require("express");
const multer = require('multer');
const cors = require('cors');

var app = express();
app.use(cors()); 

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }

    
  })
  
  const fileFilter = (req, file, callback) => {
    
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/png') {
      callback(null, true);
    } else {
      callback(new Error('Only .jpg and .png files are allowed!'), false);
    }
  };

const upload = multer({ storage: storage,fileFilter })

app.post("/api", upload.array("files"), (req, res) => {
    res.json({ message: "File(s) uploaded successfully" });

});

app.listen(5000, function(){
    console.log("Server running on port 5000");
});