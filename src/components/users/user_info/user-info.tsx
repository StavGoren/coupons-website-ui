import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import axios from "axios";
import { IUser } from "../../../models/IUser";
import jwt_decode from "jwt-decode";
import ISuccessfulLoginDetails from "../../../models/ISuccessfulLoginDetails";
import { ActionType } from "../../../redux/action-type";

export default function UserInfo() {

    let user = useSelector((state:AppState) => state.user);
    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let userId = registeredUser.userId;

    let dispatch = useDispatch();

    useEffect(() => {
        getUser(userId);
    }, []);

    async function getUser(userId: number) {
        try {
            let url = `http://localhost:8080/users/${userId}`;
            let response = await axios.get(url);
            let user = response.data;
            dispatch({type: ActionType.GetUser, payload: { user }});
            console.log("user: " + user);            
        } catch (e: any) {
            if (e?.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                console.log(e);
                alert("Something went wrong, please try again later");
            }
        }
    }


    return (
        <div className="UserInfo">
            <h2>My details</h2>
            <p>My email: {user.userName}</p>
            {user.companyName && <p>Company: {user.companyName}</p>}
        </div>
    )
}