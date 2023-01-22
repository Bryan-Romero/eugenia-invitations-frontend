import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { formDateOfEntry, formExpirationDate } from "../utils/formatDate";
import Invitation from "./Invitation";
import Spinner from "./Spinner";

const InvitationsList = () => {
  const invitationList = useSelector(
    (state: RootState) => state.invitations.invitations
  );
  const isLoading = useSelector(
    (state: RootState) => state.invitations.isLoading
  );
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
