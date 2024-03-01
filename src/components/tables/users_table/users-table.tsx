import axios from "axios";
import { useState, useEffect } from "react";
import { IUser } from "../../../models/IUser";
import Table from "../table/Table";
import TableBody from "../table_body/table-body";
import TableCell from "../table_cell/table-cell";
import TableHead from "../table_head/table-head";
import TableHeader from "../table_header/table-header";
import TableRow from "../table_row/table-row";
import Button from "../../button/Button";
import { AppState } from "../../../redux/AppState";
import { useSelector } from "react-redux";

export default function UsersTable() {
    let [usersArray, setUsersArray] = useState<IUser[]>([]);
    let [pageNumber, setPageNumber] = useState(0);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    
    useEffect(() => {
        getUsersByPage(pageNumber);
    }, [pageNumber])

    // useEffect(() => {
    //     getAllUsers(pageNumber);
    // }, [pageNumber]);

    async function getUsersByPage(pageNumber: number) {
        if (loggedUser) {
            try {
                let url = `http://localhost:8080/users/byPage?pageNumber=${pageNumber}`;
                let response = await axios.get(url);
                setUsersArray(response.data);
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                } else {
                    alert("Something went wrong, try again later");
                }
            }
        }
    }

    return (
        <>
            <Table>
                <TableHead>
                    <TableHeader>ID</TableHeader>
                    <TableHeader>User Name</TableHeader>
                    <TableHeader>User Type</TableHeader>
                    <TableHeader>Company Name</TableHeader>
                </TableHead>
                <TableBody>
                    {usersArray.length < 1 ? (
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    ) : (usersArray.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.userName}</TableCell>
                            <TableCell>{user.userType}</TableCell>
                            <TableCell>{user.companyName}</TableCell>
                        </TableRow>
                    )))}

                </TableBody>
            </Table>
            <div className='NavButtons'>
                {pageNumber > 0 && <Button level="Secondary" onClick={() => setPageNumber(pageNumber - 1)}>&lt;</Button>}
                <span>{pageNumber + 1}</span>
                <Button level="Secondary" onClick={() => setPageNumber(pageNumber + 1)}>&gt;</Button>
            </div>
        </>
    )
}