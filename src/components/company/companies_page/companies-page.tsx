import axios from 'axios';
import ICompany from '../../../models/ICompany';
import './companies-page.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CompanyCard from '../company-card/company-card';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/AppState';
import Modal from 'react-modal';
import { ActionType } from '../../../redux/action-type';
import Form from '../../form/Form';


Modal.setAppElement("#root");

export default function CompaniesPage() {
    // let [companiesArray, setCompaniesArray] = useState<ICompany[]>([]);
    let companiesArray = useSelector((state: AppState) => state.companies);
    let [pageNumber, setPageNumber] = useState(0);
    let [modalIsOpen, setModalIsOpen] = useState(false);
    let registeredUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
    const dispatch = useDispatch();
    let [name, setName] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [address, setAddress] = useState("");
    let [imageSrc, setImageSrc] = useState("");

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    // useEffect(() => {
    //     getAllCompanies();
    // }, [pageNumber]);

    async function createCompany() {
        try {
            const response = await axios.post("http://localhost:8080/companies", { name, phoneNumber, address, imageSrc });
            dispatch({ type: ActionType.SaveCompany, payload: { company: response } });
            setModalIsOpen(false);
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    // async function getAllCompanies() {
    //     try {
    //         let url = `http://localhost:8080/companies/byPage?pageNumber=${pageNumber}`;
    //         let response = await axios.get(url);
    //         setCompaniesArray(response.data);
    //     } catch (e) {
    //         console.error(e);
    //         alert("Something went wrong");
    //     }
    // }

    return (
        <div className="CompaniesPage">
            <div className='CardsContainer Companies'>
                {companiesArray?.map((compamy: ICompany) => {
                    return (
                        <CompanyCard
                            key={compamy.id}
                            name={compamy.name}
                            phoneNumber={compamy.phoneNumber}
                            address={compamy.address}
                            imageSrc={compamy.imageSrc}
                            id={compamy.id}
                        />
                    )
                })}
                {isUserLoggedIn && registeredUser.userType == "Admin" && (<button className='Card Add' onClick={openModal}>+</button>)}

                <Modal
                    className="Modal"
                    isOpen={modalIsOpen}
                    onAfterOpen={openModal}
                    // onRequestClose={closeModal}
                    // style={customStyles}
                    contentLabel='CreateCompany'
                >
                    <div className='CardTitle'>Add new company</div>
                    <Form>
                        <input type='text' placeholder="Name" onChange={event => setName(event.target.value)} />
                        <input type='text' placeholder='Phone number' onChange={event => setPhoneNumber(event.target.value)} />
                        <input type='text' placeholder='Address' onChange={event => setAddress(event.target.value)} />
                        <input type='text' placeholder='Image source' onChange={event => setImageSrc(event.target.value)} />
                    </Form>
                    <div className='ButtonsContainer'>
                        <button className="Button Primary" onClick={() => createCompany()}>Save</button>
                        <button className="Button Secondary" onClick={closeModal}>Discard</button>
                    </div>
                </Modal>
            </div>
            {/* <div className='NavButtons'>
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber - 1)} value="<" />
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber + 1)} value=">" />
            </div> */}
        </div>
    );
}