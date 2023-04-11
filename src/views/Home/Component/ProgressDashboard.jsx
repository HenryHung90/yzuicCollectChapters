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

import { getFirestore, setDoc, getDoc, doc } from 'firebase/firestore'

const countThreshold = 15

const ProgressDashboard = ({ groupData, isScanned, loadingPage, User, setOpen, setTitle, setSubTitle }) => {

    const ContainerItem = styled(Container)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const PaperItem = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
    }));

    // 已掃描數量
    const [countScanned, setCountScanned] = useState(0)
    // 掃描 % 數
    const [progressParsent, setProgressParsent] = useState(0)
    // 目前狀態
    const [lotteryStatus, setLotteryStatus] = useState("尚未達到抽獎資格")

    const db = getFirestore()

    useEffect(e => {
        let counting = 0
        isScanned.forEach(value => {
            if (value) counting++
        });

        setCountScanned(counting)
        if (counting >= countThreshold) {
            setOpen(true)
            setTitle("恭喜!")
            setSubTitle("恭喜你符合抽獎資格！請注意我們將在 2023/5/15 晚上8點 於IG進行抽獎！請關注我們的 IG 以免錯過中獎消息！IG:yzuic_26")
            setLotteryStatus("取得抽獎資格")

            getDoc(doc(db, "lotteryMember", User.UserEmail)).then(response => {
                if (!response.exists()) {
                    // 設定中獎時間
                    setDoc(doc(db, "lotteryMember", User.UserEmail), {
                        UserName: User.UserName,
                        GetTime: new Date()
                    })
                }
            })
        }
    }, [isScanned])

    useEffect(e => {
        // const parsent = parseInt((countScanned / groupData.length) * 100)
        // setProgressParsent(parsent)
        const timer = setInterval(() => {
            setProgressParsent((oldProgress) => {
                if (oldProgress >= parseInt((countScanned / groupData.length) * 100)) {
                    clearInterval(timer)
                }
                const diff = Math.random() * 4
                return Math.min(oldProgress + diff, 100)
            })
        }, 10)
    }, [countScanned])



    return (
        <Container
            maxWidth="sm"
            sx={{
                margin: '30px 0',
                padding: '15px 15px',
            }}
        >
            <h1>進度</h1>
            <Paper
                elevation={5}
                sx={{
                    padding: '20px 15px'
                }}
            >
                <h2>歡迎！{User.UserName}</h2>
                <Fade in={!loadingPage}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={1}
                    >
                        <Grid item xs={8}>
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
                                    {countScanned} / {22}
                                </h3>
                            </ContainerItem>
                        </Grid>
                        <Grid item xs={8}>
                            <PaperItem sx={{
                                lineHeight: 1,
                                textAlign: 'center'
                            }}>
                                <h4>抽獎資格</h4>
                                <h5><b>⭐ 收集 15 組 ⭐</b></h5>
                                <p>即可參加抽獎，獎品內容包含：</p>
                                <p><b>1、Switch</b></p>
                                <p><b>2、Bose 音響</b></p>
                                <p><b>3、拍立得</b></p>
                            </PaperItem>
                        </Grid>
                    </Grid>
                </Fade>
                <Fade in={!loadingPage}>
                    <Container
                        sx={{
                            marginTop: 5
                        }}
                    >
                        <p>目前狀態：</p>
                        <h2>{lotteryStatus}({countScanned}/{15})</h2>
                    </Container>
                </Fade>
            </Paper>
        </Container >
    );
}

export default ProgressDashboard;