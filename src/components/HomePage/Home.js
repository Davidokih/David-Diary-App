import React from 'react'
import Header from '../Header/Header'
import Dashboard from './Dashboard'
import SideBar from './SideBar'
import styled from 'styled-components'

const Home = () => {
    return (
        <div>
            <Header />
            <Wrapper>
                <Div><SideBar /></Div>
                <Dashboard />
            </Wrapper>
        </div>
    )
}

export default Home

const Wrapper = styled.div`
    display: flex;
`

const Div = styled.div`
     @media (max-width: 800px){
            display: none;
        }
`