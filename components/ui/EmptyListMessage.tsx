import React from "react";

interface props {
  message: string;
  icon: React.ReactNode;
}

export const EmptyListMessage = ({ message, icon }: props) => {
  return (
    <div className="flex flex-col items-center text-center text-gray-500 p-4">
      {icon}
      <p className="mt-4 font-bold text-2xl max-w-md">{message}</p>
    </div>
  );
};
