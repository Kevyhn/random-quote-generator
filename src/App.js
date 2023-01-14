import React, {useState, useEffect} from 'react';
import './App.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowRightLong, faRotate} from '@fortawesome/free-solid-svg-icons';

function App() {

  const [quote, setQuote] = useState([]);
  const [more, setMore] = useState(false);

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    setQuote(undefined);
    setMore(false);

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.REACT_APP_API_KEY}`,
        'X-RapidAPI-Host': `${process.env.REACT_APP_API_HOST}`
      }
    };

    fetch('https://random-quote-generator2.p.rapidapi.com/randomQuote', options)
      .then(response => response.json())
      .then(response => setQuote(response[0]))
      .catch(err => console.error(err));
  }

  const showMore = () => {
    if (more === false) setMore(true)
    else setMore(false)
  };
  
  return (
    <div className="App">
      <div className="btn-container">
        <button onClick={getQuote}>
          random
          <FontAwesomeIcon icon={faRotate}/>
        </button>
      </div>
      {
        quote !== undefined ? (
          <div className="quote-container">
          {
            more === true ? (
              <h3 className="author-name">{quote.Author}</h3>
            ) : ''
          }
          <p className="quote">"{quote.Quote}"</p>
          {
            more === true ? (
              <div>
                <p className="quote">"{quote.Quote}"</p>
                <p className="quote">"{quote.Quote}"</p>
              </div>
            ) : (
              <div className="author-container" onClick={showMore}>
                <div className="author">
                  <h3>{quote.Author}</h3>
                  <p>{quote.Tags}</p>
                </div>
                <FontAwesomeIcon icon={faArrowRightLong}/>
              </div>
            )
          }
          </div>
        ) : (
          <div className="spinner"></div>
        )
      }
    </div>
  );
}

export default App;
