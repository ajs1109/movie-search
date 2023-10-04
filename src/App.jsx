import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Button} from './components/ui/button'
import {Card,CardContent,CardDescription,CardHeader,CardFooter,CardTitle} from './components/ui/card'
import axios from 'axios'
import { Input } from './components/ui/input'

function App() {
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState("");
    const [results, setResults] = useState([]);
      const fetchFromAPI = async (keyWord) => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${keyWord}&include_adult=false&language=en-US&page=1&api_key=702f64c52ff52fa5421054b97038aceb`)
        setResults(data.results);
      }
      useEffect(() => {
        try{
          setLoading(true)
          fetchFromAPI(name);
        } catch(e) {
          console.log(e);
        }
        finally{
          setLoading(false);
        }
      
      }, [name])
      
      console.log(results);
  return (
    <div className='flex-col items-center m-auto'>
      <h1 className='mb-4 font-bold text-xl'>Movie Search Application</h1>
      <div className="m-auto my-4 max-w-[350px] min-w-[350px]">
      <Input type="text" placeholder="Movie Name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>

  <div className='flex flex-wrap justify-around items-center m-auto '>
  {
      !loading && results.map((item,idx) => (
        <Card className="w-[350px] rounded-xl h-[380px] mb-6">
          {
           item.backdrop_path ? <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} className="rounded-t-xl" alt="" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png" className="rounded-t-xl" alt="" />
          }
          
        <CardHeader>
          <CardTitle>{item.original_title}</CardTitle>
          <CardDescription className="text-justify max-h-[100px] line-clamp-6">{item.overview}</CardDescription>
        </CardHeader>
      </Card>
      ))
    }
  </div>
      

    </div>
  )
}

export default App
