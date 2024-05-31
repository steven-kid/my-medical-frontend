import React, { useState, useEffect, useRef } from "react";
import "./message.css";

function Message({ setIsGenerating }) {
  const [content, setContent] = useState("");
  const eventSourceRef = useRef();

  useEffect(() => {
    console.log("Component mounted.");
    setIsGenerating(true);  // Assume we start generating when component mounts

    eventSourceRef.current = new EventSource("http://localhost:4000/events");

    eventSourceRef.current.onmessage = function (event) {
      // 使用正则表达式替换 % 和 。 后面的内容为 <br />
      const newData = event.data.replace(/%/g, "%<br />").replace(/。/g, "。<br />");

      setContent((prevContent) => {
        const updatedContent = prevContent + newData;
        const last20Chars = updatedContent.slice(-20);
        console.log(last20Chars);
        const updatedLast20Chars = last20Chars
        .replace(/(患病概率|体重管理|戒烟限酒|定期体检|药物治疗|急诊准备|42%|50%)/g, "<strong>$1</strong>");
        return updatedContent.slice(0, -20) + updatedLast20Chars;
      });
    };

    eventSourceRef.current.onerror = function (event) {
      console.log("SSE closed or encountered an error", event);
      if (eventSourceRef.current.readyState === EventSource.CLOSED) {
        console.log("EventSource closed by the server.");
      }
      setIsGenerating(false); // Set generating to false when SSE is closed or errors out
      eventSourceRef.current.close(); // Ensure we close on our side as well
    };

    return () => {
      console.log("Component will unmount.");
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      setIsGenerating(false); // Ensure we set generating to false when the component unmounts
    };
  }, [setIsGenerating]); // Include setIsGenerating in the dependency array to follow best practices

  // 使用 dangerouslySetInnerHTML 以插入 HTML
  return <div className="message-box" dangerouslySetInnerHTML={{ __html: "<h1>心鉴 - 你的医疗AI</h1>" + content }}></div>;
}

export default Message;
