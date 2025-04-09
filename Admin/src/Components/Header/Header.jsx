import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Divider } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function Header() {
  const [anchorMyAccont, setAnchorMyAccont] = useState(null);
  const openMyAcc = Boolean(anchorMyAccont);
  const token = localStorage.getItem("stoken");
  const name = localStorage.getItem("name") || "";

  const handleClickMyAcc = (event) => {
    if (token) {
      setAnchorMyAccont(event.currentTarget);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("stoken");
    localStorage.removeItem("name");
    window.location.reload();
  };

  const handleCloseMyAcc = () => {
    setAnchorMyAccont(null);
  };

  return (
    <>
      <header className="ml-auto shadow-md w-[82%] !py-4 h-auto items-center bg-white">
        <div className="loginBtn flex justify-end w-full pr-6">
          {token ? (
            <div
              onClick={handleClickMyAcc}
              className="cursor-pointer bg-[#5f6fff] text-white text-[18px] font-semibold rounded-full w-10 h-10 flex items-center justify-center"
              title="Account"
            >
              {name[0].toUpperCase()}
            </div>
          ) : (
            <Link to="/login">
              <button className="cursor-pointer border-2 border-gray-300 text-[18px] text-gray-500 rounded pt-1 pb-2 px-8">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorMyAccont}
          id="account-menu"
          open={openMyAcc}
          onClose={handleCloseMyAcc}
          onClick={handleCloseMyAcc}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem className="!bg-white">
            <div className="flex items-center gap-2">
              <div className="rounded-full w-[38px] h-[38px] bg-[#5f6fff] text-white flex items-center justify-center text-lg font-semibold">
                {name[0].toUpperCase()}
              </div>
              <div className="info">
                <h3 className="text-[16px] font-[500] !leading-5">
                  {name}
                </h3>
                {/* Optional email or role here */}
              </div>
            </div>
          </MenuItem>

          <Divider />

          <MenuItem className="flex items-center gap-3 !ml-2">
            <FaRegUser className="text-[16px]" />
            <span className="text-[14px]">My account</span>
          </MenuItem>

          <MenuItem
            onClick={handleLogout}
            className="flex items-center gap-3 !ml-2"
          >
            <PiSignOutBold className="text-[16px]" />
            <span className="text-[14px]">Sign Out</span>
          </MenuItem>
        </Menu>
      </header>
    </>
  );
}

export default Header;
