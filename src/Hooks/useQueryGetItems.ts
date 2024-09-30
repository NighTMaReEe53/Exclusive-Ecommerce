import { useQuery } from "react-query";
import { AxiosInstance } from "../config/Index";
import { AxiosRequestConfig } from "axios";

interface IQuery {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

export const useQueryGetData = ({ queryKey, url, config }: IQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await AxiosInstance.get(url, config);
      return data;
    },
  });
};
