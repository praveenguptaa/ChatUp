import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {BiPowerOff} from 'react-icons/bi';


export default function Logout() {

    const navigate = useNavigate();
    const handleClick = async () => {
        // const id = await JSON.parse(
        //     localStorage.getItem("chat-app-user")
        // )._id;
        localStorage.clear();
        navigate("/login");
        
    }

  return (
    <>
      <Button onClick={handleClick}>
        <BiPowerOff/>
      </Button>
    </>
  )
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: #9a86f3;
    cursor: pointer;
    svg {
        font-size: 1.3rem;
        color: #ebe7ff;
    }

`
