import axios from "axios"
import { useEffect, useState } from "react"

const Search = ({searchQuery, setSearchQuery}) => {
  const handleSearchQuery = (event) => setSearchQuery(event.target.value)

  return(
    <div>
      <input value={searchQuery} onChange={handleSearchQuery} type="text" />
    </div>
  )
}

/*
  It's a bit of a shortcut to showing more details about the country, but it works
  Can't really think of a situation where you'd need to keep your old search query while viewing the details
  Otherwise, I reckon the whole application would need refactoring
*/
const CountrySnippet = ({country, setSearchQuery}) => {
  return (
    <li> {country.name.common} <button onClick={() => setSearchQuery(country.name.common)}> Show more </button> </li> 
  )
}

const WeatherPanel = ({capitalLatitude, capitalLongitude, capitalName}) => {
  const [temperature, setTemperature] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${capitalLatitude}&longitude=${capitalLongitude}&current=temperature_2m`)
      .then((response) => {
        setTemperature(response.data.current.temperature_2m)
      })
  }, []) 

  return (
    <div>
      <h2> Weather in {capitalName} </h2>
      {!temperature 
      ? (<></>)
      : (<>{temperature}°C</>)}
    </div>
  )
}

const CountryPanel = ({country}) => {
  //for visibility with flags that have white in them
  const flagStyle = {
    border: "2px solid black",
    height: "250px"
  }

  return (
    <div>
      <div>
        <h1>
          {country.name.common}
        </h1>
        <h2>
          {country.name.official}
        </h2>
      </div>
      <div>
        <h3>Facts: </h3>
        <p> Capital: {country.capital[0]} </p>
        <p> Population: {country.population} </p>
        <p> Land area: {country.area} km<sup>2</sup></p>
      </div>
      <div>
        <h3>Languages: </h3>
        <ul>
          {Object.values(country.languages).map((language) => (<li key={language}>{language}</li>))}
        </ul>
      </div>
      <img style={flagStyle} src={country.flags.svg ? country.flags.svg : country.flags.png} alt={`Flag of ${country.name.common}`} />
      <WeatherPanel capitalLatitude={country.capitalInfo.latlng[0]} capitalLongitude={country.capitalInfo.latlng[1]} capitalName={country.capital[0]}/>
    </div>
  )
}

const SearchResults = ({searchQuery, setSearchQuery, countries}) => {
  if(searchQuery === "") return 

  /*
  I'm not sure if this being just a let variable is the correct way to go about it
  However if I'm not mistaken if this was a state it would cause a lot more rerenders than needed, as the search bar already causes a rerender
  That being said, it doesn't seem to create any unexpected side effects
  */
  let matches = []

  countries.map((country) => {
    if(searchQuery.toLowerCase() === country.name.common.toLowerCase().substring(0, searchQuery.length)) {
      matches = matches.concat(country)
    }
  })

  if(matches.length === 1) {
    return(
      <div>
        <CountryPanel country={matches[0]}/>
      </div>
    )
  }

  if(matches.length === 0) {
    return(
      <div>
        <p>No countries match your search</p>
      </div>
    )
  }

  return(
    <div>
      {matches.length > 10
      ? <p> Too many matches, please enter a more specific search </p>
      : matches.map((country) => <CountrySnippet key={country.cca2} country={country} setSearchQuery={setSearchQuery}/>)}
    </div>
  )  
}


const App = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <div>
        Find countries: <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery}/> 
        <SearchResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} countries={countries}/>
      </div>
    </>
  )
}

export default App
