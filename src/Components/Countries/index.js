import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { useTranslation } from "react-i18next";

const Countries = (props) => {
  const { t } = useTranslation();
  const { SEKValue } = props;
  const [Contries, setContries] = useState([]);
  const [ShowCalculatedValue, setShowCalculatedValue] = useState(
    SEKValue && SEKValue > 0
  );
  useEffect(() => {
    setShowCalculatedValue(SEKValue && SEKValue > 0);
    const fetchData = async () => {
      const calculatedList = Contries.map(async (item) => {
        return {
          ...item,
          convertedValue: await ConvertCurrencyValue(
            SEKValue,
            "SEK",
            item.currencyCode
          )
        };
      });
      Promise.all(calculatedList).then((values) => {
        setContries(values);
      });
    };
    if (ShowCalculatedValue) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SEKValue]);
  useEffect(() => {
    const fetchData = async () => {
      const _return = await fetch("https://restcountries.com/v3.1/all", {
        method: "GET"
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log("error", error));
      setContries(
        _return.map((item) => ({
          country: item.name.official,
          capitol: item.capital ? item.capital[0] : "N/A",
          currency: item.currencies
            ? item.currencies[Object.keys(item.currencies)[0]].name
            : "N/A",
          currencyCode: item.currencies ? Object.keys(item.currencies) : "N/A",
          currencySymbol: item.currencies
            ? item.currencies[Object.keys(item.currencies)[0]].symbol
            : "N/A"
        }))
      );
    };
    fetchData();
  }, []);

  return (
    <Table aria-label="collapsible table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>{t("Country")}</TableCell>
          <TableCell>{t("Capitol")}</TableCell>
          <TableCell>{t("Currency")}</TableCell>
          {ShowCalculatedValue ? (
            <TableCell>{t("ConvertedValue")}</TableCell>
          ) : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {Contries.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.country}</TableCell>
            <TableCell>{item.capitol}</TableCell>
            <TableCell>{`${item.currency} (${item.currencySymbol})`}</TableCell>
            {ShowCalculatedValue ? (
              <TableCell>{item.convertedValue}</TableCell>
            ) : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const ConvertCurrencyValue = async (SEKValue, FromCurrency, ToCurrency) => {
  var myHeaders = new Headers();
  myHeaders.append("apikey", "dOzX0aRyYMwShVPf2ZW3Fois9tO2jKOe");
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders
  };
  const _result = await fetch(
    `https://api.apilayer.com/fixer/convert?to=${ToCurrency}&from=${FromCurrency}&amount=${SEKValue}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => console.log("error", error));
  return _result["result"] || "N/A";
};
export default Countries;
