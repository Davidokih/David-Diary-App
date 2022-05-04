import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, db } from '../Base'
import { AuthContext } from '../SignIn/AuthProvider'
import { collection, doc, getDoc } from 'firebase/firestore'

const SideBar = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    console.log(currentUser?.uid);

    const getUser = async () => {
        const docRef = doc(db, "users", currentUser?.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data())
            setUserData(docSnap.data)
            console.log("userData: ", userData);
        } else {
            console.log("No such document")
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <Container>
            <Wrappper>
                <img src={currentUser ? userData?.avatar : null} />
                {currentUser ? <p>{userData?.userName}</p> : null}
                <Link to="/" style={{ textDecoration: "none", color: "#fff" }}><Return>Back</Return></Link>
            </Wrappper>
        </Container>
    )
}

export default SideBar

const Container = styled.div`
    width: 40%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #3b91f1; 
    position: fixed;

    @media(max-width: 800px){
        width: 100%;
    }
`
const Return = styled.div`

    display: none;
  
  @media (max-width: 800px){
    background-color: #235b9b;
    display: block;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;

    :active{
        background-color: #3b91f1;
    }
  }
`
const Wrappper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

    img{
        width: 100px;
        height: 100px;
        border: 1px solid gray;
        border-radius: 50%;

    }

    p{
        font-size: 40px;
        font-weight: 900;
        color: #fff;
    }
`