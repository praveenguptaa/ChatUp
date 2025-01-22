import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

export default function Welcome() {

    const [userName, setUserName] = useState(()=>{
        return JSON.parse(localStorage.getItem("chat-app-user")).username;
    })

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
