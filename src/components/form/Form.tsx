import './Form.css';

interface IForm{
    children: any
}

export default function Form(props: IForm) {

    return(
        <div className='Form'>
            {props.children}
        </div>
    )
}