import { useEffect, useState } from "react";
import IPurchase from "../../../models/IPurchase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/action-type";
import PurchaseDetails from "../../purchase/purchase_data/purchase-details";
import './purchases.css';
import { useNavigate, useParams } from "react-router-dom";
import ICategory from "../../../models/ICategory";
import Modal from 'react-modal';
import Table from "../table/Table";
import TableHead from "../table_head/table-head";
import TableHeader from "../table_header/table-header";
import TableBody from "../table_body/table-body";
import TableRow from "../table_row/table-row";
import TableCell from "../table_cell/table-cell";
import Button from "../../button/Button";

Modal.setAppElement('#root');
export default function AllPurchases() {

    let [pageNumber, setPageNumber] = useState(0);
    let [purchasesArray, setPurchasesArray] = useState<IPurchase[]>([]);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);

    useEffect(() => {
        getPurchasesByPage(pageNumber);
    }, [pageNumber]);



    async function getPurchasesByPage(pageNumber: number) {
        if (loggedUser.userId) {
            try {
                let url = `http://localhost:8080/purchases/byPage?pageNumber=${pageNumber}`;
                let response = await axios.get(url);
                setPurchasesArray(response.data);
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
                    <TableHeader>Amount</TableHeader>
                    <TableHeader>Date of purchase</TableHeader>
                    <TableHeader>Customer ID</TableHeader>
                    <TableHeader>Coupon ID</TableHeader>
                    <TableHeader>Category ID</TableHeader>
                    <TableHeader>Company ID</TableHeader>
                </TableHead>
                <TableBody>
                    {purchasesArray.length < 1 ? (
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                            <TableCell> </TableCell>
                        </TableRow>
                    ) : (purchasesArray.map((purchase: IPurchase) =>
                        <TableRow key={purchase.purchaseId}>
                            <TableCell>{purchase.purchaseId}</TableCell>
                            <TableCell>{purchase.amount}</TableCell>
                            <TableCell>{new Date(purchase.date).toLocaleDateString()}</TableCell>
                            <TableCell>{purchase.customerId}</TableCell>
                            <TableCell>{purchase.couponId}</TableCell>
                            <TableCell>{purchase.categoryId}</TableCell>
                            <TableCell>{purchase.companyId}</TableCell>

                            {/* <td><button onClick={openModal}>X</button></td>
                            <Modal
                                className='DeleteModal'
                                isOpen={modalIsOpen}
                                onAfterOpen={openModal}
                                contentLabel='DeletePurchaseModal'
                            >
                                <h3>Are you sure you want to delete purchase with ID {purchase.purchaseId}?</h3>
                                <button onClick={()=> deletePurchase(purchase.purchaseId)}>Yes</button><button onClick={closeModal}>No</button>
                            </Modal> */}
                        </TableRow>)
                    )}
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

// onClick={()=> getPurchasesByCategory}
// getPurchasesByCategory(category.id, pageNumber)