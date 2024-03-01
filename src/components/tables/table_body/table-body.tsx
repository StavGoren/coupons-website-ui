import './table-body.css';

interface TableBody{
    children: any
}

export default function TableBody(props: TableBody) {

    return(
        <tbody className='TableBody'>
            {props.children}
        </tbody>
    )
}