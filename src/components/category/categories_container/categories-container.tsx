import axios from "axios";
import { useState, useEffect } from "react";
import ICategory from "../../../models/ICategory";
import CategoryCard from "../category-card/category-card";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../../redux/AppState";
import { ActionType } from "../../../redux/action-type";
import './categories-container.css';
import { useNavigate } from "react-router-dom";

export default function CategoriesContainer() {

    let categoriesArray: ICategory[] = useSelector((state: AppState) => state.categoriesByPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        getCategoriesForHomePage();
    }, [0]);

    async function getCategoriesForHomePage() {
        try {
            let url = `http://localhost:8080/categories/byPage?pageNumber=${0}`;
            let response = await axios.get(url);
            dispatch({ type: ActionType.GetCategoriesByPage, payload: { categoriesArray } });
            categoriesArray = response.data;
        } catch (e: any) {
            if (e.response?.data?.message) {
                alert(e.response.data.message);
            } else {
                console.log(e);
                alert("Something went wrong, please try again later");
            }
        }
    }

    return (
        <div className='CardsContainer'>
            
            {categoriesArray?.map((category) => {
                return (
                    <CategoryCard
                        key={category.id}
                        name={category.name}
                        imageSrc={category.imageSrc}
                        id={category.id}
                    />
                )
            })}
        </div>
    );
}