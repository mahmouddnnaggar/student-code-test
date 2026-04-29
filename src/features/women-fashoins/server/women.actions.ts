import axios, { AxiosRequestConfig } from "axios";

export default async function getWomenFashion() {
  const options: AxiosRequestConfig = {
    url: "https://ecommerce.routemisr.com/api/v1/products",
    method: "GET",
    params: { "category[in]": "6439d58a0049ad0b52b9003f" } 
  };

  let { data } = await axios.request(options);
  return data;
}