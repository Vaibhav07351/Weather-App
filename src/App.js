// https://openweathermap.org/  own api created 
//yarn add bootstrap

import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import { useEffect, useState } from "react";
import './App.css';
import LightModeIcon from '@mui/icons-material/LightMode';
import GrainIcon from '@mui/icons-material/Grain';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import WbCloudyOutlinedIcon from '@mui/icons-material/WbCloudyOutlined';
import styled from "@emotion/styled";
function App() {


  const apiKey = "6086d50fbba2d3733821a78f1593a611"       //openweathermap.org  vaibhav bhardwaj ->api key
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
      
    }).catch((err) => {
      alert("Location not found!")
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  const getWeatherIcon = () => {
  
    const weatherMain = data.weather[0].main;
    switch (weatherMain) {
      case "Clear":
        return <WbCloudyOutlinedIcon style={{color:"white" ,fontSize: "140px",}}/>;
      case "Clouds":
        return <WbCloudyIcon style={{color:"#00aeef" ,fontSize: "140px",}}/>;
      case "Rainy":
        return <GrainIcon style={{color:"blue" ,fontSize: "140px",}}/>;
      case "Sunny":
        return <LightModeIcon style={{color:"#ffc300" ,fontSize: "140px",}}/>;
      default:
        return <WbCloudyOutlinedIcon style={{color:"white" ,fontSize: "140px",}} />;
    }
  };


  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" placeholder="Enter Location Name"
            value={inputCity}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded wetherResultBox">
                      {/* Sunny Clouds Rainy Clear*/}
             {/* { */}
               {/* data.weather[0].main==='Cler'? */}
            {/* <img className="weathorIcon"
              src="https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png" />  */}
              {/* : ""} */}

            {/* { data.weather[0].main==='Sunny'? <LightModeIcon> h</LightModeIcon> : "asd"}
            { data.weather[0].main==='Rainy'? <GrainIcon> h</GrainIcon> : "asd"}
            { data.weather[0].main==='Clouds'? <WbCloudyIcon> h</WbCloudyIcon> : "asd"}
            { data.weather[0].main==='Clear'? <WbCloudyOutlinedIcon> h</WbCloudyOutlinedIcon> : "asd"}
            else ... */}
            
          
             {getWeatherIcon()}
           
            <h5 className="weathorCity">
              {data.name}
            </h5>


            <h6 className="weathorTemp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
          </div>
        </div>
      }

    </div>
  );
}

export default App;
