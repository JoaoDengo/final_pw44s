import type { IResponse, ISale } from "@/commons/types";
import { api } from "@/lib/axios";
import { GenericService } from "@/services/generic-service";

class SaleService extends GenericService<ISale> {
  constructor() {
    super("/sales");
  }

  async findAll(): Promise<IResponse> {
    try {
      const response = await api.get("/sales/user");
      return {
        status: 200,
        success: true,
        message: "Registros carregados com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao buscar registros",
        data: err.response?.data,
      };
    }
  }
}
export default new SaleService();
