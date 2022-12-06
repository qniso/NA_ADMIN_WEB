import { environment } from "src/environments/environment";

export const URLS = { 
    BASE_URL: environment.apiUrl,
    NA_API: environment.apiUrlPrefix,
    LOGIN: '/authenticate',
    COMPANY: '/company',
    USERS: '/user',
    TRANSPORT: '/transport',
    NEW_COMPANY: '/save_new',
    GET_COMPANY_LIST: '/get_all',
    GET_EMPLOYEE_LIST: '/get_employee_list',
    GET_ALL_ROLES: '/get_all_roles',
    NEW_USER: '/save_new_user',
    SAVE_NEW_TRANSPORT: '/save_new_transport',
}