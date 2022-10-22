import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';
import CryptoJS from 'crypto-js'
import axios from 'axios';


// 광고 데이터를 수신 후 각 광고를 렌더링 하는 컴포넌트입니다.
export default function Advertisement(){

    const [allAds, setAllAds] = useState('')
    const [ad, setAd] = useState('')
    const [adTranmitNumbers, setAdTranmitNumbers] = useState([])
    const [adUrl, setAdUrl] = useState('')
    const [qrcode, setQrcode] = useState('')


    // 광고 데이터를 URL 형식의 문자열로 암호화하는 함수입니다.
    // 과제 확인을 위해 secretKey는 환경 변수에 넣지 않았습니다.
    const encrypt = (value) => {
        const secretKey = 'a34g93u4jd023h235gbifiue8'
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey);
        const result = encrypted.toString()

        return encodeURIComponent(result)
    }

    // QR 코드를 만드는 함수입니다.
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
    
    // 광고를 송출하는 함수입니다.
    const transmitAd = ( allAds ) => {
        const now = new Date
        
        // 모든 광고 중에서 송출 가능한 광고들의 정보를 배열에 담습니다.
        const adsToTransmit = allAds.filter(ad => {
            // 송출 제한 횟수를 초과하지 않고 송출 시간이 맞는 광고들을 찾습니다.
            const adNumber = adTranmitNumbers.find((rad) => rad.id === ad.id) || {numberOfTransmission: 0}
            const adStartTime = new Date(`${ad.transmissionDate} ${ad.startTime}:00`)
            const adEndTime = new Date(`${ad.transmissionDate} ${ad.endTime}:00`)
            const isOver = ad.limitPerDay <= adNumber.numberOfTransmission
            return adStartTime < now && adEndTime > now && !isOver
        })

        // 배열에서 값을 근사적으로 균일하게 반환하는 함수입니다.
        const randomValueFromArray = (array) => {
            const randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }

        // 송출 가능한 광고들 중에서 송출할 광고를 할당합니다.
        const adToTransmit = randomValueFromArray(adsToTransmit)
        setAd(adToTransmit)
        buildQRCode(adToTransmit)
        
        // 송출한 후 30초가 지나면 송출 횟수 기록에서 송출한 광고를 찾아 횟수를 더해줍니다.
        setTimeout(() => {
            const foundAd = adTranmitNumbers.find((rad) => rad.id === adToTransmit.id) || 0
            if(foundAd === 0){
                // 해당 광고의 송출 횟수 기록이 없으면 새로 기록합니다.
                setAdTranmitNumbers([...adTranmitNumbers, {id: adToTransmit.id, numberOfTransmission: 1}])
            } else {
                // 해당 광고의 송출 횟수 기록이 있으면 횟수를 더해줍니다.
                const inputArray = adTranmitNumbers.map((ad) => {
                    if(ad.id === adToTransmit.id){
                        return {id: ad.id, numberOfTransmission: ad.numberOfTransmission + 1}
                    } else {
                        return ad
                    }
                })
                setAdTranmitNumbers((array) => inputArray)
            }
        }, 30000)
    }

    // 광고 컴포넌트를 구축하는 함수입니다. 
    const buildComponent = async () => {
        // 광고 데이터가 없을 경우 서버로부터 데이터를 가져옵니다.
        if(allAds.length === 0){
            // 광고 데이터 객체로 이루어진 배열 형태의 데이터를 가져옵니다.
            const response = await axios.get(`http://localhost:4000/ad`)
            const responseAds = await response.data
            await setAllAds(responseAds)
            await transmitAd(responseAds)
            console.log('서버에서 광고 데이터를 수신 받았습니다.')
        } else {
            await transmitAd(allAds)
        }
    }
    
    // 첫 렌더링 때와 송출 횟수를 기록하는 상태가 변경될 때 buildComponent를 실행합니다.
    useEffect(() => {
        buildComponent()
    }, [adTranmitNumbers]);
   

    // 해당 광고 송출 횟수를 담은 변수입니다.
    const adr = adTranmitNumbers.find((rad) => rad.id === ad.id) || 0

    return (
        <AdvertisementWrap>
            <div id='advertisement'>
                <div className='ad-imformation'>
                    <span className='important-text'>현재 광고 정보 </span><br/>
                    ID: <span className='verry-important-text'>{ad.id}</span> <br/>
                    종류: <span className='important-text'>{ad.category}</span> <br/>
                    표시일: <span className='important-text'>{ad.transmissionDate} </span><br/>
                    표시 시작 시간: <span className='important-text'>{ad.startTime} </span><br/>
                    표시 종료 시간: <span className='important-text'>{ad.endTime} </span><br/>
                    하루 송출 제한 횟수: <span className='important-text'>{ad.limitPerDay}</span> <br/>
                    송출 횟수: <span className='important-text'>{adr.numberOfTransmission + 1 || 1}</span>
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
    .ad-imformation {
        text-align: center;
    }
    .important-text{
        font-weight: bold;
    }
    .verry-important-text{
        font-weight: bold;
        color: red;
    }
`
