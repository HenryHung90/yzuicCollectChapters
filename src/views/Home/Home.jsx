import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getFirestore, setDoc, updateDoc, getDoc, doc } from 'firebase/firestore'
import './Home.css'

import Header from './Component/Header'
import Scanner from './Component/Scanner'
import GroupIcon from './Component/GroupIcon'
import ProgressDashboard from './Component/ProgressDashboard'

import Loading from '../Loading/Loading'
import Alert from '../Alert/Alert'

const itemData = [
    // 5.4E+7
    {
        title: '5.4E+7', img: './img/group/5.4E+7.png', author: '123', uuid: '1D6E9CA5-EAF3-9E8F-F41C-DD5F5109D1C7'
    },
    // 不存在的歷史1963
    {
        title: '不存在的歷史1963', img: './img/group/不存在的歷史1963.png', author: '123', uuid: 'B5898D98-4B01-504D-FDB3-9DB4077DF070'
    },
    // 元宇宙
    {
        title: '元宇宙', img: './img/group/元宇宙.png', author: '123', uuid: '03ECB87A-C783-D22A-B2BD-A1A70E140262'
    },
    // 毛起來
    {
        title: '毛起來', img: './img/group/毛起來.png', author: '123', uuid: '8FCCF891-58EE-8E98-2890-1B098D12330C'
    },
    // 古嶺奇譚
    {
        title: '古嶺奇譚', img: './img/group/古嶺奇譚.png', author: '123', uuid: '25B5DE73-8813-F8CC-EE95-33C58A874BB9'
    },
    // 用心眼視
    {
        title: '用心眼視', img: './img/group/用心眼視.png', author: '123', uuid: '77AF9084-51A8-FB50-F41C-F63780962B40'
    },
    // 血墨契約
    {
        title: '血墨契約', img: './img/group/血墨契約.png', author: '123', uuid: 'C4D9578F-AEAB-EE8B-0827-8528C16E1A95'
    },
    // 那夜星空下的流星
    {
        title: '那夜星空下的流星', img: './img/group/那夜星空下的流星.png', author: '123', uuid: '7F832530-E95C-EA14-B9E8-ED45AE26164C'
    },
    // 消失的女兒
    {
        title: '消失的女兒', img: './img/group/消失的女兒.png', author: '123', uuid: '0582F5EB-0182-D34E-ED0F-60085D98C1C2'
    },
    // 混鏡
    {
        title: '混鏡', img: './img/group/混鏡.png', author: '123', uuid: '1C445E22-C508-4637-E775-2C3EB4435A68'
    },
    // 湖口老街
    {
        title: '湖口老街', img: './img/group/湖口老街.png', author: '123', uuid: '1C359C85-C11F-811C-836A-7F2BDE726340'
    },
    // 零魂伴侶
    {
        title: '零魂伴侶', img: './img/group/零魂伴侶.png', author: '123', uuid: '27CDB262-6540-4AF7-61CB-A03EE57ABA36'
    },
    // 電謝之暝
    {
        title: '電謝之暝', img: './img/group/電謝之暝.png', author: '123', uuid: 'C0853ADD-7A46-3461-823C-01D9BF4CD65D'
    },
    // 蒔夢
    {
        title: '蒔夢', img: './img/group/蒔夢.png', author: '123', uuid: '3407B9A7-C13A-35F3-9D84-EE11DF3EB366'
    },
    // 噪域
    {
        title: '噪域', img: './img/group/噪域.png', author: '123', uuid: 'D8024709-8BAA-E1CB-BE19-45520DBF03CF'
    },
    // 噬
    {
        title: '噬', img: './img/group/噬.png', author: '123', uuid: '23C9510D-F2CB-EF1A-F17C-BFD72B03436B'
    },
    // 繫念
    {
        title: '繫念', img: './img/group/繫念.png', author: '123', uuid: 'D9EABA37-9EE8-134B-6CEE-9BDA50DC7CE2'
    },
    // ARK ME
    {
        title: 'ARK ME', img: './img/group/ARK_ME.png', author: '123', uuid: 'EDEBBC58-C070-2082-FAD7-40D042D381CC'
    },
    // JazzBox
    {
        title: 'JazzBox', img: './img/group/JazzBox.png', author: '123', uuid: '9AA7CF38-7F27-CF11-5487-154B6AF5B225'
    },
    // Raise
    {
        title: 'Raise', img: './img/group/Raise.png', author: '123', uuid: '4AF149EA-2EC8-E422-DAD7-0130510EC791'
    },
    // The_Echo_of_Lodestar
    {
        title: 'The Echo of Lodestar', img: './img/group/The_Echo_of_Lodestar.png', author: '123', uuid: '8B64ACC3-0668-D30F-CCD2-F52FD848CA7C'
    },
    // Titta_Me
    {
        title: 'Titta Me', img: './img/group/Titta_Me.png', author: '123', uuid: 'F4830F9E-1510-A3D9-3D36-2EACE7F41D93'
    },
]

