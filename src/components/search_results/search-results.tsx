import { useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import { Category } from "@mui/icons-material";
import ICategory from "../../models/ICategory";
import CategoryCard from "../category/category-card/category-card";
import ICompany from "../../models/ICompany";
import CompanyCard from "../company/company-card/company-card";
import { ICoupon } from "../../models/ICoupon";
import CouponCard from "../coupon/coupon-card/coupon-card";
import './search-results.css';
import CategoriesContainer from "../category/categories_container/categories-container";

export default function SearchResults() {
    let filterredCategoriesArray = useSelector((state: AppState) => state.filterredCategoriesArray);
    let filterredCompaniesArray = useSelector((state: AppState) => state.filterredCompaniesArray);
    let filterredCouponsArray = useSelector((state: AppState) => state.filterredCouponsArray);

    let searchValue = useSelector((state: AppState) => state.searchText);
    console.log(filterredCategoriesArray);
    console.log(filterredCompaniesArray);
    console.log(filterredCouponsArray);
    console.log("searchValue: " + searchValue);



    return (
        <>
            {!searchValue && <h2>No results found...</h2>}

            {/* {filterredCategoriesArray.length > 0 && <h2>Categories ({filterredCategoriesArray.length})</h2>} */}
            {filterredCategoriesArray.length > 0 && (
                <div className="CardsWithTitleContainer">
                    <div className='Title WithCount'>
                        <>Categories</> <span className="ResultCount">{filterredCategoriesArray.length}</span>
                    </div>
                    <div className="CardsContainer">
                        {filterredCategoriesArray.map((category: ICategory) => {
                            return (
                                <CategoryCard key={category.id}
                                    id={category.id}
                                    imageSrc={category.imageSrc}
                                    name={category.name}
                                />
                            )
                        }
                        )}
                    </div>
                </div>)}

            {filterredCompaniesArray.length > 0 && (
                <div className="CardsWithTitleContainer">
                    <div className='Title WithCount'>
                        <>Companies</> <span className="ResultCount">{filterredCompaniesArray.length}</span>
                    </div>
                    <div className="CardsContainer Companies">
                        {filterredCompaniesArray.map((company: ICompany) => {
                            return (
                                <CompanyCard key={company.id}
                                    id={company.id}
                                    imageSrc={company.imageSrc}
                                    name={company.name}
                                    phoneNumber={""}
                                    address={""} />
                            ) }
                        )}
                    </div>
                </div>)}

            {filterredCouponsArray.length > 0 && (
                <div className="CardsWithTitleContainer">
                    <div className='Title WithCount'>
                        <>Coupons</> <span className="ResultCount">{filterredCouponsArray.length}</span>
                    </div>
                    <div className="CardsContainer">
                        {filterredCouponsArray.map((coupon: ICoupon) => {
                            return (
                                <CouponCard key={coupon.id}
                                id={coupon.id}
                                name={coupon.name}
                                priceInNis={coupon.priceInNis}
                                description={""}
                                startDate={coupon.startDate}
                                endDate={coupon.endDate}
                                unitsInStock={coupon.unitsInStock}
                                imageSrc={coupon.imageSrc}
                                categoryId={coupon.categoryId}
                                categoryName={""}
                                companyId={coupon.companyId}
                                couponCode={""}
                            />)
                        }
                        )}
                    </div>
                </div>)}



            {/* {filterredCompaniesArray.length > 0 && <h2>Companies ({filterredCompaniesArray.length})</h2>}
            <div className="CardsContainer">
                {filterredCompaniesArray.map((company: ICompany) => {
                    return (
                        <CompanyCard key={company.id}
                            id={company.id}
                            imageSrc={company.imageSrc}
                            name={company.name}
                            phoneNumber={""}
                            address={""} />
                    )
                }
                )}
            </div>

            {filterredCouponsArray.length > 0 && <h2>Coupons ({filterredCouponsArray.length})</h2>}
            <div className="CardsContainer">
                {filterredCouponsArray.map((coupon: ICoupon) => {
                    return (
                        <CouponCard key={coupon.id}
                            id={coupon.id}
                            name={coupon.name}
                            priceInNis={coupon.priceInNis}
                            description={""}
                            startDate={coupon.startDate}
                            endDate={coupon.endDate}
                            unitsInStock={coupon.unitsInStock}
                            imageSrc={coupon.imageSrc}
                            categoryId={coupon.categoryId}
                            categoryName={""}
                            companyId={coupon.companyId}
                        />)
                }
                )}
            </div> */}
        </>
    )
};