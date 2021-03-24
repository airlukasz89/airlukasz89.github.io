import React, { useState } from 'react';

import MapWrapper from './MapWrapper';
import DatePicker from './DatePicker';
import Forecast from './Forecast';
import Footer from './Footer';

import '../App.css';

const App = () => {
  const [position, setPosition] = useState([52.422058, 16.973800]);

  const [date, setDate] = useState(new Date());
  // state  {position: [52.422058, 16.973800]


  const handleChangePosition = (newPosition) => (
    setPosition(newPosition)
    // this.setState({
    //   position: [1, 1]
    // })
  )


  return (

    <div className="app">
      <header>
        {<MapWrapper position={position} onClick={handleChangePosition} />}
      </header>
      <main>
        <aside>
          {<DatePicker />}
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
