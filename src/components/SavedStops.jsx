const apiUrl = 'https://api.xor.cl/red'

const SavedStops = ({ children, setResults, setStops }) => {
  const handleClick = async (stop) => {
    setResults({isLoading : true, stop : {}})
    const res = await fetch(`${apiUrl}/bus-stop/${stop}`)
    const resJson = await res.json()
    setResults({ isLoading : false, stop : resJson })
  }

  const delStop = (stop) => {
    let savedStops = JSON.parse(localStorage.getItem("stops"))
    savedStops = savedStops.filter(saved => saved.stop !== stop)

    localStorage.setItem("stops", JSON.stringify(savedStops))
    setStops(savedStops)
  }

  return (
    <div className="my-4">
      {
        children.map(({ stop, name }) => 
          <div className="p-1" key={stop}>
            <button onClick={() => handleClick(stop)} className="btn btn-success me-1">
              {name}
            </button>
            <button className="btn btn-danger fw-light" onClick={() => delStop(stop)}>✕</button>
          </div>
        )
      }
      
    </div>
  )
}

export default SavedStops