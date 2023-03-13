import { useState } from 'react'
import './Home.css'


import Header from './Component/Header'
import Scanner from './Component/Scanner'
import GroupIcon from './Component/GroupIcon'

const Home = ({ Logout, User }) => {

    const [scanner, setScanner] = useState(false)
    const [scanResult, setScanResult] = useState("")

    return (
        <div className='container homeContainer'>
            {scanner && <Scanner scanner={scanner} setScanResult={setScanResult} setScanner={setScanner} />}
            <Header Logout={Logout} User={User} setScanner={setScanner} />
            <p>{scanResult}</p>
            <GroupIcon />
        </div>
    )
}

export default Home