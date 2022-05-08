import { stores_db } from "./data";

export interface Store {
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

export interface Response {
  data: Store[];
  page: number; // page to show
  pages: number; // total pages
  rowsPerPage: number; //how many stores per page
  total: number; // total amount of stores
}

class Fake_api {
  storeData: Store[];
  rowsPerPage: number;

  constructor(storeData: Store[], rowsPerPage: number) {
    this.storeData = storeData;
    this.rowsPerPage = rowsPerPage;
  }

  getStores(page: number) {
    const start = (page - 1) * this.rowsPerPage;
    const end = start + this.rowsPerPage;
    const response: Response = {
      data: this.storeData.slice(start, end),
      page: page,
      pages: this.storeData.length / this.rowsPerPage,
      rowsPerPage: this.rowsPerPage,
      total: this.storeData.length,
    };
    return response;
  }
}

export const fake_api = new Fake_api(stores_db, 10);
