import React, { useState, useEffect } from "react";

export default function Table(props) {
  const dataForTable = props.data;
  const keys = ["ID", "Hash", "Datetime", "From", "Method", "To", "Quantity"];

  return (
    <table className="content-table">
      <tr key={"headers"}>
        {keys.map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {dataForTable.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table>
  );
}

/*
    <table>
      <tr key={"headers"}>
        {Object.keys(props.data[0]).map((key) => (
          <th>{key}</th>
        ))}
      </tr>
      {props.data.map((item) => (
        <tr key={item.id}>
          {Object.values(item).map((val) => (
            <td>{val}</td>
          ))}
        </tr>
      ))}
    </table>
*/
