import {React,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {styled} from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import {onAuthStateChanged} from 'firebase/auth';
import {firebaseAuth} from '../utils/FirebaseConfig';
import { checkUsernameRoute, registerRoute } from "../utils/APIRoutes";
import { debounce } from "../utils/Debounce";



const SetUsername = () => {

  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [label, setLabel] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  onAuthStateChanged(firebaseAuth, (userData) => {
    if(!userData) {
        navigate("/login");
    }else{
        setEmail(
            userData.email ? userData.email : userData.providerData[0].email
        );
    }
  });

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  }, [])
  

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateForm()){
      const {data} = await axios.post(registerRoute, {
        username: values,
        email,
        password: (Math.random()+1).toString(20).substring(1),
      });

      if(data.status === false){
        toast.error(data.msg, toastOptions);
      }
      if(data.status === true){
         localStorage.setItem("chat-app-user",JSON.stringify(data.user));
        navigate('/');
      }
    }
  };

  const validateForm = () => {
    if(values.length < 3) {
        toast.error(
            "Username should be more than 3 characters",
            toastOptions
        );
        return false;
    }
    return true;
  };

  const checkUsername = async (username) => {
    if(username.length > 3) {
        const {data} = await axios.post(checkUsernameRoute, {username});
        setUsernameStatus(data.status);
        setLabel(data.msg);
        setValues(username);
    }
  }


  

  const handleChange = debounce((name) => checkUsername(name),300);

  return (
    <>
      <FormContainer>
        { email && (
        <form action='' onSubmit={(e)=>{handleSubmit(e)}}>
        <span>Check Username Availablity</span>
            <div className='row'>
          <input
          className={`${usernameStatus ? "success" : usernameStatus !== undefined ? "danger" : ""}`} 
          type="text" 
          placeholder='Username'
          name='username'
          min="3"
          onChange={(e)=>{handleChange(e.target.value)}}
          />
          <label 
          htmlFor=""
          className={`${usernameStatus ? "success" : usernameStatus !== undefined ? "danger" : ""}`}
          >
            {label}
          </label>
          
          </div>
          
          <button type="submit" className='btn'>Create User</button>
         
          

        </form>
)}
      </FormContainer>
      <ToastContainer/>

    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .row {
    label {
        display: block;
        margin: 10px 0 0 5px;
        transition: 0.3s ease-in-out;
        height: 0.5rem;
    }
    label.success {
        color: #39ff14;
    }
    label.danger {
        color: #ff3131;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    .success {
        border-color: #39ff14;
        &:focus {
        border-color: #39ff14;
        }
    }
    .danger {
        border-color: #ff3131;
        &:focus {
        border-color: #ff3131;
        }
    }
    .btn {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      
    }
  }
`;

export default SetUsername;

