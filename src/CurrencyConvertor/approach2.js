import "./styles.css";
import {useEffect,useRef,useState} from 'react'
export default function App() {
  const [data,setData] = useState(null)
  const[amount,setAmount] = useState(0);
  const[base,setBase] = useState("");
  const[convertTo,setConvertTo] = useState("");
  const swapCurrency = () =>{
    setBase(convertTo);
    setConvertTo(base);
  }
  useEffect(() => {
  if(amount){
    var myHeaders = new Headers();
    myHeaders.append("apikey", "aazGGhivRxAqWDHhy1rXJWHEOPPIQ4bK");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${convertTo}&from=${base}&amount=${amount}`, requestOptions)
      .then(res=>res.json())
      .then(ans=>setData(ans))
  }
}, [amount,base,convertTo]);
console.log(data);
  return (
    <div className="App">
      {data && <h1>{data.result}</h1>}
      <h2>Start editing to see some magic happen!</h2>
      <input type='number' onChange={(e)=>{setAmount(e.target.value)}} />
      <input type='text' onChange={(e)=>{setBase(e.target.value)}} value={base}/>
      <input type='text' onChange={(e)=>{setConvertTo(e.target.value)}} value={convertTo}/>
      <button onClick={()=>{swapCurrency()}}>SWAP</button>
    </div>
  );
}
