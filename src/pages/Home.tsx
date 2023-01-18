import React from "react";
import InvitationsList from "../components/InvitationsList";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleCreateInvitation = () => {
    navigate("/createInvitation")
  };

  return (
    <div className="w-full h-full px-14 py-5 flex flex-col gap-4">
      <button
        className="self-start bg-green-600 px-8 py-2 text-white font-semibold rounded-lg hover:bg-green-700"
        onClick={handleCreateInvitation}
      >
        Nueva invitacion
      </button>
      <InvitationsList />
    </div>
  );
};

export default Home;
