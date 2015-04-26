'use strict';

const express = require('express');
const AWS     = require('aws-sdk');

const router = express.Router();
const ec2 = new AWS.EC2({apiVersion: '2014-10-01'});

router.get('/ec2s', function (req, res) {
  ec2.describeInstances(function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

module.exports = router;
