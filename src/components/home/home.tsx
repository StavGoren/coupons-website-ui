import React, { useEffect } from 'react';
import CategoriesContainer from '../category/categories_container/categories-container';
import CompaniesContainer from '../company/companies_container/companies-container';
import CouponsContainer from '../coupon/coupons_container/coupons-container';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function Home() {
    const navigate = useNavigate();

    function navigateToCouponsPage() {
        navigate('/coupons');
    }

    function navigateToCompaniesPage() {
        navigate('/companies');
    }

    function navigateToCategoriesPage() {
        navigate("/categories")
    }

    return (
        <>

            <div className="CardsWithTitleContainer">
                <div className='Title WithButton'>
                    <>Coupons</> <button className='SeeAll' onClick={() => navigateToCouponsPage()}>See all</button>
                </div>
                <CouponsContainer />
            </div>

            <div className="CardsWithTitleContainer">
                <div className='Title WithButton'>
                    <>Companies</> <button className='SeeAll' onClick={() => navigateToCompaniesPage()}>See all</button>
                </div>
                <CompaniesContainer />
            </div>

            <div className="CardsWithTitleContainer">
                <div className='Title WithButton'>
                    <>Categories</> <button className='SeeAll' onClick={() => navigateToCategoriesPage()}>See all</button>
                </div>
                <CategoriesContainer />
            </div>


        </>
    );
}
