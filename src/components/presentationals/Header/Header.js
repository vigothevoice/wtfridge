import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ReactComponent as Logo } from '../../../assets/logo.svg';

const Header = () => {
    return (
        <>
        <AppBar id="topbar" position="static" elevation={0}>
            <Logo className="logo"></Logo>
        </AppBar>
        </>
    )

}

export default Header