import { Button } from "antd";
import { Data } from "../../data";

interface TableProps {
  headers: string[];
  data: Data[];
  //textFilter: string;
  //activeFilter: boolean;
}

export function Table(props: TableProps) {
  return (
    <div style={{ marginTop: "50px" }}>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            {props.headers.map((value) => {
              if (value === "ID" || value === "Comercio" || value === "CUIT")
                return (
                  <th style={{ border: "1px solid black", padding: "10px" }}>
                    <Button size="small">^</Button>
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
    </div>
  );
}
