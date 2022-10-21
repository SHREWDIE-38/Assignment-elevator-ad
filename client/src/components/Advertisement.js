import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';
import { useSelector, useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js'
import {setAllAds, setCurrentAd} from "../redux/Resource"
import axios from 'axios';




export default function Advertisement(){

    const [qrcode, setQrcode] = useState('')
    const [allAds2, setAllAds2] = useState('')
    const [ad, setAd] = useState('')
    const [adUrl, setAdUrl] = useState('')
    const [adsRemaining, setAdsRemaining] = useState([])



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
        const now = new Date

        const randomValueFromArray = (array) => {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }
        
        const adsToTransmit = allAds.filter(ad => {
            const adRemaining = adsRemaining.find((rad) => rad.id === ad.id) || {numberOfTransmission: 0}
            
            const adStartTime = new Date(`${ad.transmissionDate} ${ad.startTime}:00`)
            const adEndTime = new Date(`${ad.transmissionDate} ${ad.endTime}:00`)
            const isOver = ad.limitPerDay <= adRemaining.numberOfTransmission
            //console.log(isOver)
            const isInTime = adStartTime < now && adEndTime > now && !isOver
            return isInTime
        })
        console.log(adsToTransmit)
        

        const adToTransmit = randomValueFromArray(adsToTransmit)
        setAd(adToTransmit)
        buildQRCode(adToTransmit)


        setTimeout(() => {
            const inputArray = adsRemaining.map((ad) => ad.id === adToTransmit.id ? {id: ad.id, numberOfTransmission: ad.numberOfTransmission + 1} : ad)
            setAdsRemaining((d) => inputArray)
        }, 3000)
        
        console.log(adsRemaining)
    }

    const putReamaining = (array) => {
        const adLimit = array.map((ad) => {
            return {id: ad.id, numberOfTransmission: 0}
        })
        setAdsRemaining(adLimit)
    }

    // * 광고 컴포넌트를 구축하는 함수입니다. 
    const buildComponent = async () => {
        if(allAds2.length === 0){
            const response = await axios.get(`http://localhost:4000/ad`)
            const allAds = await response.data
            await setAllAds2(allAds)
            await putReamaining(allAds)
            await transmitAd(allAds)
            console.log('서버요청함')
        } else {
            await transmitAd(allAds2)
        }
        
        // 광고 데이터 객체로 이루어진 배열형태의 데이터를 가져옵니다.
        // await transmitAd(allAds)
        // await setAllAds2(allAds)
        // setInterval에서 설정한 시간동안 공백이 생기므로 먼저 transmitAd를 실행합니다.
        // const transmission = await setInterval(transmitAd, 30000, allAds)
        // 30초 마다 transmitAd를 실행시킵니다.
    }
    

    useEffect(() => {
        buildComponent()
    }, [adsRemaining]);
    const dd = adsRemaining.find((rad) => rad.id === ad.id) || 0
    console.log(dd)
    return (
        <AdvertisementWrap>
            <div id='advertisement'>
                <div>
                    ID:{ad.id} <br/>
                    종류:{ad.category} <br/>
                    표시일:{ad.transmissionDate} <br/>
                    표시 시작 시간:{ad.startTime} <br/>
                    표시 종료 시간:{ad.endTime} <br/>
                    송출 제한 횟수:{ad.limitPerDay} <br/>
                    송출 횟수: {dd.numberOfTransmission}
                </div>
                <img className='qrcode' src={qrcode} />
                <button className='scan-button' onClick={() => window.open(adUrl, '_blank')}>QR코드 스캔 페이지 열기 버튼</button>
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
