const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
const multer  = require('multer');
const fileSystem = require('fs');

const app = express();

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

const upload = multer({ dest: 'uploads/' })

app.get('/upload', (req, res) => {
  res.sendFile(__dirname + '/uploads/2f016c0c80f962f5505c5f67b08a4e23');
});

app.post('/upload', upload.single('pic'), (req, res, next) => {
  console.log(req.file);
  console.log(req.body.productId);
  res.send(null);
});

const port = 8085;
app.listen(port, () => {
  client.start(error => console.log("connected to eureka ", error));
  console.log("Listening on port", port);
});
