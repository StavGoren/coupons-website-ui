import './table-head.css';

interface ITableHead{
    children: any
}

export default function TableHead(props: ITableHead) {

    return(
        <thead className='TableHead'>
            {props.children}
        </thead>
    )
}