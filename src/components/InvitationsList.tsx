import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectIsLogin, selectToken } from "../features/auth/authSlice";
import { getInvitationsAsync } from "../features/invitations/invitationsAsync";
import {
  selectInvitations,
  selectIsLoading,
} from "../features/invitations/invitationsSlice";
import { formDateOfEntry, formExpirationDate } from "../utils/formatDate";
import Invitation from "./Invitation";
import Spinner from "./Spinner";

const InvitationsList = () => {
  const invitationList = useAppSelector(selectInvitations);
  const isLoading = useAppSelector(selectIsLoading);
  const isLogin = useAppSelector(selectIsLogin);
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(getInvitationsAsync({ token }));
    }
  }, []);

  return (
    <div className="w-full flex flex-col-reverse gap-3 pb-3">
      {isLoading && <Spinner />}
      {invitationList?.map((invitation) => (
        <Invitation
          id={invitation.id}
          guestName={invitation.guestName}
          dateOfEntry={formDateOfEntry(invitation.dateOfEntry)}
          expirationDate={formExpirationDate(invitation.expirationDate)}
          tokenShare={invitation.tokenShare}
          key={invitation.id + invitation.guestName}
        />
      ))}
    </div>
  );
};

export default InvitationsList;
