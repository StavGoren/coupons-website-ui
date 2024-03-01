import './Table.css';

interface ITable{
    children: any

}

export default function Table(props: ITable) {

    return(
        <table className='Table'>
            {props.children}
        </table>
    )
}
