import React from 'react'
import "./main.css";
import Header from "./Header";
import Statistics from "./Statistics";
import Graph from "./Graph";
import Records from "./Records";

const Main = () => {
  return (
    <div className='checkout__main__container'>
        <Header />
        <Statistics />
        <Graph />
        <Records />
    </div>
  )
}

export default Main