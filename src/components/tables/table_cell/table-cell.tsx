import './table-cell.css';

interface ITableCell{
    children: any
}

export default function TableCell(props: ITableCell) {

    return(
        <tr className='TableCell'>
            {props.children}
        </tr>
    );
}