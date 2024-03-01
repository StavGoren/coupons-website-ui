import axios from "axios";
import { useDispatch } from "react-redux";
import { ActionType } from "../../../redux/action-type";
import { useState } from "react";
import ICategory from "../../../models/ICategory";
import Modal from 'react-modal';
import './edit-category-modal.css';
import { FiEdit } from 'react-icons/fi';
import { VscSave } from 'react-icons/vsc';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useParams } from "react-router-dom";
import Form from "../../form/Form";
import Button from "../../button/Button";

interface IEditCategoryModal {
    category: ICategory,
    closeEditModal(): void;
}

Modal.setAppElement('#root');
export default function EditCategoryModal(props: IEditCategoryModal) {

    const id = props.category.id;
    let [name, setName] = useState(props.category.name);
    let [imageSrc, setImageSrc] = useState(props.category.imageSrc);

    const dispatch = useDispatch();
    let { deletedCategoryId } = useParams();

    let [confirmChangesIsOpen, setConfirmChangesIsOpen] = useState(false);
    let [declineModalIsOpen, setDeclineModalIsOpen] = useState(false);
    let [confirmDeleteIsOpen, setConfirmDeleteIsOpen] = useState(false);

    function openConfirmChanges() {
        setConfirmChangesIsOpen(true);
    }

    function openConfirmDelete() {
        setConfirmDeleteIsOpen(true);
    }

    async function updateCategory() {
        try {
            const response = await axios.put(`http://localhost:8080/categories`, { id, name, imageSrc });
            dispatch({ type: ActionType.EditCategory, payload: { response } });
            props.closeEditModal();
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }


    async function deletCategory(categoryId: number) {
        try {
            let url = `http://localhost:8080/categories/${categoryId}`;
            let response = await axios.delete(url);
            dispatch({ type: ActionType.DeleteCategory, payload: { categoryId: response.data } });
            props.closeEditModal();
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Oopsi daisy... something went wrong");
            }
        }
    }


    return (
        <>
            <div className="CardTitle">
                Edit Category
            </div>
            <Form>
                <input type='text' value={name} onChange={event => setName(event.target.value)} />
                <input type='text' value={imageSrc} onChange={event => setImageSrc(event.target.value)} />
            </Form>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={openConfirmChanges}>Save</button>
                    <button className="Button Secondary" onClick={() => setDeclineModalIsOpen(true)}>Decline</button>
                    <Button level="Danger" onClick={() => openConfirmDelete()} >Delete</Button>
                </div>
            <Modal
                className='Modal'
                isOpen={confirmChangesIsOpen}
                contentLabel='ConfirmChangesModal'
            >
                <div className="CardTitle">Are you sure you want to precede?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => updateCategory()}>Yes</button>
                    <button className="Button Secondary" onClick={() => setConfirmChangesIsOpen(false)}>No</button>
                </div>
            </Modal>
            <Modal
                className="Modal"
                isOpen={declineModalIsOpen}
                contentLabel="DeclineModal"
            >
                <div className="CardTitle">All changes will be lost, are you sure you want to cancel?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => props.closeEditModal()}>Yes</button>
                    <button className="Button Secondary" onClick={() => setDeclineModalIsOpen(false)}>No</button>
                </div>
            </Modal>
            <Modal
                className='Modal'
                isOpen={confirmDeleteIsOpen}
                contentLabel="ConfirmDeleteModal">
                <div className="CardTitle">Deleting category '{props.category.name}' will also delete all it's coupons, this can't be undone. Are you sure you want to continue?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => deletCategory(props.category.id)}>Yes</button>
                    <button className="Button Secondary" onClick={() => setConfirmDeleteIsOpen(false)}>No</button>
                </div>
            </Modal>
        </>
    )
}