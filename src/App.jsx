import { useState, useEffect } from 'react';
import img1 from './assets/img-2.jpg';
import img2 from "./assets/img.jpg";
import img3 from "./assets/img-3.jpg";
import img4 from './assets/img-4.jpg';
import img5 from "./assets/img-5.jpg";

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState('');
  const [city, setCity] = useState('mumbai');
  const [bgimage, setBgimage] = useState(img5);

  const inputHandler = (e) => setInput(e.target.value);
  
  const buttonHandler = () => {
    setCity(input);
    setInput('');
  };

  const ApiKey = "da5d9ee6369049959ae112934240508";

  const fetchWeather = async () => {
    try {
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${city}&aqi=no`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const images = [img1, img2, img3, img4, img5];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setBgimage(images[i]);
      i = (i + 1) % images.length;
    }, 5000);

    return () => clearInterval(interval);
  }, []); // No dependency on bgimage to avoid unnecessary re-renders
  
  return (
    <div style={{ backgroundImage: `url(${bgimage})` }} className='parent'>
      <div className='div-container'>
        <h1>Weather <span className='heading'>Tracker</span></h1>
        
        <div className='input-container'>
          <input type='text' placeholder='Enter Place' onChange={inputHandler} value={input} />
          <button onClick={buttonHandler}>Search</button>
        </div>

        <p>LOCATION: <span className='style'>{data?.location?.name}</span></p>
        <img src={data?.current?.condition?.icon} alt="Weather Icon" />
        <p className='detail'>{data?.current?.condition?.text}</p>
        <p>TEMPERATURE: <span className='style'>{Math.ceil(data?.current?.temp_c)} &deg;C</span></p>
        <p>HUMIDITY: <span className='style'>{data?.current?.humidity}</span></p>
      </div>
    </div>
  );
}

export default App;
