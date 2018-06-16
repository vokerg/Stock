const express = require('express');
const Eureka = require('eureka-js-client').Eureka;
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

const port = 8085;
app.listen(port, () => {
  client.start(error => console.log("connected to eureka ", error));
  console.log("Listening carefully on port", port);
});
