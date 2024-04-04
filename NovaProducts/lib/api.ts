export type ProductByCodeResponse = {
  status: string;
  data: ProductData | null;
  code: number;
  message: string;
};

export type PrecioTalle = {
  CODIGO: string;
  TALLE: string;
  PREC1: string;
};

export type ProductData = {
  articulo: {
    CODIGO: string;
    TIPOTALLE: string;
    NOMBRE: string;
    MARCA: string;
    NMARCA: string;
  };
  precio: PrecioTalle[];
  stock: {
    CODIGO: string;
    TALLE: string;
    DEPOSITO: string;
    NDEPOSITO: string;
    STOCK: string;
  }[];
};

export async function fetchProductByCode(code: string) {
  const endpoint = `http://149.100.142.117:/apinovades/appnova/consultaArticuloStock.php?_r=json&_m=homo&_e=66&_cb=${code}`;
  const response = await fetch(endpoint);
  const json: ProductByCodeResponse = await response.json();
  return json;
}
