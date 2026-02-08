import React from "react";

interface props {
  message: string;
  icon: React.ReactNode;
}

export const EmptyListMessage = ({ message, icon }: props) => {
  return (
    <div className="text-gray-500 mt-1 p-4 ">
      {icon}
      <p className="mt-4 font-bold text-2xl">{message}</p>
    </div>
  );
};
