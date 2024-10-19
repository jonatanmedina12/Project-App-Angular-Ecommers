import bigDecimal from "js-big-decimal";

export interface ProductoDTO {
    id: number;
  nombre: string;
  descripcion: string;
  precio: bigDecimal;
  activo: boolean;
}
