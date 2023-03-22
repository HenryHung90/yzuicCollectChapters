import { useState, useEffect } from 'react'

import {
    Container,
    Paper,
    Box,
    Fade,
    CircularProgress,
    Grid
} from '@mui/material'

import { styled } from '@mui/material/styles'


const ProgressDashboard = ({ groupData, isScanned, loadingPage, User }) => {

    const ContainerItem = styled(Container)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const PaperItem = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
    }));

    const [countScanned, setCountScanned] = useState(0)
    const [progressParsent, setProgressParsent] = useState(0)

    useEffect(e => {
        let counting = 0
        isScanned.forEach(value => {
            if (value) counting++
        });

        setCountScanned(counting)

    }, [isScanned])

    useEffect(e => {
        const parsent = parseInt((countScanned / groupData.length) * 100)
        setProgressParsent(parsent)
    }, [countScanned])



    return (
        <Container
            maxWidth="sm"
            sx={{
                margin: '30px 0',
                padding: '15px 15px',
            }}
        >
            <h2>進度</h2>
            <Paper
                elevation={5}
                sx={{
                    padding: '20px 15px'
                }}
            >
                <h2>歡迎！{User.UserName}</h2>
                <Fade in={!loadingPage}>
                    <Grid container spacing={1} sx={{marginTop:1}}>
                        <Grid xs={6}>
                            <ContainerItem>
                                <CircularProgress
                                    variant="determinate"
                                    value={progressParsent}
                                    size={100}
                                    thickness={10}
                                />
                                <h3
                                    style={{
                                        marginTop: 5
                                    }}
                                >
                                    {countScanned} / {groupData.length}
                                </h3>
                            </ContainerItem>
                        </Grid>
                        <Grid xs={6}>
                            <PaperItem>
                                <h4>目標獎勵</h4>
                                <h7><b>⭐達到 11 個⭐</b></h7>
                                <p>帥哥一枚</p>
                                <h7><b>⭐全部收集⭐</b></h7>
                                <p> 沖繩自由行</p>
                            </PaperItem>
                        </Grid>
                    </Grid>
                </Fade>
            </Paper>
        </Container >
    );
}

export default ProgressDashboard;