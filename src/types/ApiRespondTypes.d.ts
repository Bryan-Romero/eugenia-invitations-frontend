import { InputsCreateInvitation } from "./InputsTypes";

export interface ApiLogin {
  token: string;
  user: string;
  createAt: string;
}

export interface ApiInvitations {
  invitations: InputsCreateInvitation[] | null;
}

export interface ApiInvitation {
  invitation: InputsCreateInvitation;
}

export interface ApiMessageSuccess {
  message: string;
}
