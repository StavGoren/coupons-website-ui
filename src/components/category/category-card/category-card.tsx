import React, { useState } from 'react';
import "./category-card.css";
import { useNavigate, useParams } from "react-router-dom";
import ICategory from '../../../models/ICategory';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import axios from 'axios';
import Modal from 'react-modal';
import { IUser } from '../../../models/IUser';
import { AppState } from '../../../redux/AppState';
import EditCategoryModal from '../edit_category_modal/edit-category-modal';
import { FiEdit } from 'react-icons/fi';

Modal.setAppElement("#root");

export default function CategoryCard(props: ICategory) {
    

    const navigate = useNavigate();

    let [editModalIsOpen, setEditModalIsOpen] = useState(false);
    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
    let dispatch = useDispatch();

    function openEditModal() {
        setEditModalIsOpen(true);
    }

    function closeEditModal() {
        setEditModalIsOpen(false);
    }

    function showCategoryCoupons(category: ICategory) {
        navigate("/coupons/category/" + category.id);
        // dispatch({type: ActionType.GetCategory, payload: { category:props }});
    }

    return (
        <div className="Card Category">
            {isUserLoggedIn && registeredUser.userType == "Admin" && <FiEdit className='EditIcon' onClick={openEditModal}/>}

            <img src={props.imageSrc} onClick={() => showCategoryCoupons(props)}/>
            <div className='DetailsContainer' onClick={() => showCategoryCoupons(props)}>
                <p className='CardTitle'>{props.name}</p>
            </div>

            <Modal
                className='Modal'
                isOpen={editModalIsOpen}
                // onAfterOpen={openEditModal}
                contentLabel='EditCategory'
            >
                <EditCategoryModal category={props} closeEditModal={() => closeEditModal()} />
            </Modal>
        </div>

    );
}