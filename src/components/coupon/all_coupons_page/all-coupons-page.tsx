import { useEffect, useState } from "react";
import axios from "axios";
import CouponCard from "../../coupon/coupon-card/coupon-card";
import { AppState } from "../../../redux/AppState";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import ICategory from "../../../models/ICategory";
import CouponsContainer from "../coupons_container/coupons-container";
import './all-coupons-page.css';
import { ActionType } from "../../../redux/action-type";
import { create } from "domain";
import CreateCouponModal from "../create_coupon_modal/create-coupon-modal";
import { ICoupon } from "../../../models/ICoupon";
import { stat } from "fs";

Modal.setAppElement('#root');

export default function AllCouponsPage() {

    // let [couponsArray, setCouponsArray] = useState<ICoupon[]>([]);
    let couponsArray = useSelector((state: AppState) => state.allCouponCards);
    let loggedUser = useSelector((state: AppState)=> state.successfulLoginDetails);
    const dispatch = useDispatch();

    let [pageNumber, setPageNumber] = useState(0);
    // let [categoriesArray, setCategoriesArray] = useState<ICategory[]>([]);

    let [createModalIsOpen, setCreateModalIsOpen] = useState(false);

    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);

    function openCreateModal() {
        setCreateModalIsOpen(true);
    }

    function closeCreateModal() {
        setCreateModalIsOpen(false);
    }

    // useEffect(() => {
    //     getAllCategories();
    // }, [])




    // async function getAllCategories() {
    //     try {
    //         let url = `http://localhost:8080/categories/byPage?pageNumber=${pageNumber}`;
    //         let response = await axios.get(url);
    //         setCategoriesArray(response.data);
    //     } catch (e: any) {
    //         if (e.response?.data?.errorMessage) {
    //             alert(e.response.data.errorMessage);
    //         } else {
    //             alert("Something went wrong, Try again later");
    //         }
    //     }
    // }


    return (
        <>
            <div className="CardsContainer">
                {/* <CouponsContainer /> */}

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
                        />
                    )
                })}
                {isUserLoggedIn && registeredUser.userType == "Company" && (
                    <button className="Card Add" onClick={openCreateModal}>+</button>
                )}
                <Modal
                    className="Modal"
                    isOpen={createModalIsOpen}
                    onAfterOpen={openCreateModal}
                    contentLabel='CreateCoupon'
                >
                    <CreateCouponModal closeCreateModal={closeCreateModal} />
                </Modal>
            </div>
        </>
    );
}