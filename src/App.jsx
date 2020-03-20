import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { LogoLoader } from "./DOMElements";
import * as DOMOperations from "./DOMOperations";
// @ts-ignore
import * as CustomerSDK from "./assets/customer-sdk";
import "./App.css";
import "./index.css";
import Message from "./components/Message";

const historyStates = {
  DONE: "DONE",
  INACTIVE: "INACTIVE",
  LOADING: "LOADING"
};

const noop = () => {};

const customerSDK = CustomerSDK.debug(
  CustomerSDK.init({
    clientId: process.env.REACT_APP_CLIENT_ID,
    license: Number(process.env.REACT_APP_LICENSE_ID)
  })
);

window.customerSDK = customerSDK;

// const customerSDK = CustomerSDK.init({
//   clientId: process.env.REACT_APP_CLIENT_ID,
//   licenseId: Number(process.env.REACT_APP_LICENSE_ID),
//   onIdentityFetched: (error, data) => {
//     console.log("onIdentityFetched", error, data);
//     if (data) {
//       console.log("User authorized!");
//       console.log("License number: " + data.license);
//     }
//   }
// });

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
  const [showFooter, setShowFooter] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [showStartChat, setShowStartChat] = useState(true);
  const [textareaWrapper, setTextareaWrapper] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  // const loadInitialHistory = () => {
  //   const chatId = state.chat;

  //   state.history = sdk.getChatHistory(chatId);

  //   const loadLatestHistory = () =>
  //     loadHistory(chatId).then(() => DOMOperations.scrollToBottom(chatId));

  //   return loadLatestHistory()
  //     .catch(() => loadLatestHistory())
  //     .catch(noop);
  // };

  const loadInitialHistory = chatId => {
    state.history = customerSDK.getChatHistory(chatId);
    const loadLatestHistory = () =>
      loadHistory(chatId).then(() => DOMOperations.scrollToBottom(chatId));

    return loadLatestHistory()
      .catch(() => loadLatestHistory())
      .catch(noop);
  };

  const loadHistory = chat => {
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
              return {
                id: event.id,
                text: event.text,
                // authorType={isAgent(author) ? "agent" : "customer"}
                authorType: "customer",
                avatar: author.avatar
              };
            });
          // const messageList = DOMOperations.getMessageList(chat);

          // const fromTheBottom =
          //   messageList.scrollHeight -
          //   (messageList.scrollTop + messageList.clientHeight);

          // messageList.scrollTop =
          //   messageList.scrollHeight - messageList.clientHeight - fromTheBottom;

          // resolve(done, history, messages);
          console.log("messagesmessagesmessagesmessages", messages);
          resolve();
        },
        err => {
          console.log("err", err);
          reject(err);
        }
      );
    });
  };

  const isAgent = user => user.id !== state.customerId;

  customerSDK.on("new_event", ({ chat, event }) => {
    if (!state.chat || event.type !== "message") {
      return;
    }
    const author = state.users[event.author];
    setMessageList([
      ...messageList,
      {
        text: event.text,
        id: event.id,
        avatar: author.avatar,
        authorType: isAgent(author) ? "agent" : "customer"
      }
    ]);
  });

  customerSDK.on("customer_id", id => {
    setState({ ...state, customerId: id });
  });
  customerSDK.on("user_data", user => {
    console.log("user data", user);
    setState({ ...state, users: { ...state.users, [user.id]: user } });
  });

  customerSDK.on("connected", ({ chatsSummary, totalChats }) => {
    if (state.chat) {
      return;
    }

    // if (greeting) {
    //   const { id, uniqueId, text, agent } = greeting;
    //   setState({ ...state, chat: greeting.id });
    //   setShowStartChat(false);
    //   setTextareaWrapper(true);
    //   setMessageList([
    //     { text, id: agent.id, avatar: agent.avatar, authorType: "agent" }
    //   ]);
    //   setState({ ...state, chat: uniqueId });
    // }

    if (totalChats === 0) {
      setShowLoader(false);
      setShowFooter(true);
      setShowStartChat(true);
    } else {
      const chat = chatsSummary[0].id;
      const active = chatsSummary[0].active;

      setState({
        ...state,
        chat,
        active,
        historyStatus: historyStates.LOADING
      });

      // TODO tentar carregar o histórico está dando render infinito
      // loadInitialHistory(chat, active)
      //   .then((done, history, messages) => {
      //     console.log("loadInitialHistory aaaaaa");
      //     setShowLoader(false);
      //     setShowFooter(true);
      //     setTextareaWrapper(true);
      //     setShowStartChat(false);
      //     setState({
      //       ...state,
      //       chat,
      //       active,
      //       history,
      //       historyStatus: done ? historyStates.DONE : historyStates.INACTIVE
      //     });
      //     setMessageList(messages);
      //     console.log("messages", messages);
      //   })
      //   .catch(() => {
      //     console.log("errrrrrrr");
      //     setState({ ...state, historyStatus: historyStates.INACTIVE });
      //   });
    }
  });

  const sendMessage = (chat, id, text) => {
    const message = { customId: id, text, type: "message" };

    customerSDK.sendEvent(chat, message).then(
      confirmedMessage => {
        console.log("confirmedMessage id", id);
      },
      () => {
        console.log("failed id", id);
      }
    );
  };

  const startChat = () => {
    setState({ ...state, activating: true });
    const activateChat = state.chat
      ? customerSDK.activateChat.bind(null, state.chat)
      : customerSDK.startChat;

    activateChat()
      .then(({ id: chatId }) => {
        console.log("activate chat id", chatId);
        setShowStartChat(false);
        setTextareaWrapper(true);

        state.pendingMessages.forEach(
          ({ messageId: customId, text: message }) =>
            sendMessage(chatId, customId, message)
        );

        setState({
          ...state,
          chat: chatId,
          active: true,
          activating: false,
          historyStatus: historyStates.DONE,
          pendingMessages: []
        });
      })
      .catch(e => {
        console.log("catch start chat", e);
        state.pendingMessages.forEach(({ messageId: id }) =>
          console.log("failed start chat", id)
        );
        setState({
          ...state,
          activating: false,
          pendingMessages: []
        });
      });
  };

  const handleToggleMinimized = () => {
    setMinimized(minimized ? "" : "minimized");
  };

  const handleSend = () => {
    if (!message) {
      return;
    }

    const messageId = `${Math.random() * 1000}`;

    if (state.active) {
      sendMessage(state.chat, messageId, message);
    } else {
      if (!state.activating) {
        startChat();
      }
      state.pendingMessages.push({ messageId, message });
    }

    setMessageList([
      ...messageList,
      { text: message, id: messageId, authorType: "customer" }
    ]);
    DOMOperations.scrollToBottom();
    setMessage("");
  };

  const handleChangeMessage = e => setMessage(e.target.value);
  const handleKeyDown = e => {
    if (e.which !== 13) {
      return;
    }
    e.preventDefault();
    handleSend();
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
          <div>Fala comigo bebê!</div>
          <button
            id="minimize"
            className={minimized}
            onClick={handleToggleMinimized}
          >
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
        <div id="chat">
          {messageList.map(item => (
            <Message key={`message-${item.id}`} {...item} />
          ))}
          {/* {showLoader && <LogoLoader />} */}
        </div>
        {showFooter && (
          <div id="footer">
            {textareaWrapper && (
              <div id="textarea-wrapper">
                <textarea
                  placeholder="Escreva uma mensagem..."
                  id="message-input"
                  value={message}
                  onChange={handleChangeMessage}
                  onKeyDown={handleKeyDown}
                ></textarea>
                <button id="send-button" onClick={handleSend}>
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
              <button onClick={startChat} id="start-chat-button">
                Start new chat
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
