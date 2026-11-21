import axios from "axios";

// const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts/1"
// );

export const api = await axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

api.interceptors.response.use(
    function (response) {
        return response;
    },

    function (error) {
        if (axios.isAxiosError(error)) {
            error.message = error.response?.data?.message || "could not reach the server";
        }

        return Promise.reject(error);
    }
)