import { useDispatch, useSelector } from "react-redux";
import { ICoupon } from "../../../models/ICoupon";
import { AppState } from "../../../redux/AppState";
import { useEffect, useState } from "react";
import axios from "axios";
import { ActionType } from "../../../redux/action-type";
import Modal from 'react-modal';
import './create-coupon-modal.css';
import ICategory from "../../../models/ICategory";
import Form from "../../form/Form";

interface ICreateCouponModal {
    // coupon: ICoupon;
    closeCreateModal(): void;
}

Modal.setAppElement('#root');
export default function CreateCouponModal(props: ICreateCouponModal) {
    const dispatch = useDispatch();
    // let categoriesArray = useSelector((state:AppState) => state.categories);

    let [categoriesArray, setCategoriesArray] = useState<ICategory[]>([]);
    let [name, setName] = useState("");
    let [priceInNis, setPriceInNis] = useState(0);
    let [description, setDescription] = useState("");
    let [startDate, setStartDate] = useState("");
    let [endDate, setEndDate] = useState("");
    let [couponCode, setCouponCode] = useState("")
    let [unitsInStock, setUnitsInStock] = useState(0);
    let [imageSrc, setImageSrc] = useState("");
    let [category, setCategory] = useState(0);
    let [categoryId, setCategoryId] = useState(0);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    console.log(loggedUser);

    let [discardModalIsOpen, setDiscardModalIsOpen] = useState(false);


    useEffect(() => {
        getAllCategories();
    }, []);

    async function getAllCategories() {
        try {
            let response = await axios.get(`http://localhost:8080/categories`);
            setCategoriesArray(response.data);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert((e.response.data.errorMessage));
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    async function createCoupon() {
        if (loggedUser.userId) {
            try {
                const response = await axios.post(`http://localhost:8080/coupons`, {
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
                dispatch({ type: ActionType.SaveCoupon, payload: { coupon: response.data } });
                props.closeCreateModal();
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert((e.response.data.errorMessage));
                } else {
                    alert("Something went wrong, try again later");
                }
            }
        }
    }


    let changeCategory = (categoryName: string) => {
        let chosenCategory = categoriesArray.find((category) => category.name == categoryName);
        if (chosenCategory) {
            setCategoryId(chosenCategory.id);

        }
    };

    return (
        <>
            <div className="CardTitle">Add Coupon</div>
            <Form>
                <input type='text' placeholder="Name" onChange={event => setName(event.target.value)} />
                <input type='text' placeholder="Price" onChange={event => setPriceInNis(+event.target.value)} />
                <input type='text' placeholder="Description" onChange={event => setDescription(event.target.value)} />
                Start <input type='date' className="StartDate" onChange={event => setStartDate(event.target.value)} />
                End <input type='date' className="EndDate" onChange={event => setEndDate(event.target.value)} />
                <input type='text' placeholder="Coupon code" onChange={event => setCouponCode(event.target.value)} />
                <input type='number' placeholder="Units in stock" onChange={event => setUnitsInStock(+event.target.value)} />
                <input type='text' placeholder="Image source" onChange={event => setImageSrc(event.target.value)} />
                <select defaultValue={category} onChange={(event) => changeCategory(event.target.value)}>
                    {categoriesArray.map((category) =>
                        <option key={category.id} value={category.name}>{category.name}</option>
                    )}
                </select>
            </Form>

            <div className='ButtonsContainer'>
                <button className="Button Primary" onClick={() => createCoupon()}>Save</button>
                <button className="Button Secondary" onClick={() => setDiscardModalIsOpen(true)}>Discard</button>
            </div>

            <Modal
                className='Modal'
                isOpen={discardModalIsOpen}
                contentLabel="DiscardModal"
            >
                <div className="CardTitle">All changes made will be lost, are you sure you want to cancel?</div>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => props.closeCreateModal()}>Yes</button>
                    <button className="Button Secondary" onClick={() => setDiscardModalIsOpen(false)}>No</button>
                </div>
            </Modal>

        </>
    )

}