import MenuTop from "../molecules/MenuTop"
import React, { useState } from 'react';
import Chat from "../molecules/Chat";
import VideoSide from "../molecules/VideoSide";

const VirtualClass = () => {
  const userid = localStorage.getItem("user_id");

  return (
    <>
        <div className="flex flex-column h-full">
            {/* Menú superior */}
            <MenuTop />
            {/* contenido */}
            <div className="grid flex-nowrap p-4 gap-4 w-full">
                    <VideoSide />
                    <Chat userId={userid} />
            </div>
        </div>
    </>
  )
}

export default VirtualClass