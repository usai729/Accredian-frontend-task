import { IoMdAlert } from "react-icons/io";

export const Alert = ({ content }) => {
  return (
    <div className="flex justify-between w-full items-center bg-red-600 font-semibold text-white shadow-md rounded-md p-3 animate-bounce">
      <IoMdAlert color="yellow" />
      {content}
    </div>
  );
};
