import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserInfo } from "../../store/store";
import axios from "axios";
import Transaction from "./Transaction.jsx";


function TransactionList() {
  const { USER_ID } = useContext(UserInfo);
  const [transactionList, setTransactionList] = useState([]);
  const [list, setList] = useState([]);
  const [status, setStatus] = useState("Delivered");
  useEffect(() => {
    axios
      .post("http://localhost:3000/transaction", { userId: USER_ID })
      .then((res) => {
        // console.log(res)
        setTransactionList(res.data.transactionList);
      })
      .catch((err) => console.log(err));
  }, [USER_ID]);

  useEffect(() => {
    const l = transactionList.filter(t => t.status === status);
    setList(l)
    console.log(list)
  }, [transactionList,status]);

  return (
    <div className="container border w-50">
      <div
        className="border-bottom d-flex justify-content-around align-items-center"
        style={{ height: "3rem" }}
      >
        <h4 className="" onClick={() => setStatus("Delivered")}>
          Past
        </h4>
        <h4 onClick={() => setStatus("Delivering")}>Upcoming</h4>
      </div>
    {
      list.length!==0?
      <div>  
        {
        list.map((transaction, index) => {
          return (
            <Transaction transaction={transaction} key={index}></Transaction>
          );
        })}
      </div>
      :<center style={{'height':'5rem','marginTop':'5rem'}}>Opps!! No Orders</center>

      }
    </div>
  );
}

export default TransactionList;
