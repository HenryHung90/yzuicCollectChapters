import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { firebase } from "../../firebase/firebase"

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import Container from '@mui/material/Container';

const Login = ({ Login, setUser }) => {
    const Nav = useNavigate();

    const SignIpWithGoogle = () => {
        const google_Provider = new firebase.auth.GoogleAuthProvider();
        firebase
            .auth()
            .signInWithPopup(google_Provider)
            .then((res) => {
                setUser({
                    UserName: res.user._delegate.displayName,
                    UserEmail: res.user._delegate.email,
                    UserPhoto: res.user._delegate.photoURL,
                })
                Login()
                Nav("/Home")
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container maxWidth="sm">
            <Button
                id="LoginGoogle"
                onClick={SignIpWithGoogle}
                variant="contained"
                startIcon={<GoogleIcon />}
            >
                Login With Google
            </Button>
        </Container>
    )
}

export default Login