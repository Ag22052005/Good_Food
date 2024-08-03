import React, { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction.jsx";

function TransactionList() {
  const [transactionList, setTransactionList] = useState([]);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("Delivered");

  const toggleHistory = ()=>{}
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`${import.meta.env.VITE_HOST_URL}/transaction`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res)
        setTransactionList(res.data.transactionList);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if(status === 'Delivered'){
      document.getElementById('past').style.backgroundColor ='rgb(223, 223, 223)'
      document.getElementById('upcoming').style.backgroundColor ='transparent'
    }else{
      document.getElementById('past').style.backgroundColor ='transparent'
      document.getElementById('upcoming').style.backgroundColor ='rgb(223, 223, 223)'
    }
    const l = transactionList.filter((t) => t.status === status);
    setList(l);
    console.log(list);
  }, [transactionList, status]);

  return (
    <div className=" TransactionList-cont container w-50">
      <div
        className="border-bottom d-flex justify-content-around align-items-center"
        style={{ height: "3rem" }}
      >
        <h4
          id="past"
          onClick={() => {
            setStatus("Delivered");
          }}
        >
          Past
        </h4>
        <h4 id="upcoming" onClick={() => setStatus("Delivering")}>Upcoming</h4>
      </div>
      {list.length !== 0 ? (
        <div>
          {list.map((transaction, index) => {
            return (
              <Transaction transaction={transaction} key={index}></Transaction>
            );
          })}
        </div>
      ) : (
        <center style={{ height: "5rem", marginTop: "5rem" }}>
          Opps!! No Orders
        </center>
      )}
    </div>
  );
}

export default TransactionList;
