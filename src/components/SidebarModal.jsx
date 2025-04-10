import React, { useEffect, useRef } from "react";
import { setting } from "../utils/Constants";
import unnamed from "../assets/unnamed.png";

const SidebarModal = ({ onClose }) => {
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end p-6">
      <div
        ref={sidebarRef}
        className="bg-white w-[280px] md:w-[350px] h-[90%] rounded-[20px] shadow-lg overflow-hidden"
      >
        <div className="h-full overflow-y-auto p-4 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>

          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mt-4 mb-6">
            <p className="text-sm font-semibold mb-2">bhavnac297@gmail.com</p>
            <img
              className="w-16 h-16 rounded-full object-cover mb-3 mt-2"
              src={unnamed}
              alt="Profile"
            />
            <span className="text-sm px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 cursor-pointer">
              Manage your account
            </span>
          </div>

          {/* Settings List */}
          <div className="space-y-4">
            {setting.map((item, index) => (
              <div
                key={index}
                className="p-2 border rounded hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </div>
            ))}
          </div>
          <p className="color-gray text-xs text-center m-5">Privacy Policy  Terms of Service</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarModal;
