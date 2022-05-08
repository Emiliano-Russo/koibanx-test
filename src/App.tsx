import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { Search } from "./components/Search/Search";
import "antd/dist/antd.css";
import { Data, info } from "./data";

function App() {
  const [dataInfo, setDataInfo] = useState<Data[]>([]);
  const [textFilter, setTextFilter] = useState("");
  const [onlyActives, setOnlyActives] = useState(false);

  useEffect(() => {
    setDataInfo(info);
  }, []);

  const changeTextHandler = (text: string) => {
    console.log("TEXT: " + text);
  };

  const changeCheckHandler = (value: boolean) => {
    if (value) {
      setDataInfo((prev) => {
        return prev.filter((value) => value.Activo);
      });
    } else {
      setDataInfo(info);
    }
  };

  const tableHeader = [
    "ID",
    "Comercio",
    "CUIT",
    "Concepto1",
    "Concepto2",
    "Concepto3",
    "Concepto4",
    "Concepto5",
    "Concepto6",
    "Balance Actual",
    "Activo",
    "Ultima Venta",
  ];

  return (
    <div className="App">
      <Search onChange={changeTextHandler} onChangeCheckBox={changeCheckHandler} />
      <Table data={dataInfo} headers={tableHeader} />
    </div>
  );
}

export default App;
