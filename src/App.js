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
      console.log(database)
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

  const langHandler = (e) =>{
    const selectedLang = e.target.value
    const newDatabase = database.filter(el=>(el.original_language===selectedLang)? el:'')
    setDatabase(newDatabase)
    // console.log(newDatabase)
  }

  useEffect(()=>{
    getUser();
  }, [])



  return (
    <div className="App">
      <nav className='navigation'>
        
        <h1>Navigation</h1>

        <div>
          <h3>Language</h3>
        <input type="radio" id="en" name="language" value="en" onChange={langHandler}/>
        <label htmlFor="en">en</label>
        <input type="radio" id="ja" name="language" value="ja" onChange={langHandler}/>
        <label htmlFor="ja">ja</label>
        <input type="radio" id="hi" name="language" value="hi" onChange={langHandler}/>
        <label htmlFor="hi">hi</label>
        </div>

        <br />
 
        
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


          <h3>Title: {data.title}</h3> 
          <h4>Language: {data.original_language}</h4> 
          <h6>Ratings: {data.vote_average}</h6>

           </div>
           )
        })}</div>
        <h1>Watchlist</h1>
      </main>
    </div>
  );
}

export default App;
