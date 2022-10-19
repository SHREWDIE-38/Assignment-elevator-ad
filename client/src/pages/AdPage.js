import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Advertisement from '../components/Advertisement'
import QRCode from 'qrcode';
import { useSelector, useDispatch } from 'react-redux';
import CryptoJS from 'crypto-js'
import {setAllAds, setCurrentAd} from "../redux/Resource"
import axios from 'axios';

const MainPageWrap = styled.div`
`

export default function MainPage() {
    

    return (
        <MainPageWrap>
            <div id='mainpage'>
                <Advertisement />
            </div>
        </MainPageWrap>
    )
}