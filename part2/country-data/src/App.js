import './App.css';
import react, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState({value: ""})
  const [singleSelect, setSingleSelect] = useState({state: false, country: ""});
  
  //loads countries from API
  const hook = () => {
    setCountries([])
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(countries.concat(response.data))
      })
  }
  useEffect(hook, []);

  console.log(countries)

  //controlled search component
  const handleSearch = (e) => {
    const value = e.target.value;
    console.log(value)
    setSearchQuery({
      ...searchQuery,
      value: value
    })
  }

  //show button
  const selectSingleCountry = (e) => {
    console.log(e.target.name)
    setSingleSelect({
      ...singleSelect,
      state: true,
      country: countries.filter(country => country.name.common === e.target.name)
    })
  }

  console.log(singleSelect)

  //filter full list of countries using search
  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchQuery.value))


  return (
    <div>
      <h1>Country data</h1>
      <span>find countries</span> <input onChange={handleSearch}></input>
      <p>{countriesToShow.length}</p>
      {(singleSelect.state) ? <CountryFull country={singleSelect.country[0]}/> : <CountriesList countries={countriesToShow} showSingle={selectSingleCountry}/>}
    </div>
  );
}

//search results displau
const CountriesList = ({ countries, showSingle }) => {
  return(
    <div>
      {(countries.length < 10) //if filtered list of countries is less than 10
        ? (countries.length === 1) //but if filtered list =1 
        ? <CountryFull country={countries[0]}/> //show a full country
        : countries.map(country => <CountrySingle country={country} showSingle={showSingle}/>) //if it's more than 1, show list
        //if it's more than 10 show copy
        : <p>Too many results - narrow query</p>} 
    </div>
  )
}

//entry for country in search results
const CountrySingle = ({ country, showSingle }) => {
  return <><p key={country.cca3}>{country.name.common}</p><button name={country.name.common} onClick={showSingle}>show</button></>
}

//entry for country when one result / click to show
const CountryFull = ({ country }) => {

  console.log(country)
  const languages = Object.entries(country.languages)

  return (
    <div>
      <h2 key={country.alpha2Code}>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages spoken</h3>
      <ul>
        {languages.map(languagepair => 
          <li key={languagepair[0]}>{languagepair[1]}</li>
          )}
      </ul>
      <img style={{width: "100px"}} src={country.flags.png}></img>
      <WeatherReport city={country.capital}/>
    </div>
  )
}

const WeatherReport = ({ city }) => {
  
  const [weather, updateWeather] = useState("")

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`)
      .then(response => {
        updateWeather(response.data.current)
      })
  }

  console.log(weather)

  useEffect(hook, []);

  return (
    <div>
      <h3>Weather report</h3>
      <p><strong>temperature:</strong> {weather.temperature} Celsius</p>
      <img style={{width: "50px", }} src={weather.weather_icons}></img>
      <p><strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )

}

export default App;