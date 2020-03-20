import React, { useState } from "react";
import logo from "./logo.svg";
import { LogoLoader } from "./DOMElements";
import * as DOMOperations from "./DOMOperations";
// @ts-ignore
import * as CustomerSDK from "@livechat/customer-sdk";
import "./App.css";
import Message from "./components/Message";

const historyStates = {
  DONE: "DONE",
  INACTIVE: "INACTIVE",
  LOADING: "LOADING"
};

const noop = () => {};

const customerSDK = CustomerSDK.init({
  licenseId: Number(process.env.REACT_APP_LICENSE_ID),
  clientId: process.env.REACT_APP_CLIENT_ID,
  onIdentityFetched: (error, data) => {
    if (data) {
      console.log("User authorized!");
      console.log("License number: " + data.license);
    }
  }
});

function App() {
  const [state, setState] = useState({
    chat: null,
    active: false,
    activating: false,
    users: {},
    pendingMessages: [],
    customerId: null,
    historyStatus: historyStates.INACTIVE,
    history: null
  });

  const [minimized, setMinimized] = useState("minimized");
  const [showFooter, setShowFooter] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showStartChat, setShowStartChat] = useState(false);
  const [textareaWrapper, setTextareaWrapper] = useState(false);

  const loadInitialHistory = () => {
    const chatId = state.chat;

    setState({ ...state, history: customerSDK.getChatHistory(chatId) });

    const loadLatestHistory = () =>
      loadHistory(chatId).then(() => DOMOperations.scrollToBottom(chatId));

    return loadLatestHistory()
      .catch(() => loadLatestHistory())
      .catch(noop);
  };

  const loadHistory = chat => {
    setState({ ...state, historyStatus: historyStates.LOADING });
    return new Promise((resolve, reject) => {
      state.history.next().then(
        ({ value: events, done }) => {
          if (!events) {
            return;
          }

          const messages = events
            .filter(event => event.type === "message")
            .map(event => {
              const author = state.users[event.author];
              return (
                <Message
                  id={event.id}
                  text={event.text}
                  // authorType={isAgent(author) ? "agent" : "customer"}
                  authorType={"customer"}
                  avatar={author.avatar}
                />
              );
            });
          const messageList = DOMOperations.getMessageList(chat);

          const fromTheBottom =
            messageList.scrollHeight -
            (messageList.scrollTop + messageList.clientHeight);

          DOMOperations.prependMessages(chat, messages);

          messageList.scrollTop =
            messageList.scrollHeight - messageList.clientHeight - fromTheBottom;

          setState({
            ...state,
            historyStatus: done ? historyStates.DONE : historyStates.INACTIVE
          });

          resolve();
        },
        err => {
          setState({ ...state, historyStatus: historyStates.INACTIVE });
          reject(err);
        }
      );
    });
  };

  customerSDK.on("connected", payload => {
    const { availability, greeting, chatsSummary, totalChats } = payload;
    console.log("connected", { availability, greeting });

    if (state.chat) {
      return;
    }

    if (totalChats === 0) {
      setShowLoader(false);
      setShowFooter(true);
      setShowStartChat(true);
    } else {
      state.chat = chatsSummary[0].id;
      state.active = chatsSummary[0].active;

      loadInitialHistory().then(() => {
        setShowLoader(false);
        setShowFooter(true);
        setTextareaWrapper(true);
        setShowStartChat(false);
      });
    }
  });

  const handleToggleMinimized = () => {
    setMinimized(minimized ? "" : "minimized");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div
        id="lc-minimized"
        className={minimized}
        onClick={handleToggleMinimized}
      >
        <svg
          fill="#fff"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </div>
      <div id="lc" className={minimized}>
        <div id="lc-header">
          <div style={{ width: "24px", height: "24px" }}></div>
          <div>Talk to us!</div>
          <button id="minimize">
            <svg
              fill="#5a6976"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button>
        </div>
        <div id="chat">{showLoader && <LogoLoader />}</div>
        {showFooter && (
          <div id="footer">
            {textareaWrapper && (
              <div id="textarea-wrapper">
                <textarea
                  placeholder="Write a message..."
                  id="message-input"
                ></textarea>
                <button id="send-button">
                  <svg
                    fill="#b2bbc6"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    <path d="M0 0h24v24H0z" fill="none" />
                  </svg>
                </button>
              </div>
            )}
            {showStartChat && (
              <button id="start-chat-button">Start new chat</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
