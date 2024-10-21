import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductoDTO } from '../models/producto-dto';
import { map, Observable } from 'rxjs';
import bigDecimal from 'js-big-decimal';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `http://localhost:8080/api/productos`;

  constructor(private http: HttpClient) { }
  private convertToBigDecimal(producto: any): ProductoDTO {
    return {
      ...producto,
      precio: new bigDecimal(producto.precio)
    };
  }

  getProductosActivos(): Observable<ProductoDTO[]> {
    return this.http.get<any[]>(`${this.apiUrl}/activos`).pipe(
      map(productos => productos.map(this.convertToBigDecimal))
    );
  }

  buscarProductos(criterio: string): Observable<ProductoDTO[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar`, { params: { criterio } }).pipe(
      map(productos => productos.map(this.convertToBigDecimal))
    );
  }

  crearProducto(producto: ProductoDTO): Observable<ProductoDTO> {
    const productoParaEnviar = {
      ...producto,
      precio: producto.precio.getValue()
    };
    return this.http.post<any>(this.apiUrl, productoParaEnviar).pipe(
      map(this.convertToBigDecimal)
    );
  }

  actualizarProducto(id: number, producto: ProductoDTO): Observable<ProductoDTO> {
    const productoParaEnviar = {
      ...producto,
      precio: producto.precio.getValue()
    };
    return this.http.put<any>(`${this.apiUrl}/${id}`, productoParaEnviar).pipe(
      map(this.convertToBigDecimal)
    );
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
