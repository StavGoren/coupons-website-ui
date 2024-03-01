import React, { useEffect, useState } from 'react';
import Header from "../header/Header";
import { Route, Router, Routes } from "react-router-dom";
import Home from "../home/home";
import Login from "../login/Login";
import Register from "../register/Register";
import CategoriesPage from "../category/categories-page/categories-page";
import CompaniesPage from "../company/companies_page/companies-page";
import AfterLogin from '../account_access/after_login/after-login';
import AllPurchases from '../tables/purchases_table/purchases-table';
import PurchasesOfCustomer from '../purchase/purchases_of_customer/purchases-of-customer';
import AllCouponsPage from '../coupon/all_coupons_page/all-coupons-page';
import CouponPage from '../coupon/coupon-details/coupon-page';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ISuccessfulLoginDetails from '../../models/ISuccessfulLoginDetails';
import { ActionType } from '../../redux/action-type';
import jwt_decode from "jwt-decode";
import './layout.css';
import ICategory from '../../models/ICategory';
import { AppState } from '../../redux/AppState';
import UsersPage from '../users/users-page';
import CouponsCategory from '../coupon/sorted_coupons/by-category/coupons-category';
import CouponsCompany from '../coupon/sorted_coupons/by-company/coupons-company';
import CustomersTable from '../customers/customers_table/customers-table';
import Checkout from '../purchase/checkout/Checkout';
import ICompany from '../../models/ICompany';
import { ICoupon } from '../../models/ICoupon';
import SearchResults from '../search_results/search-results';
import UserInfo from '../users/user_info/user-info';
import CustomerInfo from '../customers/customer_info/customer-info';
import Footer from '../footer/Footer';

export default function Layout() {

    let fullCategoriesArray: ICategory[] = useSelector((state: AppState) => state.categories);
    let fullCompaniesArray: ICompany[] = useSelector((state: AppState) => state.companies);
    let isLoggedIn = useSelector((state:AppState) => state.isUserLoggedIn);


    const dispatch = useDispatch();

    useEffect(() => {
        const userToken = localStorage.getItem('strToken');
        if (userToken) {
            let decodedToken: any = jwt_decode(userToken);
            // let userName = localStorage.getItem('userName');
            let successfulLoginResponse: ISuccessfulLoginDetails = JSON.parse(decodedToken.sub);
            // console.log(successfulLoginResponse);
            dispatch({ type: ActionType.SetUserLogin, payload: { isLoggedIn: true } });
            dispatch({ type: ActionType.SaveLoginData, payload: { successfulLoginData: successfulLoginResponse } });
            axios.defaults.headers.common["Authorization"] = userToken;
            // dispatch({ type: ActionType.SaveUserName, payload: { userName } })
        }
    });

    useEffect(() => {
        getAllCategories();
    }, []);

    useEffect(() => {
        getAllCompanies();
    }, []);

    useEffect(() => {
        getAllCoupons();
    }, [])

    async function getAllCoupons() {
        try {
            let url = `http://localhost:8080/coupons`;
            let response = await axios.get(url);
            let fullCouponsArray = response.data;
            dispatch({ type: ActionType.GetAllCoupons, payload: { fullCouponsArray } });
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    async function getAllCompanies() {
        try {
            let url = `http://localhost:8080/companies`;
            let response = await axios.get(url);
            fullCompaniesArray = response.data;
            dispatch({ type: ActionType.GetAllCompanies, payload: { fullCompaniesArray } });
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.data.response.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    async function getAllCategories() {
        try {
            let url = `http://localhost:8080/categories`;
            let response = await axios.get(url);
            fullCategoriesArray = response.data;
            dispatch({ type: ActionType.GetAllCategories, payload: { fullCategoriesArray } });
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong , Try  later");
            }
        }
    }

    return (
        <div className="Layout">
            <header>
                <Header />
            </header>

            {/* <menu>
                <Routes>

                </Routes>
            </menu> */}

            <main>
                <div className="Container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/coupon/:id" element={<CouponPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                        <Route path="/companies" element={<CompaniesPage />} />
                        <Route path="/purchases" element={<AllPurchases />} />
                        <Route path="/coupons" element={<AllCouponsPage />} />
                        <Route path="/coupons/category/:categoryId" element={<CouponsCategory />} />
                        <Route path="/coupons/company/:companyId" element={<CouponsCompany />} />
                        {/* <Route path="/user/:id" element={<AfterLogin />} /> */}
                        {/* <Route path="/customers" element={<CustomersTable />} /> */}
                        <Route path="/customer/:id" element={<CustomerInfo />} />
                        <Route path="/user/:id" element={<UserInfo />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/purchase/:couponId" element={<Checkout />} />
                        <Route path="/purchases/:customerId" element={<PurchasesOfCustomer />} />
                        <Route path='/searchresults' element={<SearchResults />} />
                    </Routes>
                </div>
            </main>

            <footer className='Footer'>
                <Footer />
            </footer>
        </div>
    );
}


// let coupons: ICoupon[] = [{
//     name: "Earphones",
//     priceInNis: 70,
//     description: "Buy brand new earphones",
//     startDate: "25-5-2023",
//     endDate: "15-6-2023",
//     couponNumber: "52KSGS",
//     categoryName: "Electronics",
//     imageSrc: "https://www.energysistem.com/cdnassets/products/45291/principal_2000.jpg",
//     id: 1
// },
// {
//     name: "Queen Concert",
//     priceInNis: 50,
//     description: "See queen performing live with Adam Lambert!",
//     startDate: "30-5-2023",
//     endDate: "20-6-2023",
//     couponNumber: "LKAB9435",
//     categoryName: "Entertainment",
//     imageSrc: "https://i.ytimg.com/vi/cXAA96WJ8nA/maxresdefault.jpg",
//     id: new Date().getTime()
// }];





// function createCoupon(coupon: Coupon) {
//     const [id, setId] = useState(0);
//     const [name, setName] = useState("");
//     const [priceInNis, setPriceInNis] = useState(0);
//     const [description, setDescription] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");
//     const [couponNumber, setCouponNumber] = useState("");
//     const [imageSrc, setImageSrc] = useState("");

//     coupon = { id, name, priceInNis, description, startDate, endDate, couponNumber, imageSrc }
// }