import { useEffect } from "react"
import './Feedback.css'

export default function ({ level, message, onTimeout }) {

    useEffect(() => {
        setTimeout(onTimeout, 2000)
    }, [])

    return <div className={`feedback feedback--${level}`}>{message}</div>
}