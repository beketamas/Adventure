import { useEffect, useState } from 'react'
import './App.css'
import { Character, getData, postData } from './services/UserService'
const BASE_URL = "https://8j1pzk0j-8000.euw.devtunnels.ms";


function App() {

  const [data, setData] = useState<Character | undefined>()

  useEffect(()=> {
    getData().then(res => setData(res))
  }, [])

  const posztolas = (coice_id:number) =>{
    if(!data) return
    postData(data.player_id, coice_id).then(res => setData(res));
  }

  return (
    <div>
      <div>Player ID: {data?.player_id}</div>
      <div>Player Health: {data?.health}</div>
      <div>Items: {data?.items}</div>
      <div>Description: {data?.current_location.description}</div>
      <img style={{width: "200px", height: "200px"}} src={`${BASE_URL}${data?.current_location.image}`} />
      <div>Location Name: {data?.current_location.name}</div>
      <div>Choice ID: {data?.current_location.choices.map(x => x.id)}</div><br />
      {data?.current_location.choices.map(x => (
        <div>
          <button onClick={()=>posztolas(x.id)}>{x.text}</button>
        </div>
      ))}
    </div>
  )
}

export default App
