import {globalStore} from "../utils/store/global";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";
import {API_URL} from "@env";

const baseURL = process.env.API_URL || API_URL || "https://dev.api.drugn.life"
console.info("Current API URI", baseURL)
export const BaseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers) => {
        const user = globalStore.getState().user
        if (user.loggedIn) {
            headers.set('Authorization', `Bearer ${user.accessToken}`)
        }
        return headers;
    },
    jsonContentType: 'application/json; charset=UTF-8',

})