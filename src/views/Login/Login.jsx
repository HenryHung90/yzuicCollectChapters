import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { firebase } from "../../firebase/firebase"

import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

import Container from '@mui/material/Container';

const Login = ({ Login, setUser, loadingPage }) => {
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
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 500,
                    marginTop: 10,
                    background: 'white',
                    backgroundClip: 'padding-box',
                    zIndex: 1001,
                    padding: '10px 10px',
                    border: '10px solid',
                    borderWidth: '5.65px',
                    borderRadius: '14px',
                    borderImageSlice: 4,
                    borderImageWidth: 2,
                    borderImageOutset: 0,
                    borderImageSource: "url(./img/common/outline.svg)",
                    overflow: 'hidden',
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        width: '80%',
                        padding: '0',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}
                >
                    <img
                        src='./img/common/ok.png'
                        alt='Ok蹦'
                        loading='lazy'
                        style={{
                            width: '30%',
                            zIndex: 1001,
                        }}
                    />
                    <Container
                        sx={{
                            width: '100%',
                            padding: 0,
                            margin: 0,
                            marginTop: '15%',
                            color: 'rgb(28,223,254)',
                        }}
                    >
                        <h3>元智大學 資訊傳播學系</h3>
                        <h5>112屆畢業展 - 成長Tone</h5>
                        <h3 style={{ letterSpacing: 10, marginTop: 20 }}>線上集章系統</h3>
                    </Container>
                    <Button
                        id="LoginGoogle"
                        onClick={SignIpWithGoogle}
                        variant="contained"
                        startIcon={<GoogleIcon />}
                        sx={{
                            width: '100%',
                            height: 50,
                            marginTop: '15%'
                        }}
                    >
                        使用 Google 帳戶登入
                    </Button>
                </Container>
            </Container>
        </Container>


    )
}

export default Login