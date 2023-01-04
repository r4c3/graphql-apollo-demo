import { useState } from 'react';
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

export default function App() {
  //* client init
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://countries.trevorblades.com'
  });
  
  //* def query
  const LIST_COUNTRIES = gql`
    {
      countries {
        name
        code
      }
    }
  `;
  
  //* render selector
  function CountrySelect() {
    const [country, setCountry] = useState('US');
    const {data, loading, error} = useQuery(LIST_COUNTRIES, {client});

    if (loading || error) {
      return <p>{error ? error.message : 'Loading countries...'}</p>;
    }

    const styles = {
      select: {
        fontSize: '30px',
        transform: 'translateY(-20px)'
      }
    }

    return (
      <select style={styles.select} value={country} onChange={event => setCountry(event.target.value)}>
        {data.countries.map((country: any) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    );
  }

  const styles = {
    container: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  };

  return (
    <div style={styles.container}>
      <CountrySelect />
    </div>
  );
}