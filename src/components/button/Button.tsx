import './Button.css';

 interface IButton{
    children: any,
    level: 'Primary' | 'Secondary' | "Danger",
    onClick(): void
}

export default function Button(props: IButton) {

    
    return(
        <button className={`Button ${props.level}`} onClick={props.onClick}>{props.children}</button>
    );
}