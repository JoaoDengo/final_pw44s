import type { IResponse } from "@/commons/types";
import { api } from "@/lib/axios";

class FreteService {
  async calcularFrete(cep: string): Promise<IResponse> {
    try {
      const response = await api.get(`/frete/${cep}`);
      return {
        status: 200,
        success: true,
        message: "Frete calculado com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao calcular frete",
        data: err.response?.data,
      };
    }
  }
}

export default new FreteService();
