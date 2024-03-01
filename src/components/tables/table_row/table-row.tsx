import './table-row.css';

interface ITableRow{
    children: any
}

export default function TableRow(props: ITableRow) {

    return <tr className='TableRow'>{props.children}</tr>;
}