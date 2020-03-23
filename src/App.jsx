import React, { useState, useEffect, useRef } from "react";
import * as CustomerSDK from "./libs/customer-sdk";
import Message from "./components/Message";
import "./App.css";

const historyStates = {
  DONE: "DONE",
  INACTIVE: "INACTIVE",
  LOADING: "LOADING"
};

const noop = () => {};

const customerSDK = CustomerSDK.init({ //CustomerSDK.debug(
  clientId: process.env.REACT_APP_CLIENT_ID,
  license: Number(process.env.REACT_APP_LICENSE_ID)
});
// );

let history;
const users = {};

function App() {
  const chatRef = useRef(null);
  const [state, setState] = useState({
    chat: null,
    active: false,
    activating: false,
    pendingMessages: [],
    customerId: null,
    historyStatus: historyStates.INACTIVE
  });

  const [textareaWrapper, setTextareaWrapper] = useState(false);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (chatRef && chatRef.current)
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messageList]);

  const loadInitialHistory = chatId => {
    history = customerSDK.getChatHistory(chatId);
    const loadLatestHistory = () => loadHistory(chatId);

    return loadLatestHistory()
      .catch(() => loadLatestHistory())
      .catch(noop);
  };

  const loadHistory = chat => {
    return new Promise((resolve, reject) => {
      history.next().then(
        ({ value: events, done }) => {
          if (!events) {
            return;
          }

          const messages = events
            .filter(event => event.type === "message")
            .map(event => {
              const author = users[event.author] || {};
              return {
                id: event.id,
                text: event.text,
                authorType: isAgent(author) ? "agent" : "customer",
                avatar: author.avatar
              };
            });
          setMessageList(messages);
          resolve();
        },
        err => {
          console.log("falha carregando o historico", err);
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
    const author = users[event.author];
    setMessageList([
      ...messageList,
      {
        text: event.text,
        id: event.id,
        avatar: author && author.avatar,
        authorType: isAgent(author) ? "agent" : "customer"
      }
    ]);
  });

  customerSDK.on("customer_id", id => {
    setState({ ...state, customerId: id });
  });
  customerSDK.on("user_data", user => (users[user.id] = user));

  customerSDK.on("connected", ({ chatsSummary, totalChats }) => {
    if (state.chat) {
      return;
    }

    if (totalChats === 0) {
      setTextareaWrapper(false);
    } else {
      const chat = chatsSummary[0].id;
      const active = chatsSummary[0].active;

      loadInitialHistory(chat)
        .then(done => {
          setTextareaWrapper(true);
          setState({
            ...state,
            chat,
            active,
            historyStatus: done ? historyStates.DONE : historyStates.INACTIVE
          });
        })
        .catch(e => {
          console.log("erro carregando historico", e);
          setState({ ...state, historyStatus: historyStates.INACTIVE });
        });
    }
  });

  const sendMessage = (chat, id, text) => {
    const message = { customId: id, text, type: "message" };

    customerSDK.sendEvent(chat, message).then(() => {
      console.log("falha no envio da mensagem", id);
    });
  };

  const startChat = () => {
    setState({ ...state, activating: true });
    const activateChat = state.chat
      ? customerSDK.activateChat.bind(null, state.chat)
      : customerSDK.startChat;

    activateChat()
      .then(({ id: chatId }) => {
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
        console.log("falha na inicializacao de novo chat", e);
        state.pendingMessages.forEach(({ messageId: id }) =>
          console.log("falha enviando mensagem pendente", id)
        );
        setState({
          ...state,
          activating: false,
          pendingMessages: []
        });
      });
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
      setState({
        ...state,
        pendingMessages: [...state.pendingMessages, { messageId, message }]
      });
    }

    setMessageList([
      ...messageList,
      { text: message, id: messageId, authorType: "customer" }
    ]);

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
      <div id="lc">
        <div id="lc-header">
          <div style={{ width: "24px", height: "24px" }}></div>
          <div>Fala comigo bebê!</div>
          {/* <button id="minimize">
            <svg
              fill="#5a6976"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </button> */}
        </div>
        <div id="chat" ref={chatRef}>
          {messageList.map(item => (
            <Message key={`message-${item.id}`} {...item} />
          ))}
          {/* {showLoader && <LogoLoader />} */}
        </div>
        <div id="footer">
          {textareaWrapper ? (
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
          ) : (
            <button onClick={startChat} id="start-chat-button">
              Start new chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
