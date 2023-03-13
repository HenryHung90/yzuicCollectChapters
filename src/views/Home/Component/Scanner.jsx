import { useState } from 'react'
import { QrReader } from 'react-qr-reader'
import '../Home.css'

import Container from '@mui/material/Container'
import Fade from '@mui/material/Fade'

const Scanner = ({ scanner, setScanResult, setScanner }) => {

    const [cameraStatus, setStatus] = useState(false)

    const HandleScan = (result, error) => {
        // console.log('complete')
        setStatus(true)
        if (result !== undefined) {
            setScanResult(result.text)
            setScanner(false)
        } else {
            // console.log(result)
        }
    }

    const HandleCancel = () => {
        if (cameraStatus) setScanner(false)
    }

    return (
        <Fade in={scanner}>
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
                onClick={HandleCancel}
                className="ScannerContainer"
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        height: 400,
                        background: 'rgb(28,223,254)',
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
                        filter: 'drop-shadow(0 0 5px rgb(28,233,254))'
                    }}
                >

                    <img src="./img/common/paintone.png" alt="PainTOne" style={{
                        width: '75%',
                        height: 340,
                        objectFit: 'fill',
                        position: 'fixed',
                        left: '16.3%',
                        zIndex: 1002,
                    }} />
                    <QrReader
                        delay={1000}
                        style={{
                            height: '100%',
                            width: '80%',
                            zIndex: 1001,
                            borderRadius: '14px'
                        }}
                        onResult={HandleScan}
                        constraints={{
                            facingMode: 'environment'
                        }}
                    />
                </Container>
            </Container>
        </Fade>
    )
}

export default Scanner