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
    const [adUrl, setAdUrl] = useState('')



    const encrypt = (value) => {
        const secretKey = 'a34g93u4jd023h235gbifiue8'
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey);
        const result = encrypted.toString()

        return encodeURIComponent(result)
    }

    const buildQRCode = (ad) => {
        const adUrl = `http://localhost:3000/${encrypt(ad)}`
        console.log(`현재 QR코드 주소는 ${adUrl} 입니다.`)
        setAdUrl(adUrl)
        QRCode.toDataURL(adUrl, (err, url) => {
            if(err){
                return console.log(err)
            }
            setQrcode(url)
        })
    }

    
    // * 광고를 송출하는 함수입니다.
    const transmitAd = ( allAds ) => {
        let now = new Date
        let year = now.getFullYear()
        let month = ('0' + (now.getMonth() + 1)).slice(-2);
        let day = ('0' + now.getDate()).slice(-2);
        let dateString = `${year}-${month}-${day}`
        // 현재 날짜를 구합니다.

        let hours = ('0' + now.getHours()).slice(-2); 
        let minutes = ('0' + now.getMinutes()).slice(-2);
        let seconds = ('0' + now.getSeconds()).slice(-2); 
        let timeString = hours + ':' + minutes  + ':' + seconds;
        // 현재 시간을 구합니다.

        

        
        console.log(timeString)
        

        const adToBeTransmit = allAds[0]
        setAd(adToBeTransmit)
        buildQRCode(adToBeTransmit)
    }


    // * 광고 컴포넌트를 구축하는 함수입니다. 
    const buildComponent = async () => {
        const response = await axios.get(`http://localhost:4000/ad`)
        const allAds = await response.data
        // 광고 데이터 객체로 이루어진 배열형태의 데이터를 가져옵니다.
        await transmitAd(allAds) 
        // setInterval에서 설정한 시간동안 공백이 생기므로 먼저 transmitAd를 실행합니다.
        const transmission = await setInterval(transmitAd, 30000,allAds)
        // 30초 마다 transmitAd를 실행시킵니다.
    }
    

    useEffect(() => {
        buildComponent()
    }, []);
    
    return (
        <AdvertisementWrap>
            <div id='advertisement'>
                <div>
                    현재 광고 ID:{ad.id}
                </div>
                <img className='qrcode' src={qrcode} />
                <button className='scan-button' onClick={() => window.open(adUrl, '_blank')}>현재 QR코드 스캔 페이지 열기 버튼</button>
            </div>
        </AdvertisementWrap>
    )
}

// 스타일컴포넌트를 사용합니다.
const AdvertisementWrap = styled.div`
    display: flex;
    justify-content: center;

    #advertisement {
        display: flex;

        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 50vh;
        height: 100vh;
        background-color: aqua;
        border: solid;
    }
    .qrcode {
        width: 15vh;
        height: 15vh;
    }
    .scan-button {
    }
`
