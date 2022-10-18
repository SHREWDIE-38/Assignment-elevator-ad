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
        // models.orders.post(userId, orders, totalPrice, (error, result) => {
        //   if(error) {
        //     res.sendStatus(500)
        //   } else {
        //     res.status(201).json(result);
        //   }
        // })
        res.status(201).json()
      }
    },
  },
};
