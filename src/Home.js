import React, { useState, useEffect } from 'react';

import { ThemeContext } from './theme-context';
import { FaMoon, FaSearch } from 'react-icons/fa';

const Home = () => {
   const [data, setData] = useState([]);
   const [search, setSearch] = useState('');
   const [filteredStates, setFilteredStates] = useState(data);

   const { theme, toggle, dark } = React.useContext(ThemeContext);

   const api = 'https://restcountries.eu/rest/v2';

   useEffect(() => {
      const filter = data.filter((state) => {
         return state.name.toLowerCase().includes(search.toLowerCase());
      });

      setFilteredStates(filter);
   }, [search, data]);

   useEffect(() => {
      const filter = data.filter((state) => {
         return state.region.toLowerCase().includes(search.toLowerCase());
      });

      setFilteredStates(filter);
   }, [search, data]);

   useEffect(() => {
      fetch(api)
         .then((res) => res.json())
         .then((res) => {
            setData(res);
            console.log(res);
         });
   }, []);
   return (
      <div
         className='content'
         style={{
            backgroundColor: theme.backgroundColor,
            color: theme.color,
         }}
      >
         <header
            style={{
               backgroundColor: theme.DarkBlue,
               color: theme.color,
            }}
         >
            <div className='container'>
               <h1>Where in the world?</h1>
               <button
                  type='button'
                  onClick={toggle}
                  style={{
                     backgroundColor: 'none',
                     color: theme.color,
                     outline: 'none',
                  }}
                  data-testid='toggle-theme-btn'
               >
                  <FaMoon /> {!dark ? 'Dark' : 'Light'} Mode
               </button>
            </div>
         </header>
         <main className='main-container'>
            <div className='container input-section'>
               <div className='search-form'>
                  <FaSearch className='search-icon' />
                  <input
                     type='text'
                     placeholder='Search for a country...'
                     style={{
                        backgroundColor: theme.DarkBlue,
                        color: theme.color,
                     }}
                     aria-label='selectId'
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
               <form>
                  <select
                     id='cars'
                     name='cars'
                     aria-label='selectId'
                     style={{
                        backgroundColor: theme.DarkBlue,
                        color: theme.color,
                     }}
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  >
                     <option value='' disabled='disabled'>
                        Filter by Region
                     </option>
                     <option value='Africa'>Africa</option>
                     <option value='America'>America</option>
                     <option value='Asia'>Asia</option>
                     <option value='Europe'>Europe</option>
                     <option value='Oceania'>Oceania</option>
                  </select>
               </form>
            </div>
            <div className='container'>
               {filteredStates &&
                  filteredStates.map((item, index) => (
                     <div
                        className='card'
                        key={index}
                        style={{
                           backgroundColor: theme.DarkBlue,
                           color: theme.color,
                        }}
                     >
                        <img src={item.flag} alt={item.name} />
                        <ul>
                           <li>
                              <h4>{item.name}</h4>
                           </li>
                           <li>
                              <p>
                                 Population: <span>{item.population}</span>
                              </p>
                           </li>
                           <li>
                              <p>
                                 Region: <span>{item.region}</span>
                              </p>
                           </li>
                           <li>
                              <p>
                                 Capital: <span>{item.capital} </span>
                              </p>
                           </li>
                        </ul>
                     </div>
                  ))}
            </div>
         </main>
      </div>
   );
};

export default Home;
