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
    const response = fake_api.getStores(actualPage);
    setStores(applyFilters(response.data));
    setTotalPages(response.pages);
  }, [filterSheet, actualPage]);

  const applyFilters = (storeList: IStore[]) => {
    let filteredStore = applyActiveFilter(storeList);
    filteredStore = applySort(filteredStore);
    filteredStore = applyText(filteredStore);
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
    if (filterSheet.sorted.direction === SortState.Nothing) return storeList;
    const sortedArray = storeList.slice(0).sort((a: IStore, b: IStore) => {
      return a[filterSheet.sorted.field] > b[filterSheet.sorted.field]
        ? 1
        : a[filterSheet.sorted.field] == b[filterSheet.sorted.field]
        ? 0
        : -1;
    });
    return filterSheet.sorted.direction === SortState.Acending ? sortedArray : sortedArray.reverse();
  };

  const applyText = (storeList: IStore[]) => {
    if (filterSheet.text.length === 0) return storeList;
    const array = storeList.filter((store) => {
      const resultComercio = store.Comercio.toLowerCase().includes(filterSheet.text.toLowerCase());
      const resultCUIT = store.CUIT.toLowerCase().includes(filterSheet.text.toLowerCase());
      const resultID = store.ID.toLowerCase().includes(filterSheet.text.toLowerCase());
      return resultCUIT || resultComercio || resultID;
    });
    return array;
  };

  const changeTextHandler = (text: string) => {
    const url = "https://api.koibanx.com/stores";

    //Return documents that matches at least one of the elements in an array field.
    const query = `${url}?q={'store':{'$elemMatch':{'ID':'${text}', 'CUIT':'${text}', 'Comercio':'${text}'}}}`;
    console.log(query);
    setFilterSheet((prev) => {
      const prevCloned: ActiveFilters = clone(prev);
      prevCloned.text = text;
      return prevCloned;
    });
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
      <Table data={stores} pagination={actualPage + "/" + totalPages} sort={sortHandler} />
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
