export interface User {
  accessToken: string;
  expDate: string;
  issueAt: string;
  error: {
    code: number;
    description: string;
  };
  refreshToken: string;
}
export interface CurrUser {
  token: string;
}

export interface UserRole {
  roles: [
    {
      role: string;
      description: string;
    }
  ];
  error: {
    code: number;
    description: string;
  };
}

export interface NewUser {
  login: string;
  password: string;
  role: string;
}

export interface UserProfile {
  id?: number;
  email: string;
  fio: string;
  acc_order_number: string;
  acc_order_date: string;
  salary: number;
  birthday: string;
  previous_work_exp: string;
  previous_info_work_mp: string;
  sufficient_experience_mp: string;
  registration_address: string;
  actual_address: string;
  educationInfo: [
    {
      certificate: string;
      specialty: string;
      advanced_qualification: string;
    }
  ];
}
