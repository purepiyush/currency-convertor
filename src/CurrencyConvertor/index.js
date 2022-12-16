import React, { useState, useEffect } from "react";
import { Card } from "antd";

const Convertor = () => {
  const currencies = ["USD", "SGD", "PHP", "EUR", "INR","AUD"]
  const [data,setData] = useState(null)
  const[amount,setAmount] = useState(0);
  const[base,setBase] = useState("INR");
  const[convertTo,setConvertTo] = useState("USD");
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
    <div className="container">
      <div className="row">
        <div style={{ padding: "30px", background: "#ececec" }}>
          <Card
            title="CURRENCY CONVERTOR"
            bordered={false}
            style={{ width: "80vw"}}
          >
            <h5>
              {amount} {base} is equivalent to {data ? data.result : 0}
            </h5>
            <h3>
              {convertTo}
            </h3>
            <p>As of {data ? data.date : ""}</p>
            <div className="row">
              <div className="col-lg-10">
                <form className="form-inline mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e)=>{setAmount(e.target.value)}}
                    className="form-control form-control-lg mx-5"
                  />
                  <select
                    name="base"
                    value={base}
                    onChange={(e)=>{setBase(e.target.value)}}
                    className="form-control form-control-lg"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
                <form className="form-inline mb-4">
                  <input
                    disabled={true}
                    value={data ? data.result.toFixed(2) : 0}
                    className="form-control form-control-lg mx-5"
                  />
                  <select
                    name="convertTo"
                    value={convertTo}
                    onChange={(e)=>{setConvertTo(e.target.value)}}
                    className="form-control form-control-lg"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <div className="col-lg-2 align-self-center">
                <h1 onClick={swapCurrency} style={{ cursor: "pointer" }}>
                  &#8595;&#8593;
                </h1>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Convertor;