import React, { useState } from "react";
import { TbGridDots } from "react-icons/tb";
// import Profile from "../assets/profile-200x200.jpg";
import unnamed from "../assets/unnamed.png";
import ProfileRing from "../assets/profile-ring.svg";
import SidebarModal from "./SidebarModal";


const ProfileIcon = () => {
  const [modal, setmodal] = useState(false); 
  return (
    <>
    <div className="flex gap-4 items-center">
      {/* Text Links */}
      <div className="flex gap-3 text-sm hover:underline cursor-pointer">
        <span>Gmail</span>
        <span>Images</span>
      </div>

      
      <span className="h-10 w-10 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/[0.05]">
        <TbGridDots size={20} color="#5f6368" />
      </span>

      {/* Profile Icon with Ring */}
      <span className="h-10 w-10 relative flex justify-center items-center" onClick={()=>setmodal(true)}>
        {/* <img className="absolute" src={ProfileRing} alt="Profile Ring" /> */}
        <span className="h-8 w-8 rounded-full overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={unnamed}
            alt="Profile"
          />
        </span>
      </span>
    </div>
    {modal && <SidebarModal onClose={() => setmodal(false)} />}

    </>
  );
};

export default ProfileIcon;
