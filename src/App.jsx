import { useState } from 'react'
import './App.css'
import QueryBuilder from './QueryBuilder/QueryBuilder'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QueryBuilder/>
    </>
  )
}

export default App
