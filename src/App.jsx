import { useState, useEffect } from "react"

import BuscarParada from "./components/BuscarParada.jsx"
import ResultsTable from "./components/ResultsTable.jsx"
import SavedStops from "./components/SavedStops.jsx"
import Modal from "./Modal.jsx"
import "./App.css"

const App = () => {
  const [ results, setResults ] = useState({ isLoading : false, stop : {}  })
  const [ savedStops, setStops ] = useState([])

  useEffect(() => {
    let stops = localStorage.getItem("stops")
    if (stops) { 
      stops = JSON.parse(stops)
      setStops(stops)
    } else {
      localStorage.setItem("stops", JSON.stringify([]))
    }
  }, [])

  return (
    <div className="container p-4">
      <div className="align-center">
        <h1>Bus Checker</h1>
      </div>
      <BuscarParada setResults={setResults} setStops={setStops} savedStops={savedStops}/>
      <SavedStops setResults={setResults} setStops={setStops}>{ savedStops }</SavedStops>
      { results.stop.id ? <ResultsTable>{ results.stop }</ResultsTable> : "" }
      { results.isLoading ? <Modal/> : ''}
    </div>
  )
}

export default App
