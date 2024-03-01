import './table-header.css';

interface ITableHeader {
    children: any
}
export default function TableHeader(props: ITableHeader) {
    return (
        <th className='TableHeader'>
            {props.children}
        </th>
    );
}