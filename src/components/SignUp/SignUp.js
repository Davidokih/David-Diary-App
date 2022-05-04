import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { db, storage, auth } from '../Base'

const SignUp = () => {

    const navigate = useNavigate()
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState("")
    const [parsentage, setPercentage] = useState("")

    const imageController = async (e) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setAvatar(save)

        const storageRef = ref(storage, 'userAvatar/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            "state_changed",
            (snapShot) => {
                const progress = (snapShot.bytesTransferred / snapShot.totalBytes) * 10;
                console.log("Upload is " + progress + "% done");
                setPercentage(progress)
            },
            (error) => {
                console.log(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    console.log("File available at", downloadUrl);
                    setAvatar(downloadUrl);
                    console.log("This is the Avatar: ", avatar);
                })
            }
        )
    }

    const authUser = async () => {
        const user = await createUserWithEmailAndPassword(auth, email, password)

        if (user) {
            const userData = doc(collection(db, "users"), user.user.uid)
            await setDoc(userData, { userName, email, password, avatar })
        }

        setUserName("")
        setEmail("")
        setPassword("")

        navigate("/")
    }
    return (
        <Container>
            <Wrapper>
                <InputHold>
                    <img src={avatar} />
                    <label htmlFor='pic'> Upload Image<input type='file' id="pic" onChange={imageController} /></label>
                    <input placeholder='User Name' value={userName} onChange={(e) => {
                        setUserName(e.target.value)
                    }} />
                    <input placeholder='Email' value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                    <input placeholder='Password' value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button onClick={authUser}>Sign Up</button>
                </InputHold>
            </Wrapper>
        </Container>
    )
}

export default SignUp

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
    width: 370px;
    height: 400px;
    display: flex;
    /* border: 1px solid lightgray; */
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    /* background-color: skyblue; */
    flex-direction: column;

   p{
       text-align: center;
       font-size: 13px;
       width: 280px;
   }
`
const InputHold = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img{
        width: 80px;
        height: 80px;
        border: 1px solid gray;
        border-radius: 50%;
    }
    
    label{

        width: 130px;
        height: 30px;
        background-color: #fff;
        color: black;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        cursor: pointer;

        font-weight: 800;
        input{
            display: none;
        }
    }
     input{
        outline: none;
        width: 280px;
        height: 30px;
        /* border: none; */
        border: 0.5px solid lightgray;
        margin: 5px;
        padding-left: 5px;
        border-radius: 5px;
        /* :hove{
            border: 2px solid lightgray;
        } */
    }

    button{
        outline: none;
        border: none;
        background-color: blue;
        width: 280px;
        height: 27px;
        color: white;
        font-weight: 700;
        border-radius: 5px;
        cursor: pointer;
    }
`