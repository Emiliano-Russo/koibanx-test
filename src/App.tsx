import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { SortState, Table, Field } from "./components/Table/Table";
import { Search } from "./components/Search/Search";
import "antd/dist/antd.css";
import { IStore, fake_api } from "./fake_api";
import { Button } from "antd";

interface SortedForm {
  field: Field;
  direction: SortState;
}

interface ActiveFilters {
  activesOnly: boolean;
  sorted: SortedForm;
  text: string;
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function App() {
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [stores, setStores] = useState<IStore[]>([]);
  const [filterSheet, setFilterSheet] = useState<ActiveFilters>({
    activesOnly: false,
    sorted: { direction: SortState.Nothing, field: Field.CUIT },
    text: "",
  });

  useEffect(() => {
    console.log("------ APP USE EFFECT -----");
    const response = fake_api.getStores(actualPage);
    setStores(applyFilters(response.data));
    setTotalPages(Math.ceil(response.pages));
  }, [filterSheet, actualPage]);

  const applyFilters = (storeList: IStore[]) => {
    let filteredStore = applyActiveFilter(storeList);
    filteredStore = applySort(filteredStore);
    return filteredStore;
  };

  const applyActiveFilter = (storeList: IStore[]) => {
    if (filterSheet.activesOnly) {
      return storeList.filter((value) => value.Activo);
    } else {
      return storeList;
    }
  };

  const applySort = (storeList: IStore[]) => {
    console.log(" *** applySort *** ");
    if (filterSheet.sorted.direction === SortState.Nothing) return storeList;
    const sortedArray = clone(stores).sort((a: IStore, b: IStore) => {
      return a[filterSheet.sorted.field] > b[filterSheet.sorted.field]
        ? 1
        : a[filterSheet.sorted.field] == b[filterSheet.sorted.field]
        ? 0
        : -1;
    });
    return filterSheet.sorted.direction === SortState.Acending ? sortedArray : sortedArray.reverse();
  };

  const changeTextHandler = (text: string) => {
    const url = process.env.REACT_APP_URL;
    //Return documents that matches at least one of the elements in an array field.
    const query = `${url}?q={'store':{'$elemMatch':{'ID':'${text}', 'CUIT':'${text}', 'Comercio':'${text}'}}}`;
    console.log(query);
    /*setFilterSheet((prev) => {
      const prevCloned: ActiveFilters = clone(prev);
      prevCloned.text = query;
      return prevCloned;
    });*/
  };

  const changeCheckHandler = (value: boolean) => {
    setFilterSheet((prev) => {
      const prevCloned = clone(prev);
      prevCloned.activesOnly = value;
      return prevCloned;
    });
  };

  const sortHandler = (field: Field, state: SortState) => {
    setFilterSheet((prev) => {
      const prevCloned = clone(prev);
      prevCloned.sorted = { field: field, direction: state };
      return prevCloned;
    });
  };

  const movePage = (forward: boolean) => {
    forward ? setActualPage((prev) => prev + 1) : setActualPage((prev) => prev - 1);
  };

  return (
    <div className="App">
      <Search onChange={changeTextHandler} onChangeCheckBox={changeCheckHandler} />
      <Table data={stores} page={actualPage} sort={sortHandler} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Button
          disabled={actualPage === 1}
          onClick={() => {
            movePage(false);
          }}
        >
          Back
        </Button>
        <Button
          disabled={actualPage === totalPages}
          onClick={() => {
            movePage(true);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default App;
