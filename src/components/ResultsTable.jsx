import { useEffect, useState } from "react"

const TR = ({ children }) => {
  const { meters_distance, min_arrival_time, max_arrival_time, id } = children   

  return (
    <tr>
      <td>{ id }</td>
      <td>{ meters_distance / 1000 } Km</td>
      <td>{ min_arrival_time } / { max_arrival_time } Min</td>
    </tr>
  )
}

const ResultsTable = ({ children }) => {
  const [ buses, setBuses ] = useState([])
  const { id, name, services } = children  

  useEffect(() => {
    const buses = []
    for (let service of services) {
      if (service.valid) {
        service.buses = service.buses
        .map(({ meters_distance,min_arrival_time,max_arrival_time , id }) => 
        ({
          meters_distance, 
          min_arrival_time, 
          max_arrival_time, 
          id : service.id, 
          patent : id 
        }))

        buses.push(...service.buses)
      }
    }
    setBuses(buses.sort((b1, b2) => b1.meters_distance < b2.meters_distance ? -1 : 1))
  }, [ children ])

  return (
    <div className="results-table">
      <div className="">
        <h3 className="text-center bg-info p-2">{ name } <span className="fst-italic fs-6 fw-light ">{ id }</span></h3>
      </div>
      { 
        buses.length ? 
        <div className="table-responsive">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th>Recorrido</th>
                <th>Distancia</th>
                <th>Tiempo estimado</th>
              </tr>
            </thead>
            <tbody>
              {buses.map(bus => <TR key={bus.patent}>{bus}</TR>)}
            </tbody>
          </table>
        </div> : <h4 className="text-center">No hay buses disponibles</h4>
      }
    </div>
  )
}

export default ResultsTable