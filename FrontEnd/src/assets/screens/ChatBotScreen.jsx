import React from "react";

function ChatBotScreen() {
  return (
    <div className="ChatBot-Screen">
      <div className="chatBot border">
      <iframe
        width="350"
        height="430"
        allow="microphone;"
        src="https://console.dialogflow.com/api-client/demo/embedded/4250ba2f-5202-4176-bd04-5af2c94fbd9b"
      ></iframe>
      </div>
    </div>
  );
}

export default ChatBotScreen;
