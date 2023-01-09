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
  NEW_COMPANY: '/save_new',
  GET_COMPANY_LIST: '/get_all',
  GET_EMPLOYEE_LIST: '/get_employee_list',
  GET_ALL_ROLES: '/get_all_roles',
  GET_ALL_TRANSPORT: '/get_all_transport',
  GET_USER_PROFILE: '/get_user_profile',
  GET_ALLOWED: '/get_allowed',
  NEW_USER: '/save_new_user',
  SAVE_USER_PROFILE: '/save_user_profile',
  SAVE_USER_INFO: '/save_info',
  SAVE_NEW_TRANSPORT: '/save_new_transport',
  SAVE_INFO_EDUCATION: '/save_info_education',
  EDIT_INFO_EDUCATION: '/edit_info_education',
  SAVE_INTERSHIP: '/save_internship',
  SAVE_INFO_DRIVING_LICENSE: '/save_info_driving_license',
  EDIT_INFO_DRIVING_LICENSE: '/edit_info_driving_license',
  EXIST_DOCUMENT: '/exist_document',
  REMOVE_INFO_EDUCATION: '/remove_info_education',
  REMOVE_INFO_INTERNSHIP: '/remove_internship',
  REMOVE_INFO_DRIVING_LICENSE: '/remove_info_driving_license',
  GET_TRANSPORT_INFO: '/get_transport_info',
  EDIT_USING_REASON_INFO: '/edit/using_reason_info',
  EDIT_GENERAL_INFO: '/edit/general_info',
  //transport/transport/edit/general_info
};
