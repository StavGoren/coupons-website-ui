import { useEffect, useState } from "react";
import Modal from 'react-modal';
import axios from "axios";
import jwt_decode from 'jwt-decode';
import ISuccessfulLoginDetails from "../../models/ISuccessfulLoginDetails";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../redux/action-type";
import IServerErrorData from "../../models/IServerErrorData";
import { AppState } from "../../redux/AppState";
import { IUser } from "../../models/IUser";
import { useSessionStorage } from "usehooks-ts";
import { type } from "os";
import Button from "../button/Button";
import Form from "../form/Form";

Modal.setAppElement('#root')

export default function Login() {

    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");

    // let strToken = '';
    let decodedToken: any;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function login() {
        
        try {
            const response = await axios.post("http://localhost:8080/users/login", { userName, password });
            let strToken: string = response.data;
            decodedToken = jwt_decode(strToken);
            let successfulLoginResponse: string = decodedToken.sub;
            let successfulLoginData: ISuccessfulLoginDetails = JSON.parse(successfulLoginResponse);
            dispatch({ type: ActionType.SaveLoginData, payload: { successfulLoginData } });
            dispatch({ type: ActionType.SetUserLogin, payload: { isLoggedIn: true } });
            axios.defaults.headers.common["Authorization"] = strToken;
            localStorage.setItem('strToken', strToken);
            navigate('/');
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
                console.error(e);
            } else {
                alert("Something went wrong");
            }
        }
    }

    return (
        <>
            <div className="Title">
                Login
            </div>
            <Form>
                <input type="text" placeholder="Username" onChange={event => setUserName(event.target.value)} />
                <input type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
                <Button level={'Primary'} onClick={login} >Login</Button>
                <span >Not a member yet? <Link className='Link' to={'/register'}>Register</Link></span>
            </Form>
        </>
    );
}