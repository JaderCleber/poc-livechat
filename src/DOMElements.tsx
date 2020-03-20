import React from "react";

export const backButton = document.getElementById("back-button");
export const lcWindow = document.getElementById("lc");
export const connectionMessage = document.getElementById("connection-message");
export const lcWindowMinimized = document.getElementById("lc-minimized");
export const footer = document.getElementById("footer");
export const startChatButton = document.getElementById("start-chat-button");
export const sendButton = document.getElementById("send-button");
export const textareaWrapper = document.getElementById("textarea-wrapper");
export const input = document.getElementById("message-input");
export const minimizeButton = document.getElementById("minimize");

export function LogoLoader() {
  return (
    <svg
      className="resizable-svg"
      viewBox="0 0 72 99"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style type="text/css">
        {/* .rectangle-bar {
            fill: '#5CA7F5';
        }

        .circle-background {
            fill: 'transparent';
        }

        .letter-c {
            fill: '#31374F';
        } */}
      </style>
      <rect y="81" className="rectangle-bar" width="72" height="18" />
      <g className="circle">
        <rect className="circle-background" width="72" height="72" />
        <path
          className="letter-c"
          d="M49.8,45c-2.9,4.5-8,7.5-13.8,7.5c-9.1,0-16.5-7.4-16.5-16.5c0-9.1,7.4-16.5,16.5-16.5c5.8,0,10.9,3,13.8,7.5
        h21C66.9,11.5,52.8,0,36,0C16.1,0,0,16.1,0,36s16.1,36,36,36c16.8,0,30.9-11.5,34.9-27H49.8z"
          shape-rendering="geometricPrecision"
        />
      </g>
    </svg>
  );
}
