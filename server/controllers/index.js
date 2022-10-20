const models = require('../models');

module.exports = {
  ad: {
    get: (req, res) => {
        res.status(200).json(models.ads);
    },
  },
  user: {
    post: (req, res) => {
      const { 
        elevatorID, 
        adID,
        QRCodeScanTime,
        userName,
        userMail,
        agreement } = req.body;
      if(!elevatorID || !adID || !QRCodeScanTime || !userName || !userMail || !agreement) {
        res.sendStatus(400)
      } else {
        console.log(req.body)
        res.status(201).json()
      }
    },
  },
};
