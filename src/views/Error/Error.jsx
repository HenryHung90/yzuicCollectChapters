import {
    Button,
    Container,
    Paper
} from '@mui/material'

import { useNavigate } from 'react-router-dom'

const Error = () => {

    const Nav = useNavigate()

    return (
        <Container
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgb(28,223,254)',
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
            }}
        >
            <Container
                maxWidth="xs"
                sx={{ height: '500px' }}
            >
                <Paper
                    sx={{
                        height: '500px',
                        backgroundColor: 'white',
                        textAlign: 'center',
                    }}
                    elevation={10}
                >
                    <h1 style={{
                        color: '#58595b',
                        fontSize: 120,
                        fontFamily: 'Alkatra cursive',
                        fontWeight: 'bolder'
                    }}>404</h1>
                    <h4>您現在位於一個未知的領域</h4>
                    <h4>建議您立即返回主頁</h4>
                    <h4>以策安全</h4>
                    <Button
                        onClick={()=>{Nav('/')}}
                        variant="contained"
                        sx={{
                            width: '80%',
                            height: 50,
                            marginTop: '10%',
                            backgroundColor: 'white',
                            color: '#58595b',
                            borderRadius: 20
                        }}
                    >
                        返回地球
                    </Button>
                </Paper>
            </Container>
        </Container>
    )
}

export default Error