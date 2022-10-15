import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import QRCode from 'qrcode';

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
    const [url, serUrl] = useState('https://google.com')
    const [qrcode, setQrcode] = useState('')


    const generateQRCode = () => {
        console.log(`Current QRCode URL is ${url}`)
        QRCode.toDataURL(url, (err, url) => {
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