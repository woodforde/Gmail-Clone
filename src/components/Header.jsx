import React from 'react';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import { auth } from '../firebase';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = () => {
        auth.signOut().then(() => {
            dispatch(logout());
        });
    };

  return (
    <div className="header">
        <div className="header__left">
            <IconButton>
                <MenuIcon />
            </IconButton>
            <img 
                src="https://i.pinimg.com/originals/ae/47/fa/ae47fa9a8fd263aa364018517020552d.png" 
                alt="gmail logo"
            />
        </div>
        <div className="header__middle">
            <SearchIcon />
            <input
                placeholder='Search mail'
                type="text"
            />
            <ArrowDropDownIcon className="header__inputCaret" />
        </div>
        <div className="header__right">
            <IconButton>
                <AppsIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <Avatar
                onClick={signOut}
                src={user?.photoUrl}
            />

        </div>
    </div>
  );
}

export default Header;