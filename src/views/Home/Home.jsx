import { useState, useEffect } from 'react'
import './Home.css'


import Header from './Component/Header'
import Scanner from './Component/Scanner'

const Home = ({ Logout, User }) => {

    const [scanner, setScanner] = useState(false)
    const [scanResult, setScanResult] = useState("")

    return (
        <div className='container homeContainer'>
            {scanner === true && <Scanner scanResult={scanResult} setScanResult={setScanResult} setScanner={setScanner} />}
            <Header Logout={Logout} User={User} setScanner={setScanner} />
            <p>{scanResult}</p>
        </div>
    )
}

export default Home