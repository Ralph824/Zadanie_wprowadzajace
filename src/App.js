import './App.css';
import React, { useMemo } from "react";
import dayjs from 'dayjs';
import { useState } from "react";
import './index.css';

const GAS_PRICE = 5.0;
const BASE_PRICE = 100;
const AVG_FUEL = 10;
const CARS_LEFT = 3;


const calcInsurance = (km_amount, dl_year, nr_days, car_standard) => {
  if(!km_amount || !dl_year || !nr_days || !car_standard) return;
  if(dayjs().year()-dl_year < 3 && car_standard==2) return "Nie można wypożyczyć samochodu w tym standardzie";
  
  const fuel_price = (km_amount/AVG_FUEL)*GAS_PRICE;
  const amount_of_cars_tax = CARS_LEFT < 3 ? 1.15 : 1;
  const five_year_dl_tax = (dayjs().year()-dl_year < 5) ? 1.2 : 1;
  
  const result = (BASE_PRICE *nr_days*car_standard) * five_year_dl_tax * amount_of_cars_tax + fuel_price;
  return result;
}

function App() {
  const [km_amount, set_km_amount] = useState('');
  const [dl_year, set_dl_year] = useState('');
  const [car_standard, set_car_standard] = useState('1');
  const [start_date, set_start_date] = useState('');
  const [end_date, set_end_date] = useState('');

  const date1 = dayjs(start_date);
  const date2 = dayjs(end_date);
  const nr_days = date2.diff(date1, 'day');

  const calcResult = useMemo(()=>
    calcInsurance(km_amount, dl_year, nr_days, car_standard)
  ,[km_amount, dl_year, nr_days, car_standard]);

  return (
    <div className="App">
      <div className='calculator'> 
      <div className='user_input'>

          <label for="km"> Ilość kilometrów: </label>   
            <input type="number" id="km"step="10" min="10" required   onChange={(e) => set_km_amount(e.target.value)} />   
          <label for="dl"> Rok otrzymania prawa jazdy:</label>
              <input type="number" name="dl" min="1900"  required value={dl_year} onChange={(e) => set_dl_year(e.target.value)}/> 
          <div className='date'>
            <label> Od:</label>
              <input type="date" onChange={(e) => set_start_date(e.target.value)}/> 
            <label> Do:</label>
              <input type="date" min={start_date} onChange={(e) => set_end_date(e.target.value)}/> 
          </div>
          <div className='cars'>
          <label for="car"> Wybierz standard: </label>
          <select id="car" name="car" onChange={(e) => set_car_standard(e.target.value)}>
              <option value="1">Basic</option>
              <option value="1.3">Standard</option>
              <option value="1.6">Medium</option>
              <option value="2">Premium</option>
          </select>
          </div>  
          </div>
          <div className='bg-blue-900 text-white flex flex-col justify-end text-lg items-end'> 
           {
            calcResult && typeof calcResult == 'number'  ? <> 
             <span> {`Cena Netto: ${calcResult} ZŁ`} </span>
            <span> {`Cena Brutto: ${calcResult*1.23} ZŁ`} </span>
            </> : calcResult && typeof calcResult == 'string' ? calcResult: "Podaj wszystkie dane"
           }
        </div>
        </div>
      </div>
  );
}
export default App;