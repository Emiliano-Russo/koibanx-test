import React, { useEffect, useState } from "react";
import "./App.css";
import { Table } from "./components/Table/Table";
import { Search } from "./components/Search/Search";
import "antd/dist/antd.css";
import { Store, fake_api } from "./fake_api";
import { Button } from "antd";

function App() {
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [stores, setStores] = useState<Store[]>([]);

  useEffect(() => {
    const response = fake_api.getStores(actualPage);
    setStores(response.data);
    setTotalPages(Math.ceil(response.pages));
  }, [actualPage]);

  const changeTextHandler = (text: string) => {
    const url = process.env.REACT_APP_URL;
    //Return documents that matches at least one of the elements in an array field.
    const query = `${url}?q={'store':{'$elemMatch':{'ID':'${text}', 'CUIT':'${text}', 'Comercio':'${text}'}}}`;
    console.log(query);
  };

  const changeCheckHandler = (value: boolean) => {
    value
      ? setStores((prev) => {
          return prev.filter((value) => value.Activo);
        })
      : setStores(fake_api.getStores(actualPage).data);
  };

  return (
    <div className="App">
      <Search onChange={changeTextHandler} onChangeCheckBox={changeCheckHandler} />
      <Table data={stores} page={actualPage} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button disabled={actualPage === 1} onClick={() => setActualPage((prev) => prev - 1)}>
          Prev
        </Button>
        <Button disabled={actualPage === totalPages} onClick={() => setActualPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
