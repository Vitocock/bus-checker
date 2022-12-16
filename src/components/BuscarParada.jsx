import { useState } from "react"

const apiUrl = 'https://api.xor.cl/red'

const BuscarParada = ({ setResults, setStops, savedStops }) => {
  const [ value, setValue ] = useState('')

  const handleSubmit = async (event, value) => {
    event.preventDefault()
    setResults({isLoading : true, stop : {}})
    const res = await fetch(`${apiUrl}/bus-stop/${value}`)
    const resJson = await res.json()
    setResults({ isLoading : false, stop : resJson })
  }

  const saveStop = async (event) => {
    event.preventDefault()
    setResults({isLoading : true, stop : {}})
    const res = await fetch(`${apiUrl}/bus-stop/${value}`)
    const resJson = await res.json()

    const newStops = savedStops
    newStops.push({ "stop" : value, "name" :  resJson.name})
    setStops(newStops)
    localStorage.setItem("stops", JSON.stringify(newStops))

    setResults({ isLoading : false, stop : resJson })
  }

  return (
    <div className="stop-form">
      <form onSubmit={(event) => handleSubmit(event, value)}>
        <input name="stop" type="text" placeholder="Codigo del paradero"
        className="form-control" value={value} 
        onChange={(event) => setValue(event.target.value)}/>
        <div className="d-flex justify-content-end my-2">
          <button className="btn btn-warning mx-2" onClick={saveStop}>Agregar</button>
          <button className="btn btn-primary " type="submit">Buscar</button>
        </div>
      </form>
    </div>
  )
}

export default BuscarParada