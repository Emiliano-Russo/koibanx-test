import { Button } from "antd";
import { useEffect, useState } from "react";
import { IStore, IStoreToString } from "../../fake_api";

interface TableProps {
  data: IStore[];
  page: number;
  sort: (field: Field, sortState: SortState) => void;
}

export enum SortState {
  Acending = "^",
  Descending = "∨",
  Nothing = "-",
}

export enum Field {
  Comercio = "Comercio",
  CUIT = "CUIT",
}

export function Table(props: TableProps) {
  const [symbolComercio, setSymbolComercio] = useState(SortState.Nothing);
  const [symbolCUIT, setSymbolCUIT] = useState(SortState.Nothing);

  function getNextSortState(field: Field): SortState {
    return field === Field.CUIT ? nextSortState(symbolCUIT) : nextSortState(symbolComercio);
  }

  function nextSortState(state: SortState) {
    switch (state) {
      case SortState.Acending:
        return SortState.Descending;
        break;
      case SortState.Descending:
        return SortState.Nothing;
        break;
      case SortState.Nothing:
        return SortState.Acending;
        break;
    }
  }

  return (
    <div style={{ marginTop: "50px" }}>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            {IStoreToString.map((value) => {
              if (value === "Comercio" || value === "CUIT")
                return (
                  <th style={{ border: "1px solid black", padding: "10px" }}>
                    <Button
                      size="small"
                      onClick={() => {
                        if (value === "Comercio") {
                          const next = getNextSortState(Field.Comercio);
                          setSymbolComercio(next);
                          setSymbolCUIT(SortState.Nothing);
                          props.sort(Field.Comercio, next);
                        } else if (value === "CUIT") {
                          const next = getNextSortState(Field.CUIT);
                          setSymbolCUIT(next);
                          setSymbolComercio(SortState.Nothing);
                          props.sort(Field.CUIT, next);
                        }
                      }}
                      style={{ marginRight: "5px" }}
                    >
                      {value === "CUIT" ? symbolCUIT : symbolComercio}
                    </Button>
                    {value}
                  </th>
                );
              else return <th style={{ border: "1px solid black", padding: "10px" }}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((data) => {
            return (
              <tr>
                <td>{data.ID}</td>
                <td>{data.Comercio}</td>
                <td>{data.CUIT}</td>
                <td>{data.Concepto1}</td>
                <td>{data.Concepto2}</td>
                <td>{data.Concepto3}</td>
                <td>{data.Concepto4}</td>
                <td>{data.Concepto5}</td>
                <td>{data.Concepto6}</td>
                <td>{data.BlanceActual}</td>
                <td>{data.Activo ? "1" : "0"}</td>
                <td>
                  {data.UltimaVenta.getDate() +
                    "/" +
                    (data.UltimaVenta.getMonth() + 1) +
                    "/" +
                    data.UltimaVenta.getFullYear()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p>Page: {props.page}</p>
    </div>
  );
}
