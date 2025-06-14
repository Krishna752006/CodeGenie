import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./styles.css";
import { IoSendOutline } from 'react-icons/io5';
import { IoAddCircleOutline } from "react-icons/io5";
import { HiDesktopComputer } from 'react-icons/hi';
import { BsPciCard } from 'react-icons/bs';



// ✅ Define the response structure expected from the backend
interface GenerateResponse {
  response: string;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);


  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "40px"; // reset height
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
      textarea.style.overflowY = textarea.scrollHeight > 120 ? "auto" : "hidden";
    }
  }, [input]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const prompt = input.trim();
    setMessages(prev => [...prev, { text: prompt, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    try {
<<<<<<< HEAD
      // ✅ Type the Axios response
      const response = await axios.post<GenerateResponse>("http://127.0.0.1:8000/generate", {
        prompt,
        max_tokens: 500
      });

      if (!response.data?.response) {
        throw new Error("Empty response from server");
      }

      const aiResponse = extractOnlyCode(response.data.response);
      setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [
        ...prev,
        { text: "❌ Error: Failed to get response from AI backend", sender: "bot" }
      ]);
    }

    setIsTyping(false);
  };
=======
      const API_URL = isOnline
        ? "http://<rtx-4050-server-ip>:8000/generate"  // future use
        : "http://127.0.0.1:8000/generate";            // local 

      const response = await axios.post(API_URL, {
        prompt,
        max_tokens: 500
      });

<<<<<<< HEAD
        if(!response.data?.response) {
          throw new Error("Empty response from server");
    }
>>>>>>> 1a64a298 (added toggle for online and offline)
=======
      if (!response.data?.response) {
        throw new Error("Empty response from server");
      }
>>>>>>> a295d127 (modified UI(icons and input area))

      const aiResponse = extractOnlyCode(response.data.response);
      setMessages(prev => [...prev, { text: aiResponse, sender: "bot" }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, {
        text: "❌ Error: Failed to get response from AI backend",
        sender: "bot"
      }]);
    }
    setIsTyping(false);
  };


  const extractOnlyCode = (response: string) => {
    return response
      .split("\n")
      .filter(line =>
        !/^[/#*]+/.test(line.trim()) &&
        !/^\s*(?:This|Explanation|The function)/i.test(line.trim()) &&
        line.trim() !== ""
      )
      .join("\n")
      .trim();
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-history" ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-bubble ${msg.sender === "user" ? "user-bubble" : "bot-bubble"}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">CodeGenie is typing...</div>}
      </div>

      <div className="chatbox-input-area">
        <button className="action-button">
          <IoAddCircleOutline size={20} />
        </button>

        <button
          className="action-button"
          onClick={() => setIsOnline(prev => !prev)}
          title={isOnline ? "RTX Mode (Remote)" : "Local Mode (on device)"}
        >
          {isOnline ? <BsPciCard size={20} /> : <HiDesktopComputer size={20} />}
        </button>

        <textarea
          ref={textareaRef}
          className="chatbox-input"
          placeholder="Type your task here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
              const target = e.target as HTMLTextAreaElement;
              setTimeout(() => {
                target.style.height = "40px";
                target.scrollTop = 0;
              }, 0);
            }
          }}
        />




        <button className="send-button" onClick={sendMessage}>
          <IoSendOutline size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
