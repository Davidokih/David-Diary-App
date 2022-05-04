import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import Header from '../Header/Header'
import { AuthContext } from '../SignIn/AuthProvider'
import { addDoc, collection, doc, getDoc, serverTimestamp, Timestamp, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage, auth } from '../Base'
import { useNavigate } from 'react-router-dom'
import { updateCurrentUser } from 'firebase/auth'

const AddEntries = () => {

    const { currentUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [parsentage, setPercentage] = useState("")

    const imageController = async (e) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file)
        setImage(save)

        const storageRef = ref(storage, 'postImage/' + file.name)
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
                    setImage(downloadUrl);
                    console.log("This is the Avatar: ", image);
                })
            }
        )
    }

    const postContent = async () => {
        const userData = doc(collection(db, "posts"))
        await setDoc(userData, {
            title,
            content,
            image,
            createAt: Timestamp.fromDate(new Date().toDateString()),
            createBy: currentUser.uid
        })

        setTitle("")
        setContent("")
        setImage("")

        navigate("/")
    }
    return (
        <>
            <Header />
            <Container>
                <Wrapper>
                    <h1>Add Entries</h1>
                    <Card>
                        <img src={image} />
                        <label htmlFor="pic"> Upload Image<input type='file' id="pic" onChange={imageController} /></label>
                        <input placeholder='Title' value={title} onChange={(e) => {
                            setTitle(e.target.value)
                        }} />
                        <textarea placeholder='Content' value={content} onChange={(e) => {
                            setContent(e.target.value)
                        }} />
                        <button onClick={postContent}>Post</button>
                    </Card>
                </Wrapper>
            </Container>
        </>
    )
}

export default AddEntries

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
`
const Card = styled.div`
    width: 400px;
    height: 500px;
    background-color: #3b91f1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 10px;

    img{
        width: 80px;
        height: 80px;
        border: 1px solid gray;
        border-radius: 50%;
    }

    input{
        width: 230px;
        height: 30px;
        border: 1px solid gray;
        outline: none;
        border-radius: 5px;
        margin: 10px;
    }

    textarea{
        width: 230px;
        height: 120px;
        border: 1px solid gray;
        outline: none;
        border-radius: 5px;
        margin: 10px;
    }

    button{
        width: 80px;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 5px;
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

        font-weight: 800;
        input{
            display: none;
        }
    }
`