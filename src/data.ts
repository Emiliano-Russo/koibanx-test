export interface Data {
  ID: string;
  Comercio: string;
  CUIT: string;
  Concepto1: number;
  Concepto2: number;
  Concepto3: number;
  Concepto4: number;
  Concepto5: number;
  Concepto6: number;
  BlanceActual: number;
  Activo: boolean;
  UltimaVenta: Date;
}

export const info: Data[] = [
  {
    ID: "1",
    Comercio: "Pizza Family",
    CUIT: "SF151E00",
    Concepto1: 543,
    Concepto2: 546,
    Concepto3: 846,
    Concepto4: 84684,
    Concepto5: 10,
    Concepto6: 568,
    Activo: true,
    BlanceActual: 8420,
    UltimaVenta: new Date(2021, 11, 16),
  },
  {
    ID: "2",
    Comercio: "Cosmetics Place",
    CUIT: "AFSDAW514",
    Concepto1: 33,
    Concepto2: 51,
    Concepto3: 5818,
    Concepto4: 401,
    Concepto5: 251,
    Concepto6: 22,
    Activo: false,
    BlanceActual: 8000,
    UltimaVenta: new Date(2021, 7, 10),
  },
  {
    ID: "3",
    Comercio: "Burger Restuarant",
    CUIT: "AD15T04EA",
    Concepto1: 32,
    Concepto2: 82,
    Concepto3: 6518,
    Concepto4: 801,
    Concepto5: 151,
    Concepto6: 1,
    Activo: true,
    BlanceActual: 20000,
    UltimaVenta: new Date(2021, 7, 22),
  },
];
