import axios from "axios";
import { useEffect, useState } from "react";
import './customers-table.css'; 
import ICustomer from "../../../models/ICustomer";

export default function CustomersTable() {

    let [customersArray, setCustomersArray] = useState<ICustomer[]>([]);
    let [pageNumber, setPageNumber] = useState(0);

    useEffect(()=>{
        getAllCustomers(pageNumber);
    }, [pageNumber])

    async function getAllCustomers(pageNumber: number) {
        try {
            let url = `http://localhost:8080/customers/byPage?pageNumber=${pageNumber}`;
            let response = await axios.get(url);
            setCustomersArray(response.data);
        } catch (e: any){
            if(e.response?.data?.errorMessage){
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    return (
        <div className="CustomersTable">
            <table>
                <thead>
                    <td>ID</td>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Phone Number</td>
                    <td>Address</td>
                </thead>
                <tbody>
                    {customersArray.map((customer: ICustomer)=> 
                        <tr className="CustomerDetails">
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.address}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='NavButtons'>
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber - 1)} value="<" />
                <input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber + 1)} value=">" />
            </div>
        </div>
    );
}