import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CryptoJS from 'crypto-js'
import axios from 'axios';

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
`

export default function UserInput() {
  const params = useParams();
  const adData = params.adData
  const decryptedAdData = decrypt(adData)

  function decrypt (encrypted) {
    const secretKey = 'a34g93u4jd023h235gbifiue8'
    let bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
    let decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    return decrypted;
  }

  console.log(decryptedAdData)

  const [inputUsername, setInputUsername] = useState('')
  const [inputUserMail, setInputUserMail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const usernameFilter = (value) => {
    setInputUsername(value)
  }

  const emailFilter = (value) => {
    setInputUserMail(value)
  }

  const check = () => {
    setIsChecked(!isChecked)
  }

  const send = () => {
    axios.post(`http://localhost:4000/user`, {
      elevatorID: 1,
      adID: decryptedAdData.id,
      QRCodeScanTime: 1,
      userName: inputUsername,
      userMail: inputUserMail,
      agreement: isChecked,
    })
    .then((res) => {

    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <UserInputWrap>
      <div id='UserInput'>
        <div>{decryptedAdData.id}</div>
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
        <div>
          약관에 동의하십니까?
          <input
            className='check-box'
            type='checkbox'
            onChange={(event) => check(event)}
            checked={isChecked}
          />
        </div>
        <button onClick={() => send()}>전송</button>
      </div>
    </UserInputWrap>
  )
}