import React, { useEffect, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import { useData } from "../../Context/DataContext";

const Country = (props) => {
  const { ConvertValue } = useData();
  const [item, setItem] = useState(props.item);

  useEffect(() => {
    const fetchData = () => {
      const calculatedItem = Array.isArray(item.currency)
        ? item.currency.map(
            async (i) =>
              await ConvertCurrencyValue(
                ConvertValue.Value,
                ConvertValue.From,
                i.code
              )
          )
        : "";

      Promise.all(calculatedItem).then((values) => {
        setItem({ ...item, convertedValue: values.join("|") });
      });
    };
    if (ConvertValue.Value > 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ConvertValue]);
  console.log(item);
  return (
    <TableRow>
      <TableCell>{item.country}</TableCell>
      <TableCell>{item.capital}</TableCell>
      <TableCell>{item.population}</TableCell>
      <TableCell>
        {Array.isArray(item.currency)
          ? item.currency.map((i) => `[${i.name} ${i.symbol}]`).join("")
          : ""}
      </TableCell>
      {ConvertValue.Value > 0 ? (
        <TableCell>{item.convertedValue}</TableCell>
      ) : null}
    </TableRow>
  );
};
const ConvertCurrencyValue = async (Value, FromCurrency, ToCurrency) => {
  const apiKey = "08b7b782275900ddc58db097";
  var requestOptions = {
    method: "GET"
  };
  const _result = await fetch(
    `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${FromCurrency}/${ToCurrency}/${Value}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("error", error));
  return _result
    ? _result.hasOwnProperty("conversion_result")
      ? _result["conversion_result"]
      : _result.hasOwnProperty("error-type")
      ? _result["error-type"]
      : "N/A"
    : "N/A";
};
export default Country;
