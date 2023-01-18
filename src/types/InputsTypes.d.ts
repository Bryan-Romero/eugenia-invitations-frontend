export interface InputsLogin {
  email: string;
  password: string;
}

export interface InputsForgotPassword {
  email: string;
}

export interface InputsCreateAccount {
  firstName: string;
  lastName: string;
  departmentNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface InputsChangePassword {
  password: string;
  confirmPassword?: string;
}

export interface InputsCreateInvitation {
  id: string;
  guestName: string;
  dateOfEntry: string;
  expirationDate: string;
  tokenShare: string;
}
