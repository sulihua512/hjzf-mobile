import React from 'react'
import { Link } from 'react-router-dom'

/* 
    404 页面
*/
const NotFound = () => {
    return (
        <div>
            <center>
                <h2>404页面</h2>
                <p><Link>回家</Link></p>
            </center>
        </div>
    )
}

export default NotFound