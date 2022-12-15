import { environment } from 'src/environments/environment';

export const URLS = {
  BASE_URL: environment.apiUrl,
  NA_API: environment.apiUrlPrefix,
  LOGIN: '/authenticate',
  REFRESH_TOKEN: '/refreshToken',
  COMPANY: '/company',
  USERS: '/user',
  USER_PROFILE: '/user_profile',
  TRANSPORT: '/transport',
  ROLLE_BUTTONS: '/role_buttons',
  GET_ALLOWED: '/get_allowed',
  NEW_COMPANY: '/save_new',
  GET_COMPANY_LIST: '/get_all',
  GET_EMPLOYEE_LIST: '/get_employee_list',
  GET_ALL_ROLES: '/get_all_roles',
  GET_ALL_TRANSPORT: '/get_all_transport',
  GET_USER_PROFILE: '/get_user_profile',
  NEW_USER: '/save_new_user',
  SAVE_USER_PROFILE: '/save_user_profile',
  SAVE_NEW_TRANSPORT: '/save_new_transport',
  SAVE_INFO_EDUCATION: '/save_info_education',
  //
};
