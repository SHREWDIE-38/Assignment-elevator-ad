import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Advertisement from '../components/Advertisement'

const MainPageWrap = styled.div`
`

export default function AdPage() {
    return (
        <MainPageWrap>
            <div id='mainpage'>
                <Advertisement />
            </div>
        </MainPageWrap>
    )
}