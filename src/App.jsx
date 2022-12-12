import { useLayoutEffect, useState } from 'react'
import appStyles from './App.module.css'

const birthday = new Date(new Date().getFullYear(), 11, 24, 17, 38) // YYYY MM DD HH MM
function App() {
  const [remainingDate, setRemainingDate] = useState({
    // months: 0,
    day: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const [date, setDate] = useState(Date.now())

  const id = setInterval(() => {
    setDate(Date.now() + 1000)
  }, 1000) 

  useLayoutEffect(() => {
    const diffDateTime = new Date(birthday.getTime() - date).getTime()
    if(diffDateTime < 0) return clearInterval(id)
    const newRemainingDate = {
      // months: (new Date(date).getMonth() + 1) - (birthday.getMonth() + 1),
      day: Math.floor(diffDateTime / (24 * 60 * 60 * 1000)),
      hours: Math.floor((diffDateTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor( (diffDateTime % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor(diffDateTime % (60 * 1000) / 1000),
    }

    setRemainingDate(newRemainingDate)
  }, [new Date(date).getSeconds()])

  return (
    <div className="App">
      <div className={appStyles.container}>
        <h1 className={appStyles.title}>Remaining until the end of time</h1>
        <div className={appStyles.counter}>
          {Object.entries(remainingDate).map((time, index, array) => {
            const content = (time[1]+'').length > 1 ? time[1] : '0' + time[1]
            return <p key={time[0]} className={appStyles.counterText}>{index === array.length - 1 ? content : content + ':'}</p>
          })}
        </div>
      </div>
    </div>
  )
}

export default App
