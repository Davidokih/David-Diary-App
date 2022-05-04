import React, { useState } from 'react'
import styled from 'styled-components'
// import { Link } from 'react-router-dom'
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'

const InUp = () => {

    const [route, setRoute] = useState(false)
    const Change = () => {
        setRoute(!route)
    }
    return (
        <Container>
            <Wrapper>
                <Card1>
                    <p>Lorem Ipsum dolor sit amet,consectetur adipisicing elit, sed doeiusmod tempor incididunt ut laboreet dolore ma.</p>
                </Card1>
                <Card2>
                    <Spans>
                        {route ? (
                            <div><button onClick={Change}>SignIn</button>
                                <button onClick={Change}>SignUp</button></div>) : (<div>
                                    <button onClick={Change}>SignIn</button>
                                    <button onClick={Change}>SignUp</button>
                                </div>)}
                    </Spans>
                    <Box>
                        {route ? (<SignIn />) : (<SignUp />)}
                    </Box>
                </Card2>
            </Wrapper>
        </Container>
    )
}

export default InUp

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("/pexels-charan-sai-2874998.jpg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 200%;
`
const Wrapper = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Card1 = styled.div`
    width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    background-color: white;
    height: 536px;

    p{
        text-align: center;
        width: 350px;
    }

    @media (max-width: 800px) {
        display: none;
    }
`
const Card2 = styled.div`
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3b91f1;
    flex-direction: column;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    @media (max-width: 800px) {
        border-radius: 10px;
    }
`
const Spans = styled.div`
    width: 170px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    font-weight: 700;
    margin: 10px;

    div{
        width: 170px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        button{
            color: white;
            font-weight: 700;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
    }
`
const Box = styled.div`
    width: 400px;
    height: 500px;
    /* background-color: red; */
`