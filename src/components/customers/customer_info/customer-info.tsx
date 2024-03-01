import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import ISuccessfulLoginDetails from "../../../models/ISuccessfulLoginDetails";
import { ActionType } from "../../../redux/action-type";
import jwt_decode from "jwt-decode";
import { LuSave } from "react-icons/lu";
import { FiEdit } from 'react-icons/fi';
import { Link, useNavigate } from "react-router-dom";
import IPurchase from "../../../models/IPurchase";
import './customer-info.css';
import { BsFillTelephoneFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import TitleWithButton from "../../title_with_button/title-with-button";

export default function CustomerInfo() {

    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let customer = useSelector((state: AppState) => state.customer);
    let purchasesOfCustomer = useSelector((state: AppState) => state.customerPurchases);

    const navigate = useNavigate();
    let dispatch = useDispatch();
    let smiley = ":)";

    function showFullPurchaseHistory() {
        navigate('/purchases/' + customer.id);
    }

    // useEffect(() => {
    //     const userToken = localStorage.getItem('strToken');
    //     if (userToken) {
    //         let decodedToken: any = jwt_decode(userToken);
    //         let userName = localStorage.getItem('userName');
    //         let successfulLoginResponse: ISuccessfulLoginDetails = JSON.parse(decodedToken.sub);
    //         dispatch({ type: ActionType.SetUserLogin, payload: { isLoggedIn: true } });
    //         dispatch({ type: ActionType.SaveLoginData, payload: { successfulLoginData: successfulLoginResponse } });
    //         dispatch({ type: ActionType.SaveUserName, payload: { userName } })
    //         console.log("userToken" + userToken);

    //     } else {
    //         navigate("/");
    //     }
    // }, []);


    useEffect(() => {
        getCustomer();
        getRecentCustomerPurchases();
    }, [loggedUser])

    async function updateCustomer() {
        try {
            let userToken = localStorage.getItem('strToken');
            if (userToken) {
                let decodedToken: any = jwt_decode(userToken);
                let successfulLoginResponse: ISuccessfulLoginDetails = JSON.parse(decodedToken.sub);
                const response = await axios.put(`http://localhost:8080/customers`, {
                    id: loggedUser.userId,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phoneNumber: customer.phoneNumber,
                    address: customer.address
                });
                let updatedCustomerDetails = response.data;
                console.log("updatedCustomerDetails ");
                console.log(updatedCustomerDetails);
                dispatch({ type: ActionType.SaveLoginData, payload: { successfulLoginData: successfulLoginResponse } });
                dispatch({ type: ActionType.UpdateCustomer, payload: { updatedCustomerDetails } })
            }
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    async function getCustomer() {
        if (loggedUser.userId) {
            try {
                let url = `http://localhost:8080/customers/${loggedUser.userId}`;
                let response = await axios.get(url);
                dispatch({ type: ActionType.GetCustomer, payload: { customer: response.data } });
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                } else {
                    alert("Something went wrong , Try  later");
                }
            }
        }
    }

    async function getRecentCustomerPurchases() {
        if (loggedUser.userId) {
            try {
                let url = `http://localhost:8080/purchases/byCustomer?customerId=${loggedUser.userId}&pageNumber=${0}`;
                let response = await axios.get(url);
                let purchasesOfCustomer = response.data;
                dispatch({ type: ActionType.GetPurchasesByCustomer, payload: { purchasesOfCustomer } });
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                } else {
                    alert("Something went wrong , Try  later");
                }
            }
        }
    }

    return (
        <>
            <div className="EntityBanner">
                <div className="Title">
                    {customer.firstName} {customer.lastName}
                </div>
                <div className='EntityDetails'>
                    <span className='EntityDetail'><HiLocationMarker /> {customer.address}</span>
                    <span className='EntityDetail'><BsFillTelephoneFill /> {customer.phoneNumber}</span>
                </div>
            </div>

            <>
                {purchasesOfCustomer.length == 0 ? (
                    <div className="Title">
                        <span>
                            No purchases to show.<br />
                            But we can change that, click <Link to={"/coupons"}> here {smiley}</Link>
                        </span>
                    </div>) : (
                    <div className="CardsWithTitleContainer Purchases">
                        <TitleWithButton onClick={() => showFullPurchaseHistory()}>
                            Purchase history
                        </TitleWithButton>
                        <div className="CardsContainer Purchases">
                            {purchasesOfCustomer.map((purchase: IPurchase) =>
                                <div className="Card Purchase">
                                    <img src={purchase.imageSrc} />
                                    <div className="DetailsContainer">
                                        <span className="CardTitle">{purchase.couponName}</span>
                                        <span>Amount: {purchase.amount}<br/>
                                        <span>Purchase date: {new Date(purchase.date).toLocaleDateString()}</span></span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>)}
            </>
        </>
    )
}