import { useEffect, useState } from 'react';
import axios from 'axios'
import './App.css';



function App() {
  const api = 'https://api.themoviedb.org/4/discover/movie?api_key=c8112abd3848ec925ccbd87f87205c7a';
  const searchApi = 'https://api.themoviedb.org/4/search/movie?api_key=c8112abd3848ec925ccbd87f87205c7a&query='
  const [database, setDatabase] = useState([]);
  const [search, setSearch] = useState("");

  async function getUser() {
    try {
      const response = await axios.get(api);
      setDatabase(response.data.results)
    } catch (error) {
      console.log(error);
    }
  }

  async function searchDatabaseFunc(){
    try {
      const searchResponse = await axios.get(searchApi + search);
      setDatabase(searchResponse.data.results)
      setSearch('')
      
    } catch (error) {
      console.error(error);
    }
  }

  const searchHandler = (e)=>{
    setSearch(e.target.value)
  }

  useEffect(()=>{
    getUser();
  }, [])

  return (
    <div className="App">
      <nav>
        
        <h1>Navigation</h1>

 
        
        <div>
        <input type='text' onChange={searchHandler} value={search} placeholder='enter movies name'></input>
        <button onClick={searchDatabaseFunc}>Search</button>
        </div>

        
      </nav>

      <main>
        <h1>Movies Card</h1>
        <div className='movie-card-container'>{database.map((data)=>{
         return (
          <div key={data.id}  className='movie-card'>

            <div className='movie-img-container'>
            <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} className='movie-img'></img>

            </div>

          <h3>{data.title}</h3> 
          <h4>{data.original_language}</h4> 

           </div>
           )
        })}</div>
      </main>
    </div>
  );
}

export default App;
