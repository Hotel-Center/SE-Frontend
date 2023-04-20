import React, { useState, Fragment, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ReconnectingWebSocket from "../../Homepage/layouts/reconnecting-websocket";
import DefaultImage from "../../../statics/img/pics/avatar.jpg";
import references from "../../../assets/References.json";

export default function ChatBox(props) {
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSmallWindow, setIsSmallWindow] = useState(false);
  // const [webSockets, setWebSokets] = useState([]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSmallWindow(true);
    } else {
      setIsSmallWindow(false);
    }
  }, []);

  const handleOpenChat = (roomname) => {
    var chatRoom = props.chatRoomsList.find((e) => e.roomname === roomname);
    setSelectedChat(chatRoom);
    setTimeout(() => {
      var roomName = chatRoom.roomname;
      var id = chatRoom.user.id;
      // var chatSocket = null;
      var chatSocket = new ReconnectingWebSocket(
        "ws://" + "localhost:8000" + "/ws/chat/" + roomName + "/"
      );

      // if (
      //   !webSockets ||
      //   webSockets.find((e) => e.roomName === roomName) === undefined
      // ) {
      //   chatSocket = new ReconnectingWebSocket(
      //     "ws://" + "localhost:8000" + "/ws/chat/" + roomName + "/"
      //   );
      //   setWebSokets([
      //     ...webSockets,
      //     { webSocket: chatSocket, roomName: roomName },
      //   ]);
      // } else {
      //   chatSocket = webSockets.find((e) => e.roomName === roomName).webSocket;
      // }

      chatSocket.onopen = function () {
        fetchMessages();
      };

      chatSocket.onmessage = function (e) {
        var data = JSON.parse(e.data);
        if (data["command"] === "messages") {
          for (let i = 0; i < data["messages"].length; i++) {
            createMessage(data["messages"][i]);
          }
        } else if (data["command"] === "new_message") {
          createMessage(data["message"]);
        }
      };

      chatSocket.onclose = function () {
        console.error("Chat socket closed unexpectedly");
      };

      document.querySelector("#chat-message-input").onkeyup = function (e) {
        if (e.keyCode === 13) {
          // enter, return
          document.querySelector("#chat-message-submit").click();
        }
      };

      document.querySelector("#chat-message-submit").onclick = function () {
        var messageInputDom = document.getElementById("chat-message-input");
        var message = messageInputDom.value;
        chatSocket.send(
          JSON.stringify({
            command: "new_message",
            message: message,
            from: id,
            chat: roomName,
          })
        );

        messageInputDom.value = "";
      };

      function fetchMessages() {
        chatSocket.send(
          JSON.stringify({ command: "fetch_messages", chat: roomName })
        );
      }

      function createMessage(data) {
        var author = data["author"];
        var msgOuterDivTag = document.createElement("div");
        var msgInnerDivTag = document.createElement("div");
        var msgSpanTag = document.createElement("span");
        // var timeSpanTag = document.createElement("span");
        // var brTag = document.createElement("br");
        msgSpanTag.textContent = data.content;
        msgSpanTag.className = "content";
        // timeSpanTag.textContent = data.time;
        // timeSpanTag.className = "timestamp";

        if (author === id) {
          msgOuterDivTag.className = "d-flex justify-content-end";
          msgInnerDivTag.className = "me";
        } else {
          msgOuterDivTag.className = "d-flex justify-content-start";
          msgInnerDivTag.className = "other";
        }

        let chatRoomDiv = document.getElementById(
          "chatRoom" + chatRoom.roomname
        );
        msgInnerDivTag.appendChild(msgSpanTag);
        // msgInnerDivTag.appendChild(brTag);
        // msgInnerDivTag.appendChild(timeSpanTag);
        msgOuterDivTag.appendChild(msgInnerDivTag);
        chatRoomDiv.appendChild(msgOuterDivTag);
        chatRoomDiv.scrollTop = chatRoomDiv.scrollHeight;
      }
    }, 200);
  };

  // useEffect(() => {
  //   //connection to socket
  //   if (props.chatRoomsList && selectedChat) {
  //     props.chatRoomsList.forEach((chatRoom) => {
  //       var roomName = chatRoom.roomname;
  //       var id = chatRoom.user.id;

  //       var chatSocket = new ReconnectingWebSocket(
  //         "ws://" + "localhost:8000" + "/ws/chat/" + roomName + "/"
  //       );

  //       chatSocket.onopen = function (e) {
  //         fetchMessages();
  //       };

  //       chatSocket.onmessage = function (e) {
  //         var data = JSON.parse(e.data);
  //         if (data["command"] === "messages") {
  //           for (let i = 0; i < data["messages"].length; i++) {
  //             createMessage(data["messages"][i]);
  //           }
  //         } else if (data["command"] === "new_message") {
  //           createMessage(data["message"]);
  //         }
  //       };

  //       chatSocket.onclose = function (e) {
  //         console.error("Chat socket closed unexpectedly");
  //       };

  //       document.querySelector("#chat-message-input").onkeyup = function (e) {
  //         if (e.keyCode === 13) {
  //           // enter, return
  //           document.querySelector("#chat-message-submit").click();
  //         }
  //       };

  //       document.querySelector("#chat-message-submit").onclick = function (e) {
  //         var messageInputDom = document.getElementById("chat-message-input");
  //         var message = messageInputDom.value;
  //         chatSocket.send(
  //           JSON.stringify({
  //             command: "new_message",
  //             message: message,
  //             from: id,
  //             chat: roomName,
  //           })
  //         );

  //         messageInputDom.value = "";
  //       };

  //       function fetchMessages() {
  //         chatSocket.send(
  //           JSON.stringify({ command: "fetch_messages", chat: roomName })
  //         );
  //       }

  //       function createMessage(data) {
  //         var author = data["author"];
  //         var msgOuterDivTag = document.createElement("div");
  //         var msgInnerDivTag = document.createElement("div");
  //         var msgSpanTag = document.createElement("span");
  //         // var timeSpanTag = document.createElement("span");
  //         // var brTag = document.createElement("br");
  //         msgSpanTag.textContent = data.content;
  //         msgSpanTag.className = "content";
  //         // timeSpanTag.textContent = data.time;
  //         // timeSpanTag.className = "timestamp";

  //         if (author === id) {
  //           msgOuterDivTag.className = "d-flex justify-content-end";
  //           msgInnerDivTag.className = "me";
  //         } else {
  //           msgOuterDivTag.className = "d-flex justify-content-start";
  //           msgInnerDivTag.className = "other";
  //         }

  //         let chatRoomDiv = document.getElementById(
  //           "chatRoom" + chatRoom.roomname
  //         );
  //         msgInnerDivTag.appendChild(msgSpanTag);
  //         // msgInnerDivTag.appendChild(brTag);
  //         // msgInnerDivTag.appendChild(timeSpanTag);
  //         msgOuterDivTag.appendChild(msgInnerDivTag);
  //         chatRoomDiv.appendChild(msgOuterDivTag);
  //         chatRoomDiv.scrollTop = chatRoomDiv.scrollHeight;
  //       }
  //     });
  //   }
  //   //end of connection
  // }, []);

  const handleCloseChat = () => {
    setSelectedChat(null);
  };

  return (
    <div className="d-flex row h-100">
      {isSmallWindow ? (
        !selectedChat ? (
          <div className="col-12 col-md-5 col-lg-4 contacts">
            {props.chatRoomsList
              ? props.chatRoomsList.map((chatroom) => (
                  <div key={chatroom.roomname}>
                    <div
                      className="contact"
                      onClick={() => handleOpenChat(chatroom.roomname)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          alt="avatar"
                          src={
                            chatroom.user.avatar
                              ? references.base_address + chatroom.user.avatar
                              : DefaultImage
                          }
                          className="avatar"
                        />
                        <span className="name">
                          {chatroom.user.firstName
                            ? chatroom.user.firstName +
                              " " +
                              chatroom.user.lastName
                            : "Private User"}
                        </span>
                      </div>
                    </div>
                    {props.chatRoomsList ? (
                      props.chatRoomsList[props.chatRoomsList.length - 1] ===
                      chatroom ? null : (
                        <hr />
                      )
                    ) : null}
                  </div>
                ))
              : null}
          </div>
        ) : (
          <div className="col-12 col-md-7 col-lg-8 chat-page">
            <Fragment>
              <div className="chat-header">
                <div>
                  <img
                    alt="avatar"
                    src={
                      selectedChat.user.avatar
                        ? references.base_address + selectedChat.user.avatar
                        : DefaultImage
                    }
                    className="avatar"
                  />
                  <span className="name">
                    {selectedChat.user.firstName
                      ? selectedChat.user.firstName +
                        " " +
                        selectedChat.user.lastName
                      : "Private User"}
                  </span>
                </div>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  onClick={handleCloseChat}
                >
                  <CloseIcon />
                </IconButton>
              </div>
              <div
                className="messages"
                id={"chatRoom" + selectedChat.roomname}
              ></div>
              <div className="type-message">
                <InputBase
                  id="chat-message-input"
                  sx={{ flex: 1 }}
                  placeholder="Write a message..."
                />
                <IconButton
                  id="chat-message-submit"
                  type="submit"
                  sx={{ p: "10px", color: "#cd9a2b" }}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </Fragment>
          </div>
        )
      ) : (
        <Fragment>
          <div className="col-12 col-md-5 col-lg-4 contacts">
            {props.chatRoomsList
              ? props.chatRoomsList.map((chatroom) => (
                  <div key={chatroom.roomname}>
                    <div
                      className="contact"
                      onClick={() => handleOpenChat(chatroom.roomname)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          alt="avatar"
                          src={
                            chatroom.user.avatar
                              ? references.base_address + chatroom.user.avatar
                              : DefaultImage
                          }
                          className="avatar"
                        />
                        <span className="name">
                          {chatroom.user.firstName
                            ? chatroom.user.firstName +
                              " " +
                              chatroom.user.lastName
                            : "Private User"}
                        </span>
                      </div>
                    </div>
                    {props.chatRoomsList ? (
                      props.chatRoomsList[props.chatRoomsList.length - 1] ===
                      chatroom ? null : (
                        <hr />
                      )
                    ) : null}
                  </div>
                ))
              : null}
          </div>
          <div className="col-12 col-md-7 col-lg-8 chat-page">
            {selectedChat ? (
              <Fragment>
                <div className="chat-header">
                  <div>
                    <img
                      alt="avatar"
                      src={
                        selectedChat.user.avatar
                          ? references.base_address + selectedChat.user.avatar
                          : DefaultImage
                      }
                      className="avatar"
                    />
                    <span className="name">
                      {selectedChat.user.firstName
                        ? selectedChat.user.firstName +
                          " " +
                          selectedChat.user.lastName
                        : "Private User"}
                    </span>
                  </div>
                  <IconButton
                    type="submit"
                    sx={{ p: "10px" }}
                    onClick={handleCloseChat}
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <div
                  className="messages"
                  id={"chatRoom" + selectedChat.roomname}
                ></div>
                <div className="type-message">
                  <InputBase
                    id="chat-message-input"
                    sx={{ flex: 1 }}
                    placeholder="Write a message..."
                  />
                  <IconButton
                    id="chat-message-submit"
                    type="submit"
                    sx={{ p: "10px", color: "#cd9a2b" }}
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </Fragment>
            ) : (
              <div className="start-chat">
                <span>Select a chat to start messaging</span>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}
