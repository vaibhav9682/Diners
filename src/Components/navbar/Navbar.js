import React, { useState } from "react";
import Logo from "../../Assets/Logo.svg";
import { BsCart2 } from "react-icons/bs";
import { HiOutlineBars3 } from "react-icons/hi2";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import { useEffect } from "react";

const Navbar = ({ scrollToRef }) => {
  const [openMenu, setOpenMenu] = useState(false);


  const [cart, setCart] = useState(false);



  useEffect(() => {


    const handleOutsideClick = (event) => {

      const isInsideNavbar = event.target.closest('.navbar-container');

      if (cart && !isInsideNavbar && !event.target.closest('.cart-container-show')) {

        toggleCart();
      }
    };

    if (cart) {

      document.addEventListener('click', handleOutsideClick)
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [cart])



  const toggleCart = () => {

    setCart(prevCart => !prevCart);
    console.log("clicked")

  }



  const menuOptions = [
    {
      text: "Home",
      icon: <HomeIcon />,
    },
    {
      text: "About",
      icon: <InfoIcon />,
    },
    {
      text: "Testimonial",
      icon: <CommentRoundedIcon />,
    },
    {
      text: "Contact",
      icon: <PhoneRoundedIcon />,
    },
    {
      text: "Card",
      icon: <ShoppingCartRoundedIcon />,
      
    },
  ];

  return (<>
    <nav className="navbar-container">
      <div className="nav-logo-container">
        <img src={Logo} alt="logo" />
      </div>
      <div className="navbar-links-container">
        {(scrollToRef !== undefined) ?
          <ul>
            <li onClick={() => scrollToRef('aboutRef')}>About</li>
            <li onClick={() => scrollToRef('workRef')}>Work</li>
            <li onClick={() => scrollToRef('testRef')}>Testimonial</li>
            <li onClick={() => scrollToRef('contactRef')}>Contact</li>
          </ul> :
          <ul>
            <Link to='/'>Home</Link>
          </ul>
        }


        <Link to="" onClick={toggleCart}>
          <BsCart2 className="navbar-cart-icon" />
        </Link>
        <Link to='/menu' className="primary-button">Booking Now</Link>
      </div>
      <div className="navbar-menu-container">
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
        <Link to="" onClick={toggleCart}>
          <BsCart2 className="navbar-cart-icon" />
        </Link>
      </div>


      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor="right">
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <button >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </button>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

    </nav>
    <Cart display={cart} />
  </>
  );
};

export default Navbar;
