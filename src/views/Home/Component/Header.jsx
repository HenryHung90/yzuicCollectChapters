import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { firebase } from '../../../firebase/firebase'

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem
} from '@mui/material'

import QrCodeIcon from '@mui/icons-material/QrCode';


const Header = ({ Logout, User, setScanner }) => {
    const Nav = useNavigate()

    const [anchorElUser, setAnchorElUser] = useState(null)


    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const LogoutFunc = () => {
        Logout()
        firebase.auth().signOut()
        Nav("/")
    };

    return (
        <AppBar position="sticky" sx={{ backgroundColor: 'rgb(102,255,253)' }}>
            <Container maxWidth="sm" sx={{ backgroundColor: 'rgb(102,255,253)' }}>
                {/* 電腦版 */}
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'mono roboto',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        YZUIC 112
                    </Typography>
                    {/* 手機版 menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => setScanner(true)}
                            color="black"
                        >
                            <QrCodeIcon sx={{ color: "black" }} />
                        </IconButton>
                    </Box>
                    {/* 手機版LOGO區 */}
                    <Typography
                        variant="h5"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto',
                            fontWeight: 800,
                            letterSpacing: '.2rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        YZUIC 112
                    </Typography>
                    {/* 電腦版 menu */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={() => setScanner(true)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <QrCodeIcon />
                        </Button>
                    </Box>

                    {/* 頭像 */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={User.UserPhoto} />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center" onClick={LogoutFunc}>登出</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )

}

export default Header