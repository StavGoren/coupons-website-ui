import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../redux/action-type";
import IPurchase from "../../../models/IPurchase";
import { Link, useParams } from "react-router-dom";
import './purchases-of-customer.css';

export default function PurchasesOfCustomer() {

    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let [purchasesArray, setPurchasesArray] = useState<IPurchase[]>([]);
    // let { pageNumber } = useParams();
    let smileyFace = ":)";


    useEffect(() => {
        getPurchasesByCustomer();
    }, [loggedUser]);

    async function getPurchasesByCustomer() {
        if(loggedUser.userId){
            try {
                let url = `http://localhost:8080/purchases/byCustomerId?customerId=${loggedUser.userId}`;
                let response = await axios.get(url);
                setPurchasesArray(response.data);
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                } else {
                    alert("Something went wrong, try again later");
                }
            }
        }
    }

    return (
        <>
            <div className="CardsWithTitleContainer Purchases">
                <div className="Title">Purchase history</div>
                <div className="CardsContainer Purchases">
                    {purchasesArray.map((purchase: IPurchase) =>
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
            </div>
        </>
    );
}