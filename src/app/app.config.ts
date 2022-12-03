import { environment } from "src/environments/environment";

export const URLS = { 
    BASE_URL: environment.apiUrl,
    NA_API: environment.apiUrlPrefix,
    LOGIN: '/authenticate',
    COMPANY: '/company',
    USERS: '/user',
    NEW_COMPANY: '/save_new',
    GET_COMPANY_LIST: '/get_all',
    GET_EMPLOYEE_LIST: '/get_employee_list',

}