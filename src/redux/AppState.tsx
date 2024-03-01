import { useNavigate } from "react-router-dom";
import LoginAndRegister from "../components/account_access/login_and_register/login-and-register";
import ICategory from "../models/ICategory";
import ICompany from "../models/ICompany";
import { ICoupon } from "../models/ICoupon";
import ICustomer from "../models/ICustomer";
import IPurchase from "../models/IPurchase";
import ISuccessfulLoginDetails from "../models/ISuccessfulLoginDetails";
import { IUser } from "../models/IUser";
import { useDispatch } from "react-redux";
import { ActionType } from "./action-type";

export class AppState {

    public successfulLoginDetails: ISuccessfulLoginDetails = {
        userId: 0,
        userName: "",
        companyId: 0,
        userType: ""
    };

    public isUserLoggedIn: boolean = false;

    public usersArray: IUser[] = [];

    public user: IUser = {
        id: 0,
        userName: "",
        userType: "",
        companyName: ""
    };

    public customersArray: ICustomer[] = [];

    public customer: ICustomer = {
        id: 0,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        userName: "",
        address: ""
    };

    public categoriesByPage: ICategory[] = [];

    public categories: ICategory[] = [];

    public category: ICategory = {
        id: 0,
        name: "",
        imageSrc: ""
    };

    public companies: ICompany[] = [];

    public companiesByPage: ICompany[] = [];

    public company: ICompany = {
        id: 0,
        name: "",
        phoneNumber: "",
        address: "",
        imageSrc: ""
    };

    public allCouponCards: ICoupon[] = [];

    public couponsByPage: ICoupon[] = [];

    public couponsOfCategory: ICoupon[] = [];

    public coupon: ICoupon = {
        id: 0,
        name: "",
        priceInNis: 0,
        description: "",
        startDate: "",
        endDate: "",
        categoryId: 0,
        categoryName: "",
        companyId: 0,
        unitsInStock: 0,
        couponCode: "",
        imageSrc: ""
    };

    // public combinedArray: (ICategory | ICompany | ICoupon)[] = [];

    // public filterredCombinedArray: (ICategory | ICompany | ICoupon)[] = [];

    public filterredCategoriesArray: ICategory[] = [];

    public filterredCompaniesArray: ICompany[] = [];

    public filterredCouponsArray: ICoupon[] = [];

    public purchase: IPurchase = {
        purchaseId: 0,
        amount: 0,
        date: "",
        customerId: 0,
        couponId: 0,
        categoryId: 0,
        companyId: 0
    };

    public token: string = '';

    public purchases: IPurchase[] = [];

    public customerPurchases: IPurchase[] = [];

    public accountAccess = <LoginAndRegister />;

    public subtext: string = "";

    public searchText: string = "";

    public purchasedCoupon = 0;

    public cart: ICoupon[] = [];

    // public navigateToCouponPurchase = (isUserLoggedIn: boolean, userType: string, coupon: ICoupon) => {
    //     const navigate = useNavigate();
    //     let dispatch = useDispatch();

    //     if (isUserLoggedIn && userType == "Customer") {
    //         navigate("/purchase/" + coupon.id);
    //         dispatch({ type: ActionType.Buy, payload: { purchasedCoupon: coupon } })
    //     } else {
    //         alert("Please login");
    //     }
    // }
}