
import { Link, useNavigate } from "react-router-dom";
import "./header.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/AppState";
import ISuccessfulLoginDetails from "../../models/ISuccessfulLoginDetails";
import { AiOutlineSearch } from 'react-icons/ai';
import { BiMenu } from 'react-icons/bi';
import ICategory from "../../models/ICategory";
import ICompany from "../../models/ICompany";
import { ICoupon } from "../../models/ICoupon";
import { ActionType } from "../../redux/action-type";
import { IcecreamOutlined } from "@mui/icons-material";
import { BsCart4 } from 'react-icons/bs';
import LoginAndRegister from "../account_access/login_and_register/login-and-register";
import AfterLogin from "../account_access/after_login/after-login";
import Modal from 'react-modal';

Modal.setAppElement('#root');
function Header() {

  let loggedUser = useSelector((state: AppState) => state.successfulLoginDetails);
  let isUserLoggedIn = useSelector((state: AppState) => state.isUserLoggedIn);
  // let userName = useSelector((state: AppState) => state.user.userName);
  // let loginAndRegister = useSelector((state: AppState) => state.accountAccess);

  let categories = useSelector((state: AppState) => state.categories);
  let companies = useSelector((state: AppState) => state.companies);
  let coupons = useSelector((state: AppState) => state.allCouponCards);
  let categoryCoupons = useSelector((state: AppState) => state.couponsOfCategory);
  // let [cartIsOpen, setCartIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let searchValue = "";

  function onSearchClick() {
    dispatch({ type: ActionType.Search, payload: { searchValue } });
    navigate('/searchresults');
  }

  function updateSearchValue(event: any) {
    searchValue = (event.target.value);
  }

  // function closeCart(){
  //   setCartIsOpen(false);
  // }

  // function getDropdownItemsByPrefix(event: any) {
  //   // searchValue = (event.target.value);
  //   prefix = updateSearchValue(event);

  //   if (event.nativeEvent.inputType == 'deleteContentBackward') {
  //     filterredCategoriesArray = categories;
  //     filterredCompaniesArray = companies;
  //     filterredCouponsArray = coupons;
  //   }
  //   if (!searchValue) {
  //     filterredCategoriesArray = [];
  //     filterredCompaniesArray = [];
  //     filterredCouponsArray = [];
  //   } else {
  //     filterredCategoriesArray = categories.filter((category) => category.name.toLocaleLowerCase().includes(prefix));
  //     filterredCompaniesArray = companies.filter((company) => company.name.toLocaleLowerCase().includes(prefix));
  //     filterredCouponsArray = coupons.filter((coupon) => coupon.name.toLocaleLowerCase().includes(prefix));
  //   }
  // }

  function navigateToHomePage() {
    navigate('/');
  }

  function navigateToPurchasesTable(user: ISuccessfulLoginDetails) {
    switch (user.userType) {
      case "Admin":
        navigate("/purchases");
        break;

      case "Customer":
        navigate("/purchases/" + user.userId);
        break;
    }
  }


  /***************
   * Create a function isUserAuthorized
   ********************/

  return (
    <div className="Header">
      <div className="Container">

        <div className="HeaderGroup">
          <BiMenu className="Menu" id="Menu" onClick={()=> document.querySelector("#Menu")?.classList.toggle("Open")}/>
          <div className="WebsiteName" onClick={() => navigate('/')}>
            Cou<span>op</span>

          </div>

          <div className="NavBar">
            <div className="CategoriesDropdown">
              <Link to={"/categories"}>
                <button>Categories</button>
              </Link>
              <div className="DropdownList">
                {categories.map((category) =>

                  <div className="CouponsCategoryList">
                    <a className="DropdownItem" href={'/coupons/category/' + category.id} key={category.id}><img src={category.imageSrc} />{category.name}</a>
                  </div>

                )}
              </div>
            </div>

            <div className="CompaniesDropdown">
              <Link to={"/companies"}>
                <button>Companies</button>
              </Link>
              <div className="DropdownList">
                {companies.map((company) =>
                  <a className="DropdownItem" href={'/coupons/company/' + company.id} key={company.id}><img src={company.imageSrc} />{company.name}</a>)}
              </div>
            </div>

            <div className="CouponsDropDown">
              <Link to={"/coupons"}>
                <button className="Coupons">Coupons</button>
              </Link>
              <div className="DropdownList">
                {coupons.map((coupon) =>
                  <a className="DropdownItem" href={'/coupon/' + coupon.id} key={coupon.id}><img src={coupon.imageSrc} />{coupon.name}</a>)}
              </div>
            </div>

            {isUserLoggedIn && loggedUser.userType == "Admin" && (<Link to={"/users"}>
              <button className="Users">Users</button>
            </Link>)}

            {isUserLoggedIn && loggedUser.userType == "Admin" &&
              (<button className="Purchases" onClick={() => navigateToPurchasesTable(loggedUser)}>Purchases</button>)}

          </div>
        </div>

        <div className="ButtonGroup">
          <form onSubmit={(e)=>{
            e.preventDefault()
            onSearchClick()
          } }>
            <label className="SearchBox" htmlFor="Search">
              <input className="SearchBar" id="Search" type="search" placeholder="Search..." onChange={updateSearchValue} />
              <AiOutlineSearch className="SearchButton"/>
              {/* <button className="SearchButton" onClick={() => onSearchClick()}> */}
            </label>
          </form>
          {isUserLoggedIn ? <AfterLogin /> : <LoginAndRegister />}
        </div>
      </div>
    </div >
  );
}

export default Header;