import { Link } from "react-router-dom";
import "./login-and-register.css";


export default function LoginAndRegister() {


    return (
        <>
            <Link to="/login" className="Button Secondary">Login</Link>
            <Link to="/register" className="Button Primary">Register</Link>
        </>
    )
}
