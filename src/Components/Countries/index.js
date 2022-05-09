import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useData } from "../../Context/DataContext";

const Countries = () => {
  const { t } = useTranslation();
  const { ConvertValue } = useData();
  const [Contries, setContries] = useState([]);
  const [Order, setOrder] = useState({ field: "country", order: "asc" });
  useEffect(() => {
    if (Order.order === "asc") {
      let temp = Contries.sort((a, b) =>
        a[Order.field] < b[Order.field] ? -1 : 1
      );
      setContries([...temp]);
    } else {
      let temp = Contries.sort((a, b) =>
        a[Order.field] > b[Order.field] ? -1 : 1
      );
      setContries([...temp]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Order]);
  useEffect(() => {
    const fetchData = async () => {
      const calculatedList = Contries.map(async (item) => {
        return {
          ...item,
          convertedValue: await ConvertCurrencyValue(
            ConvertValue.Value,
            "SEK",
            item.currencyCode
          )
        };
      });
      Promise.all(calculatedList).then((values) => {
        setContries(values);
      });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ConvertValue]);
  useEffect(() => {
    const fetchData = async () => {
      const _return = await fetch("https://restcountries.com/v3.1/all", {
        method: "GET"
      })
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => console.log("error", error));
      setContries(
        _return
          .map((item) => ({
            country: item.name.official,
            capital: item.capital ? item.capital[0] : "N/A",
            population: item.population,
            currency: item.currencies
              ? item.currencies[Object.keys(item.currencies)[0]].name
              : "N/A",
            currencyCode: item.currencies
              ? Object.keys(item.currencies)
              : "N/A",
            currencySymbol: item.currencies
              ? item.currencies[Object.keys(item.currencies)[0]].symbol
              : "N/A"
          }))
          .sort((a, b) => (a["country"] < b["country"] ? -1 : 1))
      );
    };
    fetchData();
  }, []);

  return (
    <Table aria-label="collapsible table" size="small">
      <TableHead>
        <TableRow>
          <TableCell>
            {" "}
            <TableSortLabel
              onClick={() =>
                setOrder({
                  ...Order,
                  order: Order.order === "asc" ? "desc" : "asc",
                  field: "country"
                })
              }
              active
              direction={Order.field === "country" ? Order.order : "desc"}
            >
              {t("Country")}{" "}
            </TableSortLabel>
          </TableCell>
          <TableCell>{t("Capital")}</TableCell>
          <TableCell>{t("Population")}</TableCell>
          <TableCell>{t("Currency")}</TableCell>
          {ConvertValue.Value > 0 ? (
            <TableCell>{t("ConvertedValue")}</TableCell>
          ) : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {Contries.map((item, idx) => (
          <TableRow key={idx}>
            <TableCell>{item.country}</TableCell>
            <TableCell>{item.capital}</TableCell>
            <TableCell>{item.population}</TableCell>
            <TableCell>{`${item.currency} (${item.currencySymbol})`}</TableCell>
            {ConvertValue.Value > 0 ? (
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
  return _result["result"] || SEKValue;
};
export default Countries;
