import React from "react";

interface MessageListProps {
  messages: any;
}
export default function MessageList({ messages }: MessageListProps) {
  return <div>{messages}</div>;
}
