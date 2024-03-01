import axios from "axios";
import "./Checkout.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/action-type";
import { useNavigate, useParams } from "react-router-dom";
import { ICoupon } from "../../../models/ICoupon";

export default function Checkout() {

    let [amount, setAmount] = useState(0);
    // let coupon = useSelector((state: AppState) => state.coupon);
    let [coupon, setCoupon] = useState<ICoupon>({
        id: 0,
        name: "",
        priceInNis: 0,
        description: "",
        startDate: "",
        endDate: "",
        couponCode: "",
        unitsInStock: 0,
        imageSrc: "",
        companyId: 0,
        categoryId: 0,
        categoryName: ""
    });

    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    
    let { couponId: id } = useParams()

    useEffect(() => {
        getCoupon();
    }, []);

    async function createPurchase() {
        console.log(loggedUser.userId);
        
        if (loggedUser.userId) {
            try {
                const response = await axios.post(`http://localhost:8080/purchases`, { amount, 'customer': { id: loggedUser.userId }, 'coupon': { id: id } });
                let purchase = response.data;
                dispatch({ type: ActionType.SavePurchase, payload: { purchase } })
                navigate('/');
            } catch (e: any) {
                if (e.response?.data?.message) {
                    alert(e.response.data.message);

                } else {
                    console.log(e);
                    alert("Something went wrong, please try again later");
                }
            }
        }
    }

    async function getCoupon() {
        try {
            let url = `http://localhost:8080/coupons/${id}`;
            let response = await axios.get(url);
            setCoupon(response.data);
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                console.log(e);
                alert("Something went wrong, please try again later");
            }
        }
    }

    return (
        <>
            <div className="CardsContainer CheckOut">
                <div className="Title">Checkout</div>
                <div className="Card PurchasedCoupon">
                    <img src={coupon.imageSrc} />
                    <div className="DetailsContainer">
                        <p className="CardTitle">{coupon.name}</p>
                        <div className="ButtonsContainer">
                            <input type='number' placeholder="quantity" onChange={event => setAmount(+event.target.value)} />
                            <button className="Button Primary" onClick={createPurchase}>Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}