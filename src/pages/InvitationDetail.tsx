import React from "react";

const InvitationDetail = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-gray-100 max-w-md h-fit flex flex-col items-center gap-8 rounded-2xl p-9 shadow-md">
        <p className="text-5xl font-semibold text-center">Bryan Romero Bautista</p>
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">Fecha y hora de entrada</p>
          <p className="text-xl">2020/03/12  10:23:34</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-xl font-semibold">Fecha de caducidad</p>
          <p className="text-xl">2020/03/12</p>
        </div>
      </div>
    </div>
  );
};

export default InvitationDetail;
