const models = require('../models');

module.exports = {
    ad: {
        get: (req, res) => {
            console.log('광고데이터를 클라이언트로 보냈습니다.')
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
            if (!elevatorID || !adID || !QRCodeScanTime || !userName || !userMail || !agreement) {
                res.sendStatus(400)
            } else {
                console.log('클라이언트로 부터 다음의 데이터를 받았습니다.')
                console.log(req.body)
                res.status(201).json()
            }
        },
    },
};
