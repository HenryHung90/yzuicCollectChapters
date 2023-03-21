import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom"
import { firebase } from "../../firebase/firebase"

import Button from "@mui/material/Button"
import GoogleIcon from "@mui/icons-material/Google"
import { red } from '@mui/material/colors'
import Container from '@mui/material/Container'

import Loading from '../Loading/Loading'
import Alert from '../Alert/Alert'

const Login = ({ Login, setUser, loadingPage }) => {
    const Nav = useNavigate();
    const [getParams, setParam] = useSearchParams()

    const [open, setOpen] = useState(false);

    useEffect(e => {
        if (getParams.get('group') && !loadingPage) setOpen(true)
    }, [loadingPage])


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
                setParam({
                    group: getParams.get('group') || ''
                })
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClose = () => {
        setOpen(false);
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
                zIndex: 1000,
            }}
        >
            <Alert open={open} handleClose={handleClose} title={"尚未登入"} subTitle={"請先登入集章系統唷！"}/>
            <Loading isOpen={loadingPage} />
            <Container
                maxWidth="sm"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 500,
                    marginTop: 10,
                    background: 'white',
                    borderRadius: 10,
                    zIndex: 1001,
                    overflow: 'hidden',
                    backgroundColor: 'rgb(28,223,254)'
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        width: '100%',
                        padding: '0',
                        margin: '0 auto',
                        textAlign: 'center',
                    }}
                >
                    <Container
                        sx={{
                            width: '100%',
                            padding: 0,
                            margin: 0,
                            marginTop: '5%',
                        }}
                    >
                        <img src="./img/common/tone.png" width="70%" height="200px"></img>
                        <h3 style={{ letterSpacing: 10, marginTop: 40, color: '#58595b' }}>線上集章系統</h3>
                    </Container>
                    <Button
                        id="LoginGoogle"
                        onClick={SignIpWithGoogle}
                        variant="contained"
                        startIcon={<GoogleIcon sx={{ color: red[600] }} />}
                        sx={{
                            width: '80%',
                            height: 50,
                            marginTop: '10%',
                            backgroundColor: 'white',
                            color: '#58595b',
                            borderRadius: 20
                        }}
                    >
                        使用 Google 帳戶登入
                    </Button>
                </Container>
            </Container>
        </Container >
    )
}

export default Login