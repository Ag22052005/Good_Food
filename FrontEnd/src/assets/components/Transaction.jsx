import React from "react";

function Transaction({transaction}) {

  let toggle = true;

  const handleItemNames = (e)=>{
    const ptag = e.target.parentElement
    if(toggle){
      ptag.setAttribute('style','max-height:auto;overflow:auto')
      toggle = false
    }
    else{
      ptag.setAttribute('style','max-height:24px;overflow:hidden')
      toggle = true
    }
  }

  return (
  <li className="d-flex border p-2 justify-content-around align-items-center m-1 Transaction-li" style={{'minHeight':'8rem'}}>
    <div className="w-75 d-flex justify-content-around flex-column">
    <h5>{transaction.status.toUpperCase()}</h5>
    <p className="Transaction-ItemName" style={{'maxHeight':'24px','overflow':'hidden'}} onClick={(e)=>handleItemNames(e)}>
      {
        transaction.itemsName.map((n,i)=>{
          return(<span key={i}> {n} |</span>)
        })
      }
    </p>
    <div className="d-flex w-50 justify-content-between">
      <p className="m-0">{transaction.date}</p>
      <p className="m-0">{transaction.time.toUpperCase()}</p>
    </div>
    </div>
    <div className="d-flex justify-content-center h-100 align-items-center Transaction-price" style={{'width':'20%'}}>
      <h3>₹ {transaction.price}/- </h3>
    </div>
  </li>
  )
}

export default Transaction;
