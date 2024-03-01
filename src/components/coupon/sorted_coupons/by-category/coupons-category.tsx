import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './coupons-category.css';
import { useDispatch, useSelector } from 'react-redux';
import ICategory from '../../../../models/ICategory';
import { ICoupon } from '../../../../models/ICoupon';
import { AppState } from '../../../../redux/AppState';
import CouponCard from '../../../coupon/coupon-card/coupon-card';
import NavButtons from '../../../button/buttons_container/nav-buttons-container';
import { ActionType } from '../../../../redux/action-type';


export default function CouponsCategory() {

    let couponsOfCategory = useSelector((state: AppState) => state.couponsOfCategory);
    let category = useSelector((state: AppState) => state.category);
    const dispatch = useDispatch();

    let { categoryId } = useParams();
    let [pageNumber, setPageNumber] = useState(0);

    useEffect(() => {
        getCouponsByCategory();
    }, [categoryId, pageNumber]);

    useEffect(()=> {
        getCategory();
    }, [categoryId]);


    async function getCouponsByCategory() {
        try {
            let url = `http://localhost:8080/coupons/byCategoryId?categoryId=${categoryId}&pageNumber=${pageNumber}`;
            let response = await axios.get(url);
            couponsOfCategory = response.data;
            dispatch({type: ActionType.GetCouponsByCategory, payload: { couponsOfCategory }})
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    async function getCategory(){
        try{
            let url = `http://localhost:8080/categories/${categoryId}`;
            let response = await axios.get(url);
            category = response.data;
            dispatch({type: ActionType.GetCategory, payload: { category }})
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    return (
        <>
        <div className='CategoryBanner'>
            <img src={category.imageSrc} />
            <span>{category.name}</span>
        </div>
            <div className="CardsContainer">
                {couponsOfCategory.map((coupon: ICoupon) => {
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
                            categoryId={coupon.categoryId}
                            categoryName={coupon.categoryName} 
                            companyId={coupon.companyId}
                            description={''}
                            couponCode={""}
                            />)
                })}
            </div>
        </>
    );
}