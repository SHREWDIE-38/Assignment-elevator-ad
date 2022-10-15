import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const UserInputWrap = styled.div`
    display: flex;
    justify-content: center;

    #UserInput {
        display: flex;

        align-items: center;
        justify-content: center;
        flex-direction: column;

        width: 90vw;
        height: 160vw;
        background-color: pink;
        border: solid;
    }
`

export default function UserInput() {

  const [inputUsername, setInputUsername] = useState('')
  const [inputEmail, setInputEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  
  const [usernameWarning, setUsernameWarning] = useState(false)
  const [emailWarning, setEmailWarning] = useState(false)

  const [emptyEmailWarning, setEmptyEmailWarning] = useState(false)
  const [emptyUsernameWarning, setEmptyUsernameWarning] = useState(false)

  const usernameFilter = (value) => {
    setEmptyUsernameWarning(false)
    const regExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

    if(regExp.test(value)){
      const inputValue = value.slice(0, value.length - 1)
      setInputUsername(inputValue)
      return
    } 

    if(value.length > 12){
      const inputValue = value.slice(0, 12)
      setInputUsername(inputValue)
      return
    }

    setInputUsername(value)
  }

  const emailFilter = (value) => {
    setEmptyEmailWarning(false)
    const regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if(value === ''){
      setInputEmail(value)
      setEmailWarning(false)
    } else {
      if(regExp.test(value)){
        setInputEmail(value)
        setEmailWarning(false)
      } else {
        setInputEmail(value)
        setEmailWarning(true)
      }
    }
  }

  const check = () => {
    setIsChecked(!isChecked)
  }

  return (
    <UserInputWrap>
      <div id='UserInput'>
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
          value={inputEmail}
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
        <button>전송</button>
      </div>
    </UserInputWrap>
  )
}