import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IUser } from "../../models/IUser";

export default function UsersCompany() {

    let [usersOfCompany, setUsersOfCompany] = useState<IUser[]>([]);
    let [pageNumber, setPageNumber] = useState(0);
    let { companyId } = useParams();

    useEffect(() => {
        getUsersByCompany();
    }, [companyId, pageNumber])

    async function getUsersByCompany() {
        try {
            let url = `http://localhost:8080/users/byCompanyId?companyId=${companyId}&pageNumber=${pageNumber}`;
            let response = await axios.get(url);
            setUsersOfCompany(response.data);
        } catch (e: any) {
            if (e.response?.data?.errorMessage) {
                alert(e.response.data.errorMessage);
            } else {
                alert("Something went wrong, try again later");
            }
        }
    }

    return (
        <div className="UsersCompany">
            <table>
                <thead>
                    <td>ID</td>
                    <td>Username</td>
                    <td>User type</td>
                    <td>Company name</td>
                </thead>
                <tbody>
                    {usersOfCompany.map((user: IUser) =>
                        <tr className="UserDetails">
                            <td>{user.id}</td>
                            <td>{user.userName}</td>
                            <td>{user.userType}</td>
                            <td>{user.companyName}</td>
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