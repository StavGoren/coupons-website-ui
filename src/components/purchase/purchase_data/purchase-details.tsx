import { format, parseISO } from "date-fns";
import IPurchase from "../../../models/IPurchase";
import './purchase-data.css';

export default function PurchaseDetails(props: IPurchase) {

    let date = props.date;
    let parsedStartDate = parseISO(date);
    let formattedStartDate = format(parsedStartDate, "mm/dd/yyyy");

    return (
        <div className="PurchaseData">
            <td>{props.purchaseId}</td>
            <td>{props.amount}</td>
            <td>{formattedStartDate}</td>
            <td>{props.customerId}</td>
            <td>{props.couponId}</td>
            <td>{props.categoryId}</td>
            <td>{props.companyId}</td>
        </div >
    )
}