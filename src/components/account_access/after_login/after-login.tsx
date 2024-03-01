import { useNavigate, useParams } from "react-router-dom";
import { IUser } from "../../../models/IUser";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "../../login/Login";
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import './after-login.css';
import { ActionType } from "../../../redux/action-type";
import { CgLogOut } from 'react-icons/cg';


export default function AfterLogin() {

    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);

    let dispatch = useDispatch();
    let navigate = useNavigate();

    function onLogoutClick() {
        localStorage.removeItem('strToken');
        dispatch({ type: ActionType.SetUserLogin, payload: { isLoggedIn: false } });
        navigate('/');
    }

    function navigateToUserDetailsPage() {
        if (loggedUser.userType == "Customer") {
            navigate("/customer/" + loggedUser.userId);
        } else {
            navigate("/user/" + loggedUser.userId);
        }
    }

    return (
        <div className="AfterLogin">

            <div className="Avatar">
                {loggedUser.userName[0]}
            </div>

            <div className="DropdownList">
                <button className="DropdownItem" onClick={() => navigateToUserDetailsPage()}><FaUser className="DropdownItemIcon" /> My Account</button>
                <button className="DropdownItem Danger" onClick={() => onLogoutClick()}><CgLogOut className="DropdownItemIcon"/>Logout</button>
            </div>
        </div>
    )
}