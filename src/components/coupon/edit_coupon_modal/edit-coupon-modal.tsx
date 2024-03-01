import { useState } from "react";
import { ICoupon } from "../../../models/ICoupon";
import Modal from 'react-modal';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import axios from "axios";
import { ActionType } from "../../../redux/action-type";
import { FiEdit } from "react-icons/fi";
import { LuSave } from 'react-icons/lu'
import { RiDeleteBin6Line } from "react-icons/ri";
import Form from "../../form/Form";

interface IEditCoupon {
    coupon: ICoupon;
    closeEditCoupon(): void;
}

Modal.setAppElement('#root');
export default function EditCouponModal(props: IEditCoupon) {

    // let categoriesArray = useSelector((state: AppState) => state.categoriesByPage);
    let categoriesArray = useSelector((state: AppState) => state.categories)
    let categoryOfCoupon = useSelector((state: AppState) => state.category);

    let [name, setName] = useState(props.coupon.name);
    let [priceInNis, setPriceInNis] = useState(props.coupon.priceInNis);
    let [description, setDescription] = useState(props.coupon.description);
    let [startDate, setStartDate] = useState(props.coupon.startDate);
    let [endDate, setEndDate] = useState(props.coupon.endDate);
    let [couponCode, setCouponCode] = useState(props.coupon.couponCode)
    let [unitsInStock, setUnitsInStock] = useState(props.coupon.unitsInStock);
    let [imageSrc, setImageSrc] = useState(props.coupon.imageSrc);
    let [categoryId, setCategoryId] = useState(props.coupon.categoryId);
    let [categoryName, setCategoryName] = useState(props.coupon.categoryName);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);

    const dispatch = useDispatch();

    let [isEditing, setIsEditing] = useState(false);
    let [confirmMofalIsOpen, setConfirmMofalIsOpen] = useState(false);
    let [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);
    let [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

    function handleIsEditing() {
        setIsEditing(!isEditing);
    }

    function closeComfirmModal() {
        setConfirmMofalIsOpen(false);
    }

    function closeDiscardModal() {
        setDiscardModalIsOpen(false);
    }

    function closeDeleteModal() {
        setDeleteModalIsOpen(false);
    }

    async function deleteCoupon(couponId: number) {
        if (loggedUser.userId) {
            try {
                let url = `http://localhost:8080/coupons/${couponId}`;
                let response = await axios.delete(url);
                dispatch({ type: ActionType.DeleteCoupon, payload: { couponId } });
                props.closeEditCoupon();
            } catch (e: any) {
                if (e.response?.data?.message) {
                    alert(e.response.data.message);
                } else {
                    console.log(e);
                    alert("Something went wrong, please try again later");
                }
            }
        }
    }

    async function updateCoupon() {
        console.log(props.coupon.id,);
        
        if (loggedUser.userId) {
            try {
                const response = await axios.put(`http://localhost:8080/coupons`, {
                    id: props.coupon.id,
                    name,
                    priceInNis,
                    description,
                    startDate,
                    endDate,
                    couponCode,
                    unitsInStock,
                    imageSrc,
                    'category': { id: categoryId }
                });
                console.log(response.data);
                dispatch({ type: ActionType.EditCoupon, payload: { coupon: response.data } })
                props.closeEditCoupon();
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert((e.response.data.errorMessage));
                } else {
                    alert("Something went wrong, try again later");
                }
            }
        }
    }

    function chageCategory(categoryName: string) {
        let chosenCategory = categoriesArray.find((category) => category.name == categoryName);
        if (chosenCategory) {
            setCategoryId(chosenCategory.id);
        }
    }

    return (
        <>
            <div className="CardTitle">
                Edit coupon
            </div>
            <Form>
                <input type='text' value={name} onChange={event => setName(event.target.value)} />
                <input type='number' value={priceInNis} onChange={event => setPriceInNis(+event.target.value)} />
                <input type='text' value={description} onChange={event => setDescription(event.target.value)} />
                <input type='date' value={new Date(startDate).toISOString().split('T')[0]} onChange={event => setStartDate(event.target.value)} />
                <input type='date' value={new Date(endDate).toISOString().split('T')[0]} onChange={event => setEndDate(event.target.value)} />
                <input type='text' value={couponCode} onChange={event => setCouponCode(event.target.value)} />
                <input type='number' value={unitsInStock} onChange={event => setUnitsInStock(+event.target.value)} />
                <input type='text' value={imageSrc} onChange={event => setImageSrc(event.target.value)} />
                <select defaultValue={categoryName} onChange={(event) => chageCategory(props.coupon.categoryName)}>
                    {categoriesArray.map((category) =>
                        <option value={category.name}>{category.name}</option>)}
                </select>
            </Form>
            <div className="ButtonsContainer">
                <button className='Button Primary' onClick={() => setConfirmMofalIsOpen(true)}>Save</button>
                <button className='Button Secondary' onClick={() => setDiscardModalIsOpen(true)}>Discard</button>
                <button className="Button Danger" onClick={() => setDeleteModalIsOpen(true)}>Delete</button>
            </div>


            <Modal
                className='Modal'
                isOpen={confirmMofalIsOpen}
                contentLabel="ConfirmModal"
            >
                <div className="CardTitle">Confirm changes?</div>
                <div className="ButtonsContainer">
                    <button className='Button Primary' onClick={updateCoupon}>Yes</button>
                    <button className='Button Secondary' onClick={closeComfirmModal}>No</button>
                </div>
            </Modal>
            <Modal
                className='Modal'
                isOpen={discardModalIsOpen}
                contentLabel="DiscardModal"
            >
                <div className="CardTitle">Any changes made will be lost. Are you sure you want to continue?</div>
                <div className="ButtonsContainer">
                    <button className='Button Primary' onClick={() => props.closeEditCoupon()}>Yes</button>
                    <button className='Button Secondary' onClick={closeDiscardModal}>No</button>
                </div>
            </Modal>

            <Modal
                className='Modal'
                isOpen={deleteModalIsOpen}
                contentLabel="DeleteCouponModal"
            >
                <div className="CardTitle">Are you sure you want do permanently delete '{props.coupon.name}'?</div>
                <div className="ButtonsContainer">
                    <button className='Button Primary' onClick={() => deleteCoupon(props.coupon.id)}>Yes</button>
                    <button className='Button Secondary' onClick={() => setDeleteModalIsOpen(false)}>No</button>
                </div>
            </Modal>
        </>
    );
}