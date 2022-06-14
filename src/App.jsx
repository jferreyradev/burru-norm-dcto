import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const current = new Date();
  const date = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`;
  console.log(date)

  return (
    <div className="App">
      <input type="date" defaultValue='2022-6-9'/>
      <input type="text" />
    </div>
  )
}

export default App
