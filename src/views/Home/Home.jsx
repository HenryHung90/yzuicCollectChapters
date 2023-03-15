import { useState, useEffect } from 'react'
import { firebase } from '../../firebase/firebase'
import './Home.css'


import Header from './Component/Header'
import Scanner from './Component/Scanner'
import GroupIcon from './Component/GroupIcon'

const itemData = [
    // 5.4E+7
    {
        title: '5.4E+7', img: './img/group/5.4E+7.png', author: '123'
    },
    // 不存在的歷史1963
    {
        title: '不存在的歷史1963', img: './img/group/不存在的歷史1963.png', author: '123'
    },
    // 元宇宙
    {
        title: '元宇宙', img: './img/group/元宇宙.png', author: '123'
    },
    // 毛起來
    {
        title: '毛起來', img: './img/group/毛起來.png', author: '123'
    },
    // 古嶺奇譚
    {
        title: '古嶺奇譚', img: './img/group/古嶺奇譚.png', author: '123'
    },
    // 用心眼視
    {
        title: '用心眼視', img: './img/group/用心眼視.png', author: '123'
    },
    // 血墨契約
    {
        title: '血墨契約', img: './img/group/血墨契約.png', author: '123'
    },
    // 那夜星空下的流星
    {
        title: '那夜星空下的流星', img: './img/group/那夜星空下的流星.png', author: '123'
    },
    // 消失的女兒
    {
        title: '消失的女兒', img: './img/group/消失的女兒.png', author: '123'
    },
    // 混鏡
    {
        title: '混鏡', img: './img/group/混鏡.png', author: '123'
    },
    // 湖口老街
    {
        title: '湖口老街', img: './img/group/湖口老街.png', author: '123'
    },
    // 零魂伴侶
    {
        title: '零魂伴侶', img: './img/group/零魂伴侶.png', author: '123'
    },
    // 電謝之暝
    {
        title: '電謝之暝', img: './img/group/電謝之暝.png', author: '123'
    },
    // 蒔夢
    {
        title: '蒔夢', img: './img/group/蒔夢.png', author: '123'
    },
    // 噪域
    {
        title: '噪域', img: './img/group/噪域.png', author: '123'
    },
    // 噬
    {
        title: '噬', img: './img/group/噬.png', author: '123'
    },
    // 繫念
    {
        title: '繫念', img: './img/group/繫念.png', author: '123'
    },
    // ARK ME
    {
        title: 'ARK ME', img: './img/group/ARK_ME.png', author: '123'
    },
    // JazzBox
    {
        title: 'JazzBox', img: './img/group/JazzBox.png', author: '123'
    },
    // Raise
    {
        title: 'Raise', img: './img/group/Raise.png', author: '123'
    },
    // The_Echo_of_Lodestar
    {
        title: 'The Echo of Lodestar', img: './img/group/The_Echo_of_Lodestar.png', author: '123'
    },
    // Titta_Me
    {
        title: 'Titta Me', img: './img/group/Titta_Me.png', author: '123'
    },
]

const Home = ({ Logout, User, loadingPage }) => {

    const [scanner, setScanner] = useState(false)
    const [scanResult, setScanResult] = useState("")
    const [groupData, setGroupData] = useState([...itemData])

    return (
        <div className='container homeContainer'>
            {scanner && <Scanner scanner={scanner} setScanResult={setScanResult} setScanner={setScanner} />}
            <Header Logout={Logout} User={User} setScanner={setScanner} />
            <p>{scanResult}</p>
            <GroupIcon groupData={groupData} />
        </div>
    )
}

export default Home