import React, {useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({handleSendMsg}) {
  
  const [msg, SetMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
   
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  const handleEmojiClick = (emojiObject) => {
    console.log(emojiObject.emoji);
    let message = msg;
    message += emojiObject.emoji;
    SetMsg(message);
    // message = "";
  }

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length > 0){
      handleSendMsg(msg);
      SetMsg("");
      setShowEmojiPicker(false);
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} height={300} width={200}/>}
        </div>
      </div>
      <form className='input-container' onSubmit={(event) => sendChat(event)}>
        <input 
        type="text" 
        placeholder='Type your message here'
        onChange={(e) => {SetMsg(e.target.value)}}
        value={msg}
        />
        <button className='submit'>
            <IoMdSend/>
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 5% 95%;
    align-items: center;
    background-color: #080420;
    padding: 0 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0 1rem;
        gap: 1rem;
    }
    .button-container {
        display: flex;
        /* justify-content: center; */
        align-items: center;
        color: white;
        gap: 1rem;
        .emoji {
            position: relative;
            svg {
                font-size: 1.5rem;
                color: #ffff00c8;
                cursor: pointer;
            }
            .epr-main {
                position: absolute;
                top: -320px;
                background-color: #080420;
                box-shadow: 0 5px 10px #9a86f3;
                
              }
              .epr_b8hfyo::-webkit-scrollbar {
                  background-color: #080420;
                  width: 5px;
                  &-thumb {
                    background-color: #9a86f3;
                  }
                }
              .epr_-2zpaw9 {
                  background-color: transparent;
                  border-color: #9a86f3;
              }
              .epr-emoji-category-label {
                display: none;
              }
              .epr-category-nav {
                display: none;
              }
              .epr_-kg0voo {
                display: none;
              } 
        }

    }
    .input-container {
        width: 100%;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        gap: 2rem;
        background-color: #ffffff34;
        input {
          width: 90%;
          height: 60%;
          background-color: transparent;
          border: none;
          color: white;
          padding-left: 1rem;
          font-size: 1.2rem;
          &::selection {
            background-color: #9a86f3;
          }
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.3rem 2rem;
          border-radius: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #9a86f3;
          border: none;
          @media screen and (min-width: 720px) and (max-width:1080px) {
            padding: 0.3rem 1rem;
            svg {
              font-size: 1rem;
            }
          }
          svg {
            font-size: 2rem;
            color: white;
          }
        }
    }

`
