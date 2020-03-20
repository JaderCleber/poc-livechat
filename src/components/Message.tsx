import React from "react";

interface MessageProps {
  id: string;
  text: string;
  authorType: string;
  avatar: string;
}

export default function Message({
  id,
  text,
  authorType,
  avatar
}: MessageProps) {
  return (
    <div className={`message-container ${authorType}`} id={id}>
      <img className="agent-avatar" src={avatar} alt="" />

      <div className="message">{text}</div>
    </div>
  );
}
