import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { db } from '../Base'
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {

    const [getAll, setGetAll] = useState([]);

    const getData = async () => {
        const user = await collection(db, "posts");
        onSnapshot(user, (snapshot) => {
            const r = [];
            snapshot.forEach((doc) => {
                r.push({ ...doc.data(), id: doc.id });
            });
            setGetAll(r);
        });
    };
    // console.log(getAll)
    useEffect(() => {
        getData();
    }, []);
    return (
        <Container>
            <Wrapper>
                {getAll?.map(props => {
                    return (
                        <Card key={props.id} >
                            <img src={props.image} />
                            <Hold>
                                <p>{props.title}</p>
                                <p>{props.content}</p>
                            </Hold>
                        </Card>
                    )
                })}
            </Wrapper>
        </Container>
    )
}

export default Dashboard

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /* position: relative; */
`
const Wrapper = styled.div`
    width: 60%;


    @media (max-width: 800px) {
        width: 90%;
    }
/* background-color: red; */
`
const Card = styled.div`
    width: 400px;
    margin: 10px;
    position: relative;
    z-index: -1;
    text-decoration: none;
    /* background-color: gray; */
    display: flex;
    align-items: center;
    /* justify-content: center; */
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 5px;
    cursor: pointer;


    img{
        width: 100px;
        height: 100px;
        background-color: red;
    }
`
const Hold = styled.div`
    margin-left: 10px;

    p{
        color: blue;
        font-weight: 800;
    }
`