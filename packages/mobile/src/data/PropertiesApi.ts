import axios, {AxiosInstance, AxiosInterceptorOptions, AxiosResponse} from "axios";
import { Property } from "./model/Property";

export interface BaseResponse<T> {
  data?: T,
  message: string
}

export class PropertiesApi {
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL,
    });
  }

  private axios: AxiosInstance

  public async getPropertiesNew(): Promise<AxiosResponse<BaseResponse<Property[]>>> {
    return (await (this.axios.get<AxiosResponse<BaseResponse<Property[]>>>("/listing/properties:new"))).data;
  }

  public async getPropertiesHidden(): Promise<AxiosResponse<BaseResponse<Property[]>>> {
    return (await (this.axios.get<AxiosResponse<BaseResponse<Property[]>>>("/listing/properties:hidden"))).data;
  }

  public async getPropertiesSaved(): Promise<AxiosResponse<BaseResponse<Property[]>>> {
    return (await (this.axios.get<AxiosResponse<BaseResponse<Property[]>>>("/listing/properties:saved"))).data;
  }
}

export const api = new PropertiesApi(process.env.EXPO_PUBLIC_API_BASE_URL);