import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSendQuestionMutation } from "../slice/ai";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

interface Message {
  text: string;
  isUser: boolean;
}

const ChatbotPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sendQuestion, { isLoading, isError, error }] = useSendQuestionMutation();

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const userMessage: Message = { text: inputText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    try {
      const response = await sendQuestion({ query: inputText }).unwrap();

      if (response?.data) {
        const botMessage: Message = { 
          text: response.data, 
          isUser: false 
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage: Message = { 
        text: "Sorry, I couldn't process your request. Please try again.", 
        isUser: false 
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col pt-15 h-screen bg-gray-100">
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
              {message.isUser ? (
                message.text
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  components={{
                    code({  className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <div className="bg-gray-800 rounded-md p-2 my-2 overflow-x-auto">
                          <code className={`hljs language-${match[1]}`} {...props}>
                            {children}
                          </code>
                        </div>
                      ) : (
                        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
                          {children}
                        </code>
                      );
                    },
                    a({ ...props }) {
                      return <a className="text-blue-600 hover:underline" {...props} />;
                    },
                    ul({ ...props }) {
                      return <ul className="list-disc pl-5 my-2" {...props} />;
                    },
                    ol({ ...props }) {
                      return <ol className="list-decimal pl-5 my-2" {...props} />;
                    },
                    blockquote({ ...props }) {
                      return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props} />;
                    },
                    table({ ...props }) {
                      return <div className="overflow-x-auto"><table className="border-collapse border border-gray-300 my-2" {...props} /></div>;
                    },
                    th({ ...props }) {
                      return <th className="border border-gray-300 px-3 py-1 bg-gray-100" {...props} />;
                    },
                    td({ ...props }) {
                      return <td className="border border-gray-300 px-3 py-1" {...props} />;
                    }
                  }}
                >
                  {message.text}
                </ReactMarkdown>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start mb-4">
            <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || inputText.trim() === ""}
            className={`ml-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        
        {isError && (
          <div className="mt-2 text-red-500 text-sm">
            {error && 'data' in error 
              ? (error.data as { message?: string })?.message || 'Failed to send message'
              : 'Failed to send message'}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatbotPage;