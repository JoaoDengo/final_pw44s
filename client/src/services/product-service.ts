import { api } from "@/lib/axios";
import type { IProduct } from "@/commons/types";
import { GenericService } from "@/services/generic-service";
import type { IResponse } from "@/commons/types";

class ProductService extends GenericService<IProduct> {
  constructor() {
    super("/products");
  }

  async findProductsByCategoryId(id: number): Promise<IResponse> {
    try {
      const response = await api.get(`/products/category/${id}`);
      return {
        status: 200,
        success: true,
        message: "Registro carregado com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao buscar registro",
        data: err.response?.data,
      };
    }
  }
}

export default new ProductService();
