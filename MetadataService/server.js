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
    app: 'STOCK_METADATA',
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

app.get('/imagelist/product/:productId', (req, res) => {
  const {productId} = req.params;
  stockDb.collection('product_pictures').find({productId}).toArray((err, productPictures) => {
    res.send(productPictures.map(pp => pp.filename));
  });
});

app.get('/images/product/:productId/:pictureId', (req, res) => {
  const {productId, pictureId} = req.params;
  const pictureIdDb = {_id: new ObjectId(pictureId)};
  stockDb.collection('product_pictures').findOne(pictureIdDb, (err, productPicture) => {
    if (productPicture) {
      res.sendFile(__dirname + '/uploads/' + productPicture.filename);
    } else {
      res.status(400).send(null);
    }
  });
});

app.get('/images/product/:productId', (req, res) => {
  const {productId} = req.params;
  stockDb.collection('product_pictures').find({productId}).toArray((err, productPictures) => {
    res.sendFile(__dirname + '/uploads/' + productPictures[0].filename);
  });
});

app.post('/images/product/:productId', upload.single('image'), (req, res) => {
  const {productId} = req.params;
  stockDb.collection('product_pictures').insert({productId, filename: req.file.filename}, (err, result) => {
    return res.send(null);
  });
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
