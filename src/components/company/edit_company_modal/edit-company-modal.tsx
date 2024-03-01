import { useState } from "react";
import ICompany from "../../../models/ICompany";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "../../../redux/action-type";
import { FiEdit } from "react-icons/fi";
import { VscSave } from 'react-icons/vsc';
import Modal from 'react-modal';
import { useParams } from "react-router-dom";
import './edit-company-modal.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AppState } from "../../../redux/AppState";
import Form from "../../form/Form";
import Button from "../../button/Button";

interface IEditCompanyModal {
    company: ICompany,
    closeEditModal(): void;
}

Modal.setAppElement('#root');
export default function EditCompanyModal(props: IEditCompanyModal) {

    let id = props.company.id;
    let [name, setName] = useState(props.company.name);
    let [phoneNumber, setPhoneNumber] = useState(props.company.phoneNumber);
    let [address, setAddress] = useState(props.company.address);
    let [imageSrc, setImageSrc] = useState(props.company.imageSrc);

    let [isEditing, setIsEditing] = useState(false);

    let [confirmChangesIsOpen, setConfirmChangesIsOpen] = useState(false);
    let [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);
    let [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);

    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);

    let { deletedCompanyId } = useParams();

    const dispatch = useDispatch();

    function handleEditing() {
        setIsEditing(!isEditing);
    }

    function openConfirmChanges() {
        setConfirmChangesIsOpen(true);
    }

    function openConfirmDelete() {
        setConfirmDeleteIsOpen(true);
    }

    async function updateCompany() {
        try {
            const response = await axios.put(`http://localhost:8080/companies`, { id, name, phoneNumber, address, imageSrc });
            dispatch({ type: ActionType.EditCompany, payload: { company: response } })
            props.closeEditModal();
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                console.log(e);
                alert("Something went wrong, please try again later");
            }
        }
    }


    async function removeCompany(companyId: number) {
        try {
            let url = `http://localhost:8080/companies/${companyId}`;
            let response = await axios.delete(url);
            dispatch({ type: ActionType.DeleteCompany, payload: { companyId: deletedCompanyId } });
            props.closeEditModal();
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    return (
        <>
            <div className="CardTitle">Edit company</div>

            <Form>
                <input type='text' value={name} onChange={event => setName(event.target.value)} />
                <input type='text' value={phoneNumber} onChange={event => setPhoneNumber(event.target.value)} />
                <input type='text' value={address} onChange={event => setAddress(event.target.value)} />
                <input type='text' value={imageSrc} onChange={event => setImageSrc(event.target.value)} />
            </Form>

            <div className="ButtonsContainer">
                <button className="Button Primary" onClick={openConfirmChanges}>Save</button>
                <button className="Button Secondary" onClick={() => setDiscardModalIsOpen(true)}>Discard</button>
                {registeredUser.userType == "Admin" && <Button level="Danger" onClick={() => openConfirmDelete()} >Delete</Button>}
            </div>

            <Modal
                className='Modal'
                isOpen={confirmChangesIsOpen}
                contentLabel='ConfirmChangesModal'
            >
                <div className="CardTitle">Are you sure you want to precede?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => updateCompany()}>Yes</button>
                    <button className="Button Secondary" onClick={() => setConfirmChangesIsOpen(false)}>No</button>
                </div>

            </Modal>

            <Modal
                className='Modal'
                isOpen={discardModalIsOpen}
                contentLabel="DiscardModal"
            >
                <div className="CardTitle">All changes made will be lost, are you sure you want to cancel?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => props.closeEditModal()}>Yes</button>
                    <button className="Button Secondary" onClick={() => setDiscardModalIsOpen(false)}>No</button>
                </div>
            </Modal>

            <Modal
                className='Modal'
                isOpen={confirmDeleteIsOpen}
                contentLabel="ConfirmDeleteModal">
                <div className="CardTitle">Deleting '{props.company.name}' will also delete all of it's coupons, this can't be undone. Are you sure you want to continue?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => removeCompany(props.company.id)}>Yes</button>
                    <button className="Button Secondary" onClick={() => setConfirmDeleteIsOpen(false)}>No</button>
                </div>
            </Modal>
        </>
    )
}

{/* <h2>Are you sure you want do remove '{props.name}' from the website?</h2>
                <div className='ButtonsContainer'>
                    <button onClick={() => removeCompany(props.id)}>Delete</button>
                    <button onClick={closeModal}>Cancel</button>
                </div> */}