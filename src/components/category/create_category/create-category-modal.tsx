import axios from "axios";
import { useState } from "react";
import { ActionType } from "../../../redux/action-type";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import Form from "../../form/Form";

interface ICreateCategoryModal {
    closeCreateCategoryModal(): void;
}

export default function CreateCategoryModal(props: ICreateCategoryModal) {

    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let [name, setName] = useState("");
    let [imageSrc, setImageSrc] = useState("");
    const dispatch = useDispatch();

    console.log(loggedUser);

    async function createCategory() {
        if (loggedUser) {
            try {
                const response = await axios.post(`http://localhost:8080/categories`, { name, imageSrc });
                dispatch({ type: ActionType.SaveCategory, payload: { category: response } });
                props.closeCreateCategoryModal();
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                    console.error(e);
                } else {
                    // alert("Hmmmm... something went wrong, but it's not thy fault");
                    alert(e.response.data.errorMessage);
                }
            }
        }
    }

    return (
        <>
            <div className="CardTitle">
                Create Category
            </div>
            <Form>
                <input type="text" placeholder="Name" onChange={event => setName(event.target.value)} />
                <input type="text" placeholder="Image address" onChange={event => setImageSrc(event.target.value)} />
            </Form>
                <div className="ButtonsContainer">
                    <button className="Button Primary" onClick={() => createCategory()}>Save</button>
                    <button className="Button Secondary" onClick={() => props.closeCreateCategoryModal()}>Decline</button>
                </div>
        </>
    );
}