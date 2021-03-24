import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';


import MapWrapper from './MapWrapper';
import Forecast from './Forecast';
import Footer from './Footer';

import '../App.css';
import 'react-calendar/dist/Calendar.css';

const App = () => {
  const [position, setPosition] = useState([52.422058, 16.973800]);

  const [date, setDate] = useState(new Date());
  // state  {position: [52.422058, 16.973800]

  const apiKey = '1e5c1d3bb87cf0a80418d12c9f172264';



  const handleChangePosition = (newPosition) => (
    setPosition(newPosition)
    // this.setState({
    //   position: [1, 1]
    // })
  )




  useEffect(() => {
    console.log(position);
    console.log(date);
    fetch(`http://history.openweathermap.org/data/2.5/history/city?lat=${position[0]}&lon=${position[1]}&type=hour&start=${date.getTime()}&end=${date.getTime()}&appid=${apiKey}`)

      .then(response => response.json())
      .then(data => console.log(data));
  }, [date, position])

  return (

    <div className="app">
      <header>
        {<MapWrapper position={position} onClick={handleChangePosition} />}
      </header>
      <main>
        <aside>

          <Calendar
            onChange={setDate}
            value={date}
          />

        </aside>
        <section className="date">
          {<Forecast />}
        </section>
      </main>
      <footer>{<Footer />}</footer>
    </div>

  );
}

export default App;
