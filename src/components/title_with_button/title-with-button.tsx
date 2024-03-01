import './title-with-button.css';

interface ITitleWithButton{
    children: any;
    onClick(): void;
}

export default function TitleWithButton(props: ITitleWithButton) {

    return (
        <div className="Title WithButton">
            {props.children}
            <button className='SeeAll' onClick={props.onClick}>See all</button>
        </div>
    );
}