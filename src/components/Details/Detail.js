import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { db } from '../Base'
import { collection, getDoc } from 'firebase/firestore'
import Header from '../Menu'

const Detail = () => {
    const { id } = useParams()
    console.log(id)
    const [getData, setGetData] = useState({})

    const fetchData = () => {
        setGetData(getDoc(collection(db, "posts"), id))
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <Container>
            <div><Header /></div>
            <Wrapper>
                <img src={fetchData.image} />
                <h1>{fetchData.title}</h1>
                <div>Content</div>
            </Wrapper>
        </Container>
    )
}

export default Detail

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    img{
        width: 150px;
        height: 150px;
    }

    h1{
        font-size: 40px;
        font-weight: 800;
    }

    div{
        font-family: Darling in paris;
    }
`