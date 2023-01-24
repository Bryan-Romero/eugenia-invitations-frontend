import { InputsCreateInvitation } from "./InputsTypes";

export interface ApiLogin {
  token: string;
  user: string;
  createAt: string;
}

export interface ApiInvitations extends ApiMessageSuccess {
  invitations: InputsCreateInvitation[] | null;
}

export interface ApiInvitation extends ApiMessageSuccess {
  invitation: InputsCreateInvitation;
}

export interface ApiMessageSuccess {
  message: string;
}
