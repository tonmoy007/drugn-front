import {globalStore} from "../utils/store/global";
import {fetchBaseQuery} from "@reduxjs/toolkit/query";

const API_URL = process.env.API_URL || 'https://dev.api.drugn.life'
export const BaseQuery=fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: async (headers) => {
        const user = globalStore.getState().user
        if (user.loggedIn) {
            headers.set('Authorization', `Bearer ${user.token}`)
        }
        return headers;
    },
    jsonContentType: 'application/json; charset=UTF-8',

})