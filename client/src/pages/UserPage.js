import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInput from '../components/UserInput'

const UserInputWrap = styled.div`
`

export default function UserPage() {
  return (
    <UserInputWrap>
      <div id='UserInput'>
        <UserInput/>
      </div>
    </UserInputWrap>
  )
}