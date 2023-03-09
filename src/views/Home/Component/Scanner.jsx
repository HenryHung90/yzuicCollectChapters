import { useState } from 'react'
import { QrReader } from 'react-qr-reader'

import Container from '@mui/material/Container'
import Button from "@mui/material/Button";

import AutorenewIcon from '@mui/icons-material/Autorenew';
import zIndex from '@mui/material/styles/zIndex';

const Scanner = ({ scanResult, setScanResult, setScanner }) => {

    const [carmera, setCarema] = useState('front')


    const HandleScan = (result, error) => {
        if (result !== undefined) {
            setScanResult(result.text)
            setScanner(false)
        } else {
            console.log(result)
        }
    }

    const HandleCarema = () => {
        carmera === 'front' ? setCarema('rear') : setCarema('front')
    }

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'fixed',
                width: '100vw',
                height: '100vh',
                backdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                zIndex: 1000,
            }}
            onClick={() => setScanner(false)}
        >
            <Container
                maxWidth="sm"
                sx={{
                    height: 400,
                    background: 'white',
                    zIndex: 1001
                }}
            >
                <QrReader
                    delay={1000}
                    style={{
                        height: 240,
                        width: 320
                    }}
                    onResult={HandleScan}
                    facingMode={carmera}
                />
                <Button
                    onClick={HandleCarema}
                    variant="contained"
                    startIcon={<AutorenewIcon />}
                >
                    切換鏡頭
                </Button>
            </Container>
        </Container>
    )
}

export default Scanner