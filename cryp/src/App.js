import './App.css';
import React, {useEffect,useState} from 'react'
import Coin from './Coin';

function App() {
  const [coinsList,setCoinsList] = useState([]);
  const [searchWord,setSearchWord] = useState("");
  // const [bitInfo,setBitInfo] = useState({});

  const getCoinList = async () => {
    try{
      let url = "https://api.coinstats.app/public/v1/coins?skip=0";

      let res = await fetch(url);
      let data = await res.json();

      // const {name} = data.coins[0];
      // const {icon} = data.coins[0];
      // const {symbol} = data.coins[0];
      // const {price} = data.coins[0];

      // const newBitInfo = {
      //   name,
      //   icon,
      //   symbol,
      //   price,
      // };

      // setBitInfo(newBitInfo);
      setCoinsList(data.coins)
    }

    catch(error){
      console.log(error);
    }

  }
  useEffect(()=>{

  },[])

  useEffect(()=>{
    let timerOut = setTimeout(()=>{
      getCoinList();
      
    },400);
    return () => clearTimeout(timerOut);
  },[]);
  
  const filteredCoins = coinsList.filter((e)=>{
    return e.name.toLowerCase().includes(searchWord.toLowerCase());
  })
  // width: 1200px;
  // max-width: calc(100% - 20px);
  // margin: 0 auto;
  // padding: 0 10px;
  
  return (
    
     <div className="App">
      <div className="cryptoHeader" style={{"display":"flex"}}>
        {/* <h2>Search The Bitcoins here</h2> */}
        <input
          type="text"
          placeholder="Search here"
          value={searchWord}
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
      />
       <button className="btn text-white bg-danger" style={{"backgroundColor": "red", "text":"white", "marginLeft" : "1rem" ,"height":"50px", "marginTop":"10px"}} onClick={() => { setSearchWord('') }}>X</button>
      </div>
      <div className="cryptoDisplay grid">
        {filteredCoins.map((e) => {
          
          return (
            <Coin  name={e.name}
            icon={e.icon}
            price={e.price}
            symbol={e.symbol}/>
          );
        })}
      </div>
      </div>
    
  );
}

export default App;
