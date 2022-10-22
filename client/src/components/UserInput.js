import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js'
import axios from 'axios';

// 사용자가 QR 코드를 스캔했을 때 방문할 수 있는 페이지 컴포넌트입니다.
export default function UserInput() {

    const elevatorID = 'ELE_1001'
    const [inputUsername, setInputUsername] = useState('')
    const [inputUserMail, setInputUserMail] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [worningMassage, setWorningMassage] = useState('')


    // URL params로 들어온 광고 데이터를 복호화 하여 객체 형태로 리턴하는 함수입니다.
    // 과제 확인을 위해 secretKey는 환경 변수에 넣지 않았습니다.
    const decrypt = (encrypted) => {
        const secretKey = 'a34g93u4jd023h235gbifiue8'
        let bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
        let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decrypted;
    }

    const params = useParams();
    const adData = params.adData
    const decryptedAdData = decrypt(adData)

    // QR 코드에 포함된 데이터 및 사용자가 입력한 데이터를 서버에 전달하는 함수입니다.
    const send = () => {
        setWorningMassage('')
        // 세션이 만료되었는지 확인합니다.
        const scanTime = sessionStorage.getItem('scanTime') || 'expired'
        if (scanTime === 'expired') {
            alert('만료되었습니다. QR코드를 다시 스캔해주세요.')
        } else {
            if (worningMassage === '메일 형식이 올바르지 않습니다.') {
                setWorningMassage('메일 형식이 올바르지 않습니다.')
            } else if (!inputUsername || !inputUserMail) {
                setWorningMassage('이름과 메일주소를 입력해주세요.')
            } else {
                // 서버로 엘리베이터 ID, 광고 ID, QR 코드를 스캔한 시간, 사용자 이름, 사용자 메일 주소, 약관 동의 여부를 전송합니다.
                const payload = {
                    elevatorID: elevatorID,
                    adID: decryptedAdData.id,
                    QRCodeScanTime: scanTime,
                    userName: inputUsername,
                    userMail: inputUserMail,
                    agreement: isChecked? 'Y' : 'N',
                }
                axios.post(`http://localhost:4000/user`, payload)
                    .then((res) => {
                        console.log('서버에 아래 내용을 전송하였습니다.')
                        console.log(payload)
                        alert('전송 되었습니다.')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    }

    // 스캔한 시간을 세션 스토리지에 기록합니다. 5분이 지나면 세션 스토리지를 비웁니다.
    useEffect(() => {
        let scanTime = new Date()
        console.log('스캔한 시간은 ' + scanTime + '입니다.')
        sessionStorage.setItem('scanTime', scanTime)
        setTimeout(() => { sessionStorage.clear() }, 300000)
    }, [])


    // 사용자 이름을 유효성 검사하는 함수입니다.
    const usernameFilter = (value) => {
        // eslint-disable-next-line
        const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;
        if (regExp.test(value)) {
            const inputValue = value.slice(0, value.length - 1)
            setInputUsername(inputValue)
            return
        }
        setInputUsername(value)
    }

    // 사용자 메일 주소를 유효성 검사하는 함수입니다.
    const emailFilter = (value) => {
        setWorningMassage('')
        const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (value === '') {
            setInputUserMail(value)
            setWorningMassage('')
        } else {
            if (regExp.test(value)) {
                setInputUserMail(value)
                setWorningMassage('')
            } else {
                setInputUserMail(value)
                setWorningMassage('메일 형식이 올바르지 않습니다.')
            }
        }
    }

    const check = () => {
        setIsChecked(!isChecked)
    }

    return (
        <UserInputWrap>
            <div id='UserInput'>
                <div className='ad-imformation'>
                    <span className='important-text'>스캔한 광고 정보 </span><br />
                    ID: <span className='verry-important-text'>{decryptedAdData.id}</span> <br />
                    종류: <span className='important-text'>{decryptedAdData.category}</span> <br />
                    표시일: <span className='important-text'>{decryptedAdData.transmissionDate} </span><br />
                    표시 시작 시간: <span className='important-text'>{decryptedAdData.startTime} </span><br />
                    표시 종료 시간: <span className='important-text'>{decryptedAdData.endTime} </span><br />
                    하루 송출 제한 횟수: <span className='important-text'>{decryptedAdData.limitPerDay}</span> <br />
                </div>
                <input
                    className='input-area'
                    type='username'
                    placeholder='이름'
                    onChange={(event) => { usernameFilter(event.target.value) }}
                    value={inputUsername}
                    maxLength='12'
                />
                <input
                    className="input-area"
                    type="email"
                    placeholder="메일 주소"
                    onChange={(event) => { emailFilter(event.target.value) }}
                    value={inputUserMail}
                    maxLength='40'
                />
                <div className='important-text'>
                    약관에 동의하십니까?
                    <input
                        className='check-box'
                        type='checkbox'
                        onChange={(event) => check(event)}
                        checked={isChecked}
                    />
                </div>
                <div className='verry-important-text'>
                    {worningMassage}
                </div>
                <button onClick={() => send()}>전송</button>
            </div>
        </UserInputWrap>
    )
}

// 스타일컴포넌트를 사용합니다.
const UserInputWrap = styled.div`
    display: flex;
    justify-content: center;

    #UserInput {
        display: flex;

        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 50vh;
        height: 100vh;
        background-color: pink;
        border: solid;
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