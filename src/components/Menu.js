import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Menu = () => {
    return (
        <Container>
            <Wrapper>
                <div>Blog</div>
                <Link to="/" style={{ textDecoration: "none", width: "100%" }}><div>All Entries</div></Link>
                <Link to="/addEntries" style={{ textDecoration: "none", width: "100%" }}><div>Add Entries</div></Link>
                <Link to="/profile" style={{ textDecoration: "none", width: "100%" }}><div>Profile</div></Link>
                <Link to="/signUp" style={{ textDecoration: "none", width: "100%" }}><div>Log Out</div></Link>
            </Wrapper>
        </Container>
    )
}

export default Menu

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    /* z-index: 1; */
`
const Wrapper = styled.div`
    width: 85%;
    height: 280px;
    background-color: #3b91f1;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    line-height: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    /* position: absolute; */
    div{
        border-top: 1px solid #fff;
        width: 100%;
        text-align: center;
        color: #fff;
        font-weight: 800;
        font-size: 17px;
        cursor: pointer;

        :hover{
            background-color: #235b9b;
        }
    }
`