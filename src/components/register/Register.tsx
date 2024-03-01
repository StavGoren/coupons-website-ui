import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import Form from "../form/Form";
import Button from "../button/Button";



function Register() {

    let navigate = useNavigate();
    let registerStatus;


    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [userName, setUserName] = useState("");
    let [password, setPassword] = useState("");
    let [verifyPassword, setVerifyPassword] = useState("");
    let [phoneNumber, setPhoneNumber] = useState("");
    let [address, setAddress] = useState("");

    async function onRegister() {

        try {
            if (password !== verifyPassword) {
                alert("Password didn't match");
            } else {
                const response = await axios.post("http://localhost:8080/customers", { 'user': { userName, password }, firstName, lastName, phoneNumber, address });
                console.log(response);
                registerStatus = <div className="SuccessfulRegister">Account created successfully!</div>;
                navigate("/login");
            }
        }
        catch (e: any) {
            if (e?.data?.errorMessage) {
                console.log(e.data.errorMessage)
            }
            alert("Something went wrong");
        }
    }

    return (
        <>
            <div className="Title">
                Register
            </div>
            <Form>
                <input type="text" placeholder="First Name" id="FirstName" onChange={event => setFirstName(event.target.value)} />
                <input type="text" placeholder="Last Name" id="LastName" onChange={event => setLastName(event.target.value)} />
                <input type="text" placeholder="Email" id="UserName" onChange={event => setUserName(event.target.value)} />
                <input type="password" placeholder="Password" id="Password" onChange={event => setPassword(event.target.value)} />
                <input type="password" placeholder="Verify password" id="VerifyPassword" onChange={event => setVerifyPassword(event.target.value)} />
                <input type="text" placeholder="Phone Number" id="PhoneNumber" onChange={event => setPhoneNumber(event.target.value)} />
                <input type="text" placeholder="Address" id="Address" onChange={event => setAddress(event.target.value)} />
                <Button level="Primary" onClick={onRegister}>Register</Button>
                <span>Already a member? <Link className="Link" to='/login'>Login</Link></span>
            </Form>
        </>
    );
}

export default Register;