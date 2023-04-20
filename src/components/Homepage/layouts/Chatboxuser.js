import React, { Fragment, useEffect } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import DefaultImage from "../../../statics/img/pics/avatar.jpg";
import ReconnectingWebSocket from "./reconnecting-websocket";

export default function Chatboxuser(props) {
  useEffect(() => {
    //connection to socket
    var roomName = props.roomNumber;
    var id = props.user.id;

    var chatSocket = new ReconnectingWebSocket(
      "ws://" + "localhost:8000" + "/ws/chat/" + roomName + "/"
    );

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

      let chatRoomDiv = document.getElementById("chatRoom");
      msgInnerDivTag.appendChild(msgSpanTag);
      // msgInnerDivTag.appendChild(brTag);
      // msgInnerDivTag.appendChild(timeSpanTag);
      msgOuterDivTag.appendChild(msgInnerDivTag);
      chatRoomDiv.appendChild(msgOuterDivTag);
      chatRoomDiv.scrollTop = chatRoomDiv.scrollHeight;
    }
    //end of connection
  }, []);

  return (
    <div className="admin-content">
      <div className="chatbox" style={{ paddingLeft: "12px" }}>
        <div className="d-flex row h-100">
          <div className="col-12 chat-page">
            <Fragment>
              <div className="chat-header">
                <div>
                  <img
                    alt="avatar"
                    src={props.hotel ? props.hotel.header : DefaultImage}
                    className="avatar"
                  />
                  <span className="name">
                    {props.hotel ? props.hotel.name : "Hotel"}
                  </span>
                </div>
              </div>
              <div className="messages" id="chatRoom"></div>
              <div className="type-message">
                <InputBase
                  id="chat-message-input"
                  sx={{ flex: 1 }}
                  placeholder="Write a message..."
                  // onChange={handleChange}
                  // value={message}
                />
                <IconButton
                  id="chat-message-submit"
                  type="submit"
                  sx={{ p: "10px", color: "#cd9a2b" }}
                  // onClick={handleSendMessage}
                >
                  <SendIcon />
                </IconButton>
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}
