import axios from "axios";
import { useState, useEffect } from "react";
import ICompany from "../../../models/ICompany";
import CompanyCard from "../company-card/company-card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/action-type";
import { useNavigate } from "react-router-dom";
import './companies-container.css';

export default function CompaniesContainer() {

    let [companiesArray, setCompaniesArray] = useState<ICompany[]>([]);
    // let companiesArray = useSelector((state: AppState) => state.companies);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    useEffect(() => {
        getCompaniesForHomePage();
    }, [0]);



    async function getCompaniesForHomePage() {
        try {
            let url = `http://localhost:8080/companies/byPage?pageNumber=${0}`;
            let response = await axios.get(url);
            // dispatch( {type: ActionType.GetAll, payload: { companiesArray }} );
            // companiesArray = response.data;
            setCompaniesArray(response.data);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                console.log(e);
                alert("Something went wrong, please try again later");
            }
        }
    }


    return (
        <div className='CardsContainer Companies'>
            
            {companiesArray?.map((company: ICompany) => {
                return (
                    <CompanyCard
                        key={company.id}
                        name={company.name}
                        phoneNumber={company.phoneNumber}
                        address={company.address}
                        imageSrc={company.imageSrc}
                        id={company.id}
                    />
                )
            })}
        </div>

    );
}