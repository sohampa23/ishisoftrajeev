
import Search from "./Search";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoIosGitCompare } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import Tooltip from "@mui/material/Tooltip";
import { Button} from "@mui/material";
import { FaRegUserCircle } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../context/Appcontext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { BsBox } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import CartItems from "../../../Cart Page/CartItems.jsx"


const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Navigation() {
  const navigate = useNavigate()
  const { userData, backendurl, setUserdata, setIsLoggedin } = useContext(AppContext)
  

  const sendVerifyingotp = async ()=>{
      try {
          axios.defaults.withCredentials = true
          const {data} = await axios.post(backendurl + '/api/auth/send-verify-otp')

          if(data.success) {
              navigate('/email-verify')
              toast.success(data.message)
          }
          else{
              toast.error(data.message)
          }

      } catch (error) {
          toast.error(error.message)  
      }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendurl + '/api/auth/logout');
  
      if (data.success) {
        setIsLoggedin(false);
        setUserdata(false);
        localStorage.removeItem("token"); // 
        navigate('/');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  function useCartCount() {
    const [count, setCount] = React.useState(0);
  
    React.useEffect(() => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCount(cart.length);
    }, []);
  
    return count;
  }
  
  const cartCount = useCartCount();

  return (
    <>
      <nav className="navigation lg:py-2">
        <div className="container lg:gap-4 grid lg:grid-cols-12 m-auto">
          <div className="col1 lg:col-span-2 p-2">
            <Link to="/">
              <h1
                className="text-center text-[#7d0492] text-[25px] font-[600] sm:text-2xl"
                style={{ fontStyle: "italic" }}
              >
                GiftNGifts
              </h1>
            </Link>
          </div>

          <div className="col2 lg:col-span-7 p-1">
            <Search />
          </div>

          <div className="col3 lg:col-span-3 pt-1 ml-5">
            <ul className="flex items-center justify-center  xl:gap-3  w-full">

              <li>
                {userData ? (
                  <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
                    
                    {userData.name[0].toUpperCase()}
                    <div className="absolute hidden group-hover:block top-0   z-10 text-black pt-10">
                      
                      <ul className="list-none m-0 p-2 bg-white text-sm w-40">
                      <Link to='/myProfile'>
                        <li className="py-2 px-2 flex gap-2  items-center  hover:bg-gray-100 cursor-pointer">
                        <FaRegUserCircle className="text-[#7d0492] text-[15px]"/>My Account
                        </li>
                        </Link>
                        <Link to='/wishlist'>
                        <li className="py-2 flex items-center gap-2 px-2 hover:bg-gray-100 cursor-pointer">
                        <FaRegHeart className="text-[#7d0492] !text-[15px] "/> Whish List
                        </li>
                        </Link>
                        <Link to="/orders">
                        <li className="py-2 px-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                        <BsBox className="text-[#7d0492] !text-[14px] " /> Orders
                        </li>
                        </Link>
                        {/* {!userData.isAccountVerify && (
                          <li onClick={sendVerifyingotp} className="py-2 px-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer">
                           < MdOutlineMail className="text-[#7d0492] !text-[15px] "  /> Verify email
                          </li>
                        )} */}
                        <li onClick={logout} className="py-2 px-2 flex items-center gap-2  hover:bg-gray-100 cursor-pointer ">
                         <RiLogoutCircleLine className="text-[#7d0492] !text-[15px] " /> Logout
                        </li>
                        

                      </ul>
                    </div>
                  </div>
                ) : (

                 
                  <Button
                    onClick={() => navigate("/login")}
                    className=" flex  px-5 !py-2  text-gray-800  transition-all gap-2"
                  >
                    <FaRegUserCircle className="!text-[24px] hover:text-black " />
                    Login
                  </Button>
                )}
              </li>

              <li>
                <Tooltip title="Compare">
                  <IconButton aria-label="compare">
                    <StyledBadge badgeContent={4} color="secondary">
                      <IoIosGitCompare className=" md:text-[25px] text-[20px]" />
                    </StyledBadge>
                  </IconButton>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="WhishList">
                  <Link to='/wishlist'>
                  <IconButton aria-label="like">
                    <StyledBadge badgeContent={3} color="secondary">
                      <FiHeart className="md:text-[25px] text-[20px]" />
                    </StyledBadge>
                  </IconButton>
                  </Link>
                </Tooltip>
              </li>

              <li>
                <Tooltip title="Cart">
                  <Link to='/cartlist'>
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={cartCount} 
                    color="secondary">
                      <MdOutlineShoppingCart className="md:text-[25px] text-[20px]" />
                    </StyledBadge>
                  </IconButton>
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
