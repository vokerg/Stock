const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
const multer  = require('multer');
const fileSystem = require('fs');
const crypto = require('crypto');
const mime = require('mime');
const bodyParser = require('body-parser');

const {ObjectId, MongoClient} = require('mongodb');

const app = express();

let stockDb = null;

const client = new Eureka({
  instance: {
    app: 'metadataservice',
    hostName: 'localhost',
    ipAddr: '127.0.0.1',
    port: {
      '$': 8085,
      '@enabled': 'true',
    },
    vipAddress: 'localhost',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: 8761,
    servicePath: '/eureka/apps/'
  },
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({extended: true}));

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/uploads/2f016c0c80f962f5505c5f67b08a4e23');
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
  console.log(req.file.filename);
  console.log(req.body.productId);
  const {productId} = req.body;
  console.log("productId", productId);
  //const dbProductId = {_id: new ObjectId(productId)};
  if (productId) {
      stockDb.collection('product_pictures').insert({productId, filename: req.file.filename}, (err, result) => {
        console.log(err);
        return res.send(null);
      });
  } else {
    return res.status(400).send("productId is not provided");
  }
  //res.send(null);
});

const port = 8085;
app.listen(port, () => {
  client.start(error => console.log("connected to eureka ", error));
  const db = "mongodb://stockuser:stockpassword@ds151259.mlab.com:51259/stockdb";
  MongoClient.connect(db, (err, database) => {
    console.log("connected to db", err);
    stockDb = database.db('stockdb');
  });
  console.log("Listening on port", port);
});
