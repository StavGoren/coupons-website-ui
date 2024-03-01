import { useEffect, useState } from 'react';
import axios from 'axios';
import './categories-page.css';
import ICategory from '../../../models/ICategory';
import CategoryCard from '../category-card/category-card';

import Modal from 'react-modal'
import { text } from 'stream/consumers';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../../redux/action-type';
import { AppState } from '../../../redux/AppState';
import CreateCategoryModal from '../create_category/create-category-modal';


const ModalStyle = {
    content: {
        //   padding: "5px",
        top: "55%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px"
    }
};

Modal.setAppElement('#root');

export default function CategoriesPage() {

    let categoriesArray: ICategory[] = useSelector((state: AppState) => state.categories);
    let [pageNumber, setPageNumber] = useState(0);
    let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
    let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
    let [createCategoryModalIsOpen, setCreateCategoryModalIsOpen] = useState(false);

    const dispatch = useDispatch();
    
    function closeCreateModal() {
        setCreateCategoryModalIsOpen(false);
    }

    useEffect(() => {
        getAllCategories();
    }, [loggedUser]);

    async function getAllCategories() {
        if (loggedUser.userId) {
            try {
                let url = `http://localhost:8080/categories`;
                let response = await axios.get(url);
                categoriesArray = response.data;
                dispatch({ type: ActionType.GetCategoriesByPage, payload: { categoriesArray: categoriesArray } });
            } catch (e: any) {
                if (e.response?.data?.errorMessage) {
                    alert(e.response.data.errorMessage);
                } else {
                    alert("Something wrong , Try  later");
                }
            }
        }
    }

    return (
        <div className="CategoriesPage">
            <div className='CardsContainer'>
                {categoriesArray.map((category: ICategory) => {
                    return (
                        <CategoryCard key={category.id}
                            id={category.id}
                            name={category.name}
                            imageSrc={category.imageSrc}
                        />
                    )
                })}

                {isUserLoggedIn && (loggedUser.userType == "Admin" && <button className='Card Add' onClick={() => setCreateCategoryModalIsOpen(true)}>+</button>)}
                <Modal
                    className='Modal'
                    isOpen={createCategoryModalIsOpen}
                    // onAfterOpen={()=> setCreateCategoryModalIsOpen(true)}
                    // style={ModalStyle}  
                    contentLabel='CreateCategoryModal'
                >
                    <CreateCategoryModal closeCreateCategoryModal={() => closeCreateModal()} />
                </Modal>
            </div >
            {/* <div className='NavButtons'>
                {pageNumber > 0 && (<input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber - 1)} value='<' />)}
                {pageNumber < categoriesArrayByPage.length && (<input type='button' className='NavButton' onClick={() => setPageNumber(pageNumber + 1)} value='>' />)}
            </div> */}
        </div>
    );
}

