import Country from "./Country"
import CountryDetails from "./CountryDetails"

const Countries = ({list, showCountry, showDetails}) =>{

    if(list.length < 10 && list.length !== 1){
        return(
            <div>
                <ul>
                    {list.map(country =>
                        <Country
                            key={country.name.common}
                            name={country.name.common}
                            showDetails={() => showDetails(country.name.common)}
                        />
                    )}
                </ul>
                {showCountry.name && <CountryDetails country={showCountry} />}
            </div>
        )
    } else if(list.length === 1){
        return(
            <CountryDetails country={list[0]} />
        )
    } else{
        return(
            <p>List too long, specify further</p>
        )
    }
}

export default Countries