import { IAction } from "./IAction";
import { ActionType } from "./action-type";
import { AppState } from "./AppState";
import ICategory from "../models/ICategory";
import { ICoupon } from "../models/ICoupon";


let initialAppState = new AppState();
export function reduce(oldAppState: AppState = initialAppState, action: IAction): AppState {
    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.GetCategoriesByPage:
            newAppState.categoriesByPage = action.payload.categoriesArray;

            break;

        case ActionType.GetAllCategories:
            newAppState.categories = action.payload.fullCategoriesArray;

            break;

        case ActionType.GetCouponsByPage:
            newAppState.couponsByPage = action.payload.couponsArray;

            break;

        case ActionType.GetAllCoupons:
            newAppState.allCouponCards = action.payload.fullCouponsArray;

            break;

        case ActionType.GetCouponsByCategory:
            newAppState.couponsOfCategory = action.payload.couponsOfCategory;

            break;

        case ActionType.GetCompaniesByPage:
            newAppState.companiesByPage = action.payload.companiesArray;

            break;

        case ActionType.GetAllCompanies:
            newAppState.companies = action.payload.fullCompaniesArray;

            break;

        case ActionType.GetCustomer:
            newAppState.customer = action.payload.customer;

            break;

        case ActionType.Search:
            newAppState.searchText = action.payload.searchValue;
            let testSearchValue = newAppState.searchText.trim();
            
            if (testSearchValue) {
                newAppState.filterredCategoriesArray = newAppState.categories.filter((category) => category.name.toLocaleLowerCase().includes(testSearchValue.toLocaleLowerCase()));
                newAppState.filterredCompaniesArray = newAppState.companies.filter((company) => company.name.toLocaleLowerCase().includes(testSearchValue.toLocaleLowerCase()));
                newAppState.filterredCouponsArray = newAppState.allCouponCards.filter((coupon) => coupon.name.toLocaleLowerCase().includes(testSearchValue.toLocaleLowerCase()));
            } 
            else {
                newAppState.filterredCategoriesArray = [];
                newAppState.filterredCompaniesArray = [];
                newAppState.filterredCouponsArray = [];
            }

            break;

        case ActionType.GetAllPurchases:
            newAppState.purchases = action.payload.purchasesArray;
            
            break;


        case ActionType.GetPurchasesByCustomer:
            newAppState.customerPurchases = action.payload.purchasesOfCustomer;

            break;

        case ActionType.DeleteCategory:
            
            let deletedCategoryId = action.payload.categoryId;
            let updatedCategoriesArray = newAppState.categoriesByPage.filter((category) => category.id != deletedCategoryId);
            newAppState.categoriesByPage = updatedCategoriesArray;

            break;

        case ActionType.DeleteCompany:
            let deletedCompanyId = action.payload.companyId;
            let updatedCompaniesArray = newAppState.companiesByPage.filter((company) => company.id != deletedCompanyId);
            newAppState.companiesByPage = updatedCompaniesArray;

            break;

        case ActionType.SaveToken:
            newAppState.token = action.payload.token;
            break;

        case ActionType.SaveLoginData:
            newAppState.successfulLoginDetails = action.payload.successfulLoginData;

            break;

        case ActionType.SetUserLogin:
            newAppState.isUserLoggedIn = action.payload.isLoggedIn;
            break;

        case ActionType.SaveUserName:
            newAppState.user.userName = action.payload.userName;
            break;

        case ActionType.SaveCategory:
            let newCategory = action.payload.category;
            newAppState.categoriesByPage.push(newCategory);

            break;

        case ActionType.SaveCompany:
            let newCompany = action.payload.company;
            newAppState.companiesByPage.push(newCompany);

            break;

        case ActionType.SaveCoupon:
            let newCoupon = action.payload.coupon;
            newAppState.couponsByPage.push(newCoupon);

            break;
        
        case ActionType.SavePurchase:
            let newPurchase = action.payload.purchase;
            newAppState.purchases.push(newPurchase);

            break;

        case ActionType.EditCategory:
            let updatedCategory = action.payload.category;
            newAppState.category = updatedCategory;

            break;


        case ActionType.EditCoupon:
            newAppState.coupon = action.payload.coupon;

            break;

        case ActionType.GetCategory:
            newAppState.category = action.payload.category;
            break;

        case ActionType.GetCoupon:
            newAppState.coupon = action.payload.coupon;
            break;

        case ActionType.GetUser:
            newAppState.user = action.payload.user;
            break;

        case ActionType.SaveSubText:
            newAppState.subtext = action.payload.subtext;
            break;

        case ActionType.Buy:
            newAppState.coupon = action.payload.purchasedCoupon;
            
            break;
    }
    return newAppState;
}