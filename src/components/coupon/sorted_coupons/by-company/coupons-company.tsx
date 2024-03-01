import React from 'react';
import { useEffect, useState } from "react";
import { ICoupon } from "../../../../models/ICoupon";
import { useParams } from "react-router-dom";
import axios from "axios";
import CouponCard from '../../../coupon/coupon-card/coupon-card';
import ICompany from '../../../../models/ICompany';
import './coupons-company.css';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { HiLocationMarker } from 'react-icons/hi';

export default function CouponsCompany() {

    let [couponsOfCompany, setCouponsOfCompany] = useState<ICoupon[]>([]);
    let [pageNumber, setPageNumber] = useState(0);
    let [company, setCompany] = useState<ICompany>();
    let { companyId } = useParams();

    useEffect(() => {
        getCouponsByCompany();
    }, [companyId, pageNumber]);


    useEffect(() => {
        getCompany();
    }, [companyId]);

    async function getCompany() {
        try {
            let url = `http://localhost:8080/companies/${companyId}`;
            let response = await axios.get(url);
            setCompany(response.data);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                console.log(e);
                alert(e.response.data.errorMessage);
            }
        }
    }

    async function getCouponsByCompany() {
        try {
            let url = `http://localhost:8080/coupons/byCompany?companyId=${companyId}&pageNumber=${pageNumber}`;
            let response = await axios.get(url);
            setCouponsOfCompany(response.data);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                console.log(e);
                alert(e.response.data.errorMessage);
            }
        }
    }


    return (
        <>
            <div className="EntityBanner">
                <img className='CompanyImage' src={company?.imageSrc} />
                <div className='EntityDetails'>
                    <span className='EntityDetail'><BsFillTelephoneFill /> {company?.phoneNumber}</span>
                    <span className='EntityDetail'><HiLocationMarker /> {company?.address}</span>

                </div>

                {/* <div className='NavButtons'>
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber - 1)} value="<" />
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber + 1)} value=">" />
            </div> */}
            </div>
            <div className="CardsContainer">
                {couponsOfCompany.map((coupon: ICoupon) => {
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
                            couponCode={""} />)
                })}
            </div>
        </>
    );

}