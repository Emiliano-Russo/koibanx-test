import { Input, Checkbox } from "antd";
import React, { ChangeEventHandler } from "react";

interface SearchProps {
  onChange: (value: string) => void;
  onChangeCheckBox: (value: boolean) => void;
}

export function Search(props: SearchProps) {
  return (
    <div
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Input style={{ maxWidth: "300px" }} onChange={(value) => props.onChange(value.target.value)} />
      <Checkbox style={{ marginTop: "10px" }} onChange={(value) => props.onChangeCheckBox(value.target.checked)}>
        Mostrar Activos
      </Checkbox>
    </div>
  );
}
