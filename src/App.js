import logo from './logo.svg';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

function App() {

  let [city, setCity] = useState('')
  let [wdetails, setWdetails] = useState()
  let [isloading,setIsloading]=useState(false)
  const getnewData = (event) => {
    event.preventDefault();
    setIsloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
      .then((res) => res.json()).then((finalres) => {
        if (finalres.cod == '400' || finalres.cod == '404') {
          setWdetails(undefined)
        }
        else {
          setWdetails(finalres)
        }

       setIsloading(false)

      })
      
setCity('')


  }
  return (
    <div className=" w-[100%] h-[100vh] bg-[#4aacb1]">
      <ToastContainer></ToastContainer>
      <div className='max-w-[1320px] mx-28'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>
        <form className='space-x-1 ' onSubmit={getnewData}>
          <input type='text' placeholder='City Name' className='h-8 w-64 p-2 px-4' value={city} onChange={(evt) => { setCity(evt.target.value) }}></input><button className='h-8 p-1 w-20 bg-slate-800 text-white font-bold'>Submit</button>
        </form>
        <div className='bg-white h-48 w-80 mt-16 ml-96 p-6 shadow-lg relative'>
          <img src='https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif' width={100} className={`absolute left-48 ${isloading?'':'hidden'}`}></img>
          {
            wdetails !== undefined
              ?

              <>
                <h3 className='text-xl font-bold ml-3'>{wdetails.name}<span className='ml-1 bg-yellow-400'>{wdetails.sys.country}</span></h3>
                <h2 className='text-2xl font-bold ml-3 mt-2'>
                  {`${wdetails.main.temp}°C`}
                </h2>
                <img src={`http://openweathermap.org/img/w/${wdetails.weather[0].icon}.png`}></img>
                <p className='ml-2 mt-2 text-lg font-semibold'>{wdetails.weather[0].description}</p>

              </>
              :
              <h2>No City have found</h2>
          }
        </div>

      </div>
    </div>
  );
}

export default App;
