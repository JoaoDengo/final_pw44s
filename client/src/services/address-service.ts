import type { IAddress, IResponse } from "@/commons/types";
import { api } from "@/lib/axios";
import { GenericService } from "@/services/generic-service";

class AddressService extends GenericService<IAddress> {
  constructor() {
    super("/addresses");
  }

  async findAll(): Promise<IResponse> {
    try {
      const response = await api.get("/addresses/user");
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

  async findByCep(cep: string): Promise<IResponse> {
    try {
      const response = await api.get(`/cep/${cep}`);
      return {
        status: 200,
        success: true,
        message: "CEP carregado com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao buscar cep",
        data: err.response?.data,
      };
    }
  }
}

export default new AddressService();
