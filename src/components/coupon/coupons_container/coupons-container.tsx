import axios from "axios";
import { useState, useEffect } from "react";
import { ICoupon } from "../../../models/ICoupon";
import CouponCard from "../coupon-card/coupon-card";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";

export default function CouponsContainer() {

    // let couponsArray: ICoupon[] = useSelector((state: AppState) => state.allCouponCards);
    let [couponsArray, setCouponsArray] = useState<ICoupon[]>([]);
    let [pageNumber, setPageNumber] = useState(0);

    useEffect(()=> {
        getCouponsForHomePage();
    }, []);

    async function getCouponsForHomePage(){
        try{
            let url = `http://localhost:8080/coupons/byPage?pageNumber=${0}`;
            let response = await axios.get(url);
            setCouponsArray(response.data);
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    return (
        <div className="CardsContainer">

            {couponsArray.map((coupon: ICoupon) => {
                return (
                    <CouponCard
                        key={coupon.id}
                        imageSrc={coupon.imageSrc}
                        name={coupon.name}
                        priceInNis={coupon.priceInNis}
                        startDate={coupon.startDate}
                        endDate={coupon.endDate}
                        unitsInStock={coupon.unitsInStock}
                        id={coupon.id}
                        companyId={coupon.companyId}
                        categoryName={coupon.categoryName}
                        categoryId={coupon.categoryId}
                        description={coupon.description} 
                        couponCode={coupon.couponCode}
                        />)
            })}
        </div>
    );
}