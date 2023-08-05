const Country = ({ name, showDetails }) => {
        return (
            <li>
                {name} <button onClick={showDetails}>Show Details</button>
            </li> 
        )
    }
  export default Country