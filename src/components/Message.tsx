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
    <div className={"message-container"} id={id}>
      <img className="agent-avatar" src={avatar} />

      <div className="message">{text}</div>
    </div>
  );
}
