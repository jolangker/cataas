import axios from "axios";

const useAxios = () => {
  const axiosInstances = axios.create({
    baseURL: "https://cataas.com",
  });

  return axiosInstances;
};

export default useAxios;
