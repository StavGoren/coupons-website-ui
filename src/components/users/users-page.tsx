import axios from "axios";
import { useState, useEffect } from "react";
import './users.css'
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models/IUser";
import ICustomer from "../../models/ICustomer";
import UsersTable from "../tables/users_table/users-table";

export default function UsersPage() {

    return (
        <>
            <div className="Title">Users</div>
            <UsersTable />

        </>
    );
}