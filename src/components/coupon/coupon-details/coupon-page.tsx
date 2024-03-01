import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import './coupon-page.css';
import { format, parseISO } from "date-fns";
import { ICoupon } from "../../../models/ICoupon";
import { AppState } from "../../../redux/AppState";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../../redux/action-type";


export default function CouponPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
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

    // let startDate = coupon.startDate;
    // let parsedStartDate = parseISO(startDate);
    // let formattedStartDate = format(parsedStartDate, "dd/mm/yyyy");

    // let endDate = coupon.endDate;
    // let parsedEndDate = parseISO(endDate);
    // let formattedEndDate =  format(parsedEndDate, "dd/mm/yyyy");

    let { id } = useParams();

    function navigateToCouponPurchase(){
        if(isUserLoggedIn && loggedUser.userType == "Customer"){
            navigate("/purchase/" + coupon.id);
            dispatch({type: ActionType.Buy, payload: { purchasedCoupon: coupon }});
        } else {
            alert("Please login");
        }
    }

    useEffect(() => {
        getCoupon();
    }, [id]);

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

            <div className="Card FullWidth">
                <div className="CouponImage" style={{backgroundImage: `url(${coupon.imageSrc})`}}>
                </div>

                <div className="DetailsContainer">
                    <span className="CardTitle">{coupon.name}</span>
                    <span>Category: <Link to={`/coupons/category/${coupon.categoryId}`} className="Link">{coupon.categoryName}</Link></span>
                    <span>{coupon.description}</span>
                    <span>Code: <span className="CouponCode">{coupon.couponCode}</span></span>

                    <div className="PriceAndDateWrapper">
                        <span>From {new Date(coupon.startDate).toLocaleDateString()}<br />
                            To {new Date(coupon.endDate).toLocaleDateString()}</span>
                        <span className="PriceWrapper"><span className="Price">{coupon.priceInNis}₪</span><br />
                            {coupon.unitsInStock} units in stock</span>
                    </div>

                    <button className="Button Primary" onClick={() => navigateToCouponPurchase()}>
                        Buy now
                    </button>
                </div>
            </div>
        </>
    );
}