const Home = ({ Logout, User }) => {

    // QRCode 掃瞄器
    const [scanner, setScanner] = useState(false)
    // 掃描內容
    const [scanResult, setScanResult] = useState("")

    // 各組資訊
    const [groupData, setGroupData] = useState([...itemData])
    // 確認是否有掃描
    const [isScanned, setisScanned] = useState(new Array(21).fill(false))

    // 是否 loading
    const [loadingPage, setLoadingPage] = useState(true)
    // Alert 啓閉
    const [open, setOpen] = useState(false)
    // Alert 內容
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")

    const [getParams, setParams] = useSearchParams()

    const db = getFirestore()

    useEffect(e => {
        const group = getParams.get('group')

        getDoc(doc(db, "member", User.UserEmail))
        .then(response => {
            // 若已經進入過，就取得資訊後新增進入
            if (response.exists()) {
                setisScanned(response.data().GroupScan)
                return response.data().GroupScan
            } else {
                // 若無則設定新的檔案進入
                setDoc(doc(db, "member", User.UserEmail), {
                    UserName: User.UserName,
                    GroupScan: new Array(21).fill(false)
                })

                setOpen(true)
                setTitle("歡迎")
                setSubTitle("歡迎使用元智大學集章系統，可使用左上角掃瞄器進行集章唷！（也可以直接使用手機掃描）")

                return new Array(21).fill(false)
            }
        }).then(GroupScan => {
            if (group) {
                let isCurrect = false

                groupData.forEach((value, index) => {
                    if (isCurrect) {
                        return
                    }

                    if (value.uuid === group) {
                        GroupScan[index] = true
                        isCurrect = true

                        setOpen(true)
                        setTitle("通知")
                        setSubTitle(`掃描成功！${value.title}`)

                        setParams({ group: '' })

                        updateDoc(doc(db, "member", User.UserEmail), {
                            GroupScan: GroupScan
                        })
                        setisScanned(GroupScan)
                        return
                    }
                })
                if (!isCurrect) {
                    setOpen(true)
                    setTitle("通知")
                    setSubTitle(`掃描失敗！`)
                }
            }
            setLoadingPage(false)
        })
    }, [])

    useEffect(e => {
        if (scanResult !== '') {
            const splitScanResult = scanResult.split("=")[1]

            let isCurrect = false
            let TempisScanned = [...isScanned]

            groupData.forEach((value, index) => {
                if (isCurrect) {
                    return
                }

                if (value.uuid === splitScanResult) {
                    TempisScanned[index] = true
                    isCurrect = true

                    setOpen(true)
                    setTitle("通知")
                    if (isScanned[index]) {
                        setSubTitle(`已經掃描過囉！`)
                    } else {
                        setSubTitle(`掃描成功！${value.title}`)
                    }

                    updateDoc(doc(db, "member", User.UserEmail), {
                        GroupScan: TempisScanned
                    })
                    setisScanned(TempisScanned)
                }
            })
            if (!isCurrect) {
                setOpen(true)
                setTitle("通知")
                setSubTitle(`掃描失敗！`)
            }
        }
    }, [scanResult])

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Alert open={open} handleClose={handleClose} title={title} subTitle={subTitle} />
            <Loading isOpen={loadingPage} />
            <div className='container homeContainer'>
                {scanner && <Scanner scanner={scanner} setScanResult={setScanResult} setScanner={setScanner} />}
                <Header Logout={Logout} User={User} setScanner={setScanner} />
                <ProgressDashboard
                    groupData={groupData}
                    isScanned={isScanned}
                    loadingPage={loadingPage}
                    User={User} 
                    setOpen={setOpen}
                    setTitle={setTitle}
                    setSubTitle={setSubTitle}
                    />
                <GroupIcon groupData={groupData} isScanned={isScanned} />
            </div>
        </>

    )
}

export default Home