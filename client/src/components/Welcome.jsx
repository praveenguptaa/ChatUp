import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif';
import {useNavigate} from 'react-router-dom';


export default function Welcome() {

  const navigate = useNavigate();
  
  const [userName, setUserName] = useState("");

  const gettingCurrentUser = async () => {
    const currentUser = await JSON.parse(localStorage.getItem("chat-app-user"));
    if(!currentUser){
      navigate("/login");
    }
    setUserName(currentUser.username);
  }

  useEffect(() => {
    gettingCurrentUser();
  }, [])
  

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span>{userName}</span>
      </h1>
      <html>Please select a chat to start messaging</html>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
      height: 20rem;
    
    }
    span {
      color: #4e0eff;
    }
    
    
`
