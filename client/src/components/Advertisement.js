import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';
import { useSelector, useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js'
import {setAllAds, setCurrentAd} from "../redux/Resource"
import axios from 'axios';




export default function Advertisement(){

    const [qrcode, setQrcode] = useState('')
    const [ad, setAd] = useState('')


    const encrypt = (value) => {
        const secretKey = 'a34g93u4jd023h235gbifiue8'
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey);
        const result = encrypted.toString()

        return encodeURIComponent(result)
    }

    const buildQRCode = (ad) => {
        const adUrl = `http://localhost:3000/${encrypt(ad)}`
        console.log(`현재 QR코드 주소는 ${adUrl} 입니다.`)

        QRCode.toDataURL(adUrl, (err, url) => {
            if(err){
                return console.log(err)
            }
            setQrcode(url)
        })
    }

    const moveNext = (allAds, index) => {
        console.log(`${index}번째 광고입니다.`)
        if(allAds.length <= index){
            console.log('out')
            return
        } else {
            setTimeout(() => {
                setAd(allAds[index])
                buildQRCode(allAds[index])
                moveNext(allAds, index + 1)
            }, 2000);
        }
        
    }

    const transmitAd = ( allAds ) => {
        // setTimeout(() => {
        //     console.log("2초 후에 실행됨")
        //     setAd(allAds[1])
        //     buildQRCode(allAds[1])
        // }, 2000);
        const adToBeTransmit = allAds[0]

        setAd(adToBeTransmit)
        buildQRCode(adToBeTransmit)
        moveNext(allAds, 1)
    }

    const buildComponent = async () => {
        const response = await axios.get(`http://localhost:4000/ad`)
        const allAds = await response.data

        transmitAd(allAds)
    }

    useEffect(() => {
        buildComponent()
    }, []);
    
    return(
        <AdvertisementWrap>
            <div id='advertisement'>
                <div>
                    {ad.id}
                </div>
                <img className='qrcode' src={qrcode}/>
            </div>
        </AdvertisementWrap>
    )
}

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
