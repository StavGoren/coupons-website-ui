import './coupon-card.css';
import { Link, useNavigate } from "react-router-dom";
import { ICoupon } from "../../../models/ICoupon";
import { format, parseISO } from "date-fns";
import { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import IServerErrorData from '../../../models/IServerErrorData';
import { AppState } from '../../../redux/AppState';
import ISuccessfulLoginDetails from '../../../models/ISuccessfulLoginDetails';
import { FiEdit } from 'react-icons/fi';
import EditCouponModal from '../edit_coupon_modal/edit-coupon-modal';

Modal.setAppElement('#root');
export default function CouponCard(props: ICoupon) {

    let [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    let [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);

    let isUserAuthorized = (registeredUser: ISuccessfulLoginDetails) => {
        if (isUserLoggedIn) {
            if (registeredUser.userType == "Company" && registeredUser.companyId == props.companyId) {
                return true;
            }
            if (registeredUser.userType == "Admin") {
                return true;
            }
        }
    }

    function showCouponPage(coupon: ICoupon) {
        navigate("/coupon/" + coupon.id);
    }

    function navigateToCouponPurchase() {
        if (isUserLoggedIn && loggedUser.userType == "Customer") {
            navigate("/purchase/" + props.id);
            dispatch({ type: ActionType.Buy, payload: { purchasedCoupon: props } })
        } else {
            alert("Please login");
        }
    }

    function closeEditModal() {
        setEditModalIsOpen(false);
    }

    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
    }

    return (
        <div className="Card" >

            {isUserAuthorized(loggedUser) && <FiEdit className='EditIcon' onClick={() => setEditModalIsOpen(true)} />}

            <img src={props.imageSrc} onClick={() => showCouponPage(props)} />

            <div className='DetailsContainer'>
                <p className='CardTitle' onClick={() => showCouponPage(props)}>{props.name}</p>
                <div className="PriceAndDateWrapper">
                    <span>From {new Date(props.startDate).toLocaleDateString()}<br />
                        To {new Date(props.endDate).toLocaleDateString()}</span>
                    <span className="PriceWrapper"><span className="Price">{props.priceInNis}₪</span><br />
                        {props.unitsInStock} units in stock</span>
                </div>
                <div className='ButtonsContainer'>
                    <button className="Button Primary" onClick={navigateToCouponPurchase} >
                        Buy now
                    </button>

                    <button className="Button Secondary" onClick={() => showCouponPage(props)}>More info</button>
                </div>

            </div>

            <Modal
                className='Modal'
                isOpen={editModalIsOpen}
                contentLabel='EditCouponModal'
            >
                <EditCouponModal coupon={props} closeEditCoupon={() => closeEditModal()} />

            </Modal>

            {/* <Modal
                className='DeleteModal'
                isOpen={deleteModalIsOpen}
                contentLabel='DeleteCouponModal'
            >
                <h2>Are you sure you want do remove '{props.couponName}' from the website?</h2>
                <div className='ButtonsContainer'>
                    <button onClick={() => deleteCoupon(props.couponId)}>Delete</button>
                    <button onClick={closeDeleteModal}>Cancel</button>
                </div>

            </Modal> */}
        </div>
    );
}

export { };

// onClick={() => showCouponPage(props)}