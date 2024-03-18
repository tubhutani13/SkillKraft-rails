
import useMessage from "../../hooks/useMessage";

function MessageDisplay() {
  const { messageText, clearMessage } = useMessage();

  return (
    <div className="error-container" onClick={clearMessage}>
      <div className="error-message">{messageText}</div>
    </div>
  );
}

export default MessageDisplay;
