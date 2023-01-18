import React from "react";
import { Link } from "react-router-dom";

const PageError = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-2xl font-semibold text-red-400">
        Esta ruta no existe vuelve al <Link to="/" className="underline">inicio</Link>
      </p>
    </div>
  );
};

export default PageError;
