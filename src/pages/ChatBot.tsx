import React, { useState } from "react";

// Define the type for messages
interface Message {
  text: string;
  isUser: boolean; // true for user, false for bot
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputText.trim() === "") return; // Don't send empty messages

    // Add user message to the conversation
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, isUser: true },
    ]);

    // Log the user message to the console
    console.log("User:", inputText);

    // Simulate a bot reply (for demonstration purposes)
    setTimeout(() => {
      const botReply = `You said: "${inputText}"`;
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botReply, isUser: false },
      ]);
      console.log("Bot:", botReply);
    }, 1000);

    // Clear the input field
    setInputText("");
  };

  return (
    <div className="flex flex-col pt-15 h-screen bg-gray-100">
      {/* Conversation Display */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Box (Fixed at the Bottom) */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;