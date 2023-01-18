import React from "react";
import Invitation from "./Invitation";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { formDateOfEntry, formExpirationDate } from "../utils/formatDate";

const InvitationsList = () => {
  const auth = useSelector((state: RootState) => state.auth.invitations);

  return (
    <div className="w-full flex flex-col-reverse gap-3 pb-3">
      {auth?.map((invitation) => (
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
