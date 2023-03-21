import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import Container from '@mui/material/Container'

import CircularProgress from '@mui/material/CircularProgress'
import { cyan } from '@mui/material/colors'

const Loading = ({ isOpen }) => {
    return (
        <Fade in={isOpen}>
            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    zIndex: 1005,
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress
                        size={100}
                        sx={{
                            color: cyan[200]
                        }}
                    />
                </Box>
            </Container>
        </Fade>
    )
}

export default Loading