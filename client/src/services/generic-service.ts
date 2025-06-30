import { api } from "@/lib/axios";
import type { IResponse } from "@/commons/types";

export class GenericService<T> {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async save(data: T): Promise<IResponse> {
    try {
      const response = await api.post(this.baseURL, data);
      return {
        status: 200,
        success: true,
        message: "Registro salvo com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao salvar registro",
        data: err.response?.data,
      };
    }
  }

  async findAll(): Promise<IResponse> {
    try {
      const response = await api.get(this.baseURL);
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

  async findById(id: number): Promise<IResponse> {
    try {
      const response = await api.get(`${this.baseURL}/${id}`);
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

  async remove(id: number): Promise<IResponse> {
    try {
      const response = await api.delete(`${this.baseURL}/${id}`);
      return {
        status: 200,
        success: true,
        message: "Registro removido com sucesso!",
        data: response.data,
      };
    } catch (err: any) {
      return {
        status: err.response?.status || 500,
        success: false,
        message: "Erro ao remover registro",
        data: err.response?.data,
      };
    }
  }
}
