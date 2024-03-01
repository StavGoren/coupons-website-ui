import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './company-card.css';
import ICompany from '../../../models/ICompany';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import Modal from 'react-modal';
import { AppState } from '../../../redux/AppState';
import { FiEdit } from 'react-icons/fi';
import EditCompanyModal from '../edit_company_modal/edit-company-modal';

Modal.setAppElement('#root');


export default function CompanyCard(props: ICompany) {

    const navigate = useNavigate();

    let [modalIsOpen, setModalIsOpen] = useState(false);
    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);

    function showCompanyCoupons(company: ICompany) {
        navigate("/coupons/company/" + company.id);
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }


    return (
        <div className="Card">
            {isUserLoggedIn && (registeredUser.userType == "Admin" || registeredUser.companyId == props.id) && <FiEdit  className='EditIcon' onClick={openModal}/>}

            <img src={props.imageSrc} onClick={() => showCompanyCoupons(props)} />
            <div className='CompanyName' onClick={() => showCompanyCoupons(props)}>
            </div>

            <Modal
                className="Modal"
                isOpen={modalIsOpen}
                contentLabel="EditCompanyModal"
            >
                <EditCompanyModal company={props} closeEditModal={closeModal} />

            </Modal>
        </div>
    );
}
