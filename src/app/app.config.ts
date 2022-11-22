import { environment } from "src/environments/environment";

export const URLS = { 
    BASE_URL: environment.apiUrl,
    NA_API: environment.apiUrlPrefix,
    LOGIN: '/authenticate',
    COMPANY: '/company',
    NEW_COMPANY: '/save_new',
    GET_COMPANY_LIST: '/get_all',

}