import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';
import { useSelector, useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js'

const AdvertisementWrap = styled.div`
    display: flex;
    justify-content: center;

    #advertisement {
        display: flex;

        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 90vw;
        height: 160vw;
        background-color: aqua;
        border: solid;
    }
    .qrcode {
        
        width: 20vw;
        height: 20vw;
    }
`

export default function Advertisement(){
    //const secretKey = process.env.REACT_APP_SECRETKEY
    const secretKey = 'a34g93u4jd023h235gbifiue8'
    const adData = useSelector((state) => state.resource.advertisements[0])

    const encrypt = (value) => {
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey);
        let result = encrypted.toString()

        return encodeURIComponent(result)
    }

    const [url, serUrl] = useState('https://google.com')
    const [qrcode, setQrcode] = useState('')

    const time = new Date();

    // const {id, category, transmissionDate, startTime, endTime, limitPerDay} = useSelector((state) => state.resource.advertisements[0]);
    
    // console.log(advertisements)
    
    // const currentAdUrl = `http://localhost:3000/${id}/${category}/${transmissionDate}/${startTime}/${endTime}/${limitPerDay}/${time}`
    const currentAdUrl = `http://localhost:3000/${encrypt(adData)}`

    const generateQRCode = () => {
        console.log()
        console.log(`현재 QR코드 주소는 ${currentAdUrl} 입니다.`)
        QRCode.toDataURL(currentAdUrl, (err, url) => {
            if(err){
                return console.log(err)
            }
            
            setQrcode(url)
        })
    }

    useEffect(() => {
        generateQRCode()
    }, []);


    return(
        <AdvertisementWrap>
            <div id='advertisement'>
                <div>
                    광고
                </div>
                <img className='qrcode' src={qrcode}/>
            </div>
        </AdvertisementWrap>
    )
}