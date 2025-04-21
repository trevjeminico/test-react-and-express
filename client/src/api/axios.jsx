import axios from "axios";
const axiosFunction =  axios.create({
  baseURL: "http://localhost:2121",
})

export default axiosFunction;
