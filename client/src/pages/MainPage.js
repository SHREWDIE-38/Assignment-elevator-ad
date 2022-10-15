import React from 'react';
import styled from 'styled-components';
import Advertisement from '../components/Advertisement'
import UserInput from '../components/UserInput'

const MainPageWrap = styled.div`
`


export default function MainPage() {
    return (
        <MainPageWrap>
            <div id='mainpage'>
                <Advertisement/>
                <UserInput/>
            </div>
        </MainPageWrap>
    )
}