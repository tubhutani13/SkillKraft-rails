import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InvitationCard from "./InvitationCard";
import api from "../../utils/api";

const Invites = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [showReceived, setShowReceived] = useState(true); // State to manage which requests to show

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await api.get("/connection_requests/received_connection_requests");
        setReceivedRequests(response.data);
      } catch (error) {
        console.error("Error fetching received connection requests:", error);
      }
    };

    const fetchSentRequests = async () => {
      try {
        const response = await api.get("/connection_requests/sent_connection_requests");
        setSentRequests(response.data);
      } catch (error) {
        console.error("Error fetching sent connection requests:", error);
      } 
    };

    // Fetch received requests by default
    fetchReceivedRequests();
    fetchSentRequests();
  }, []);

  const handleShowReceived = () => {
    setShowReceived(true);
  };

  const handleShowSent = () => {
    setShowReceived(false);
  };

  // Define onUpdate function to trigger rerender of Invites component
  const onUpdate = async () => {
    // Fetch updated received or sent requests
    try {
      const response = await api.get(showReceived ? "/connection_requests/received_connection_requests" : "/connection_requests/sent_connection_requests");
      if (showReceived) {
        setReceivedRequests(response.data);
      } else {
        setSentRequests(response.data);
      }
    } catch (error) {
      console.error("Error fetching updated connection requests:", error);
    }
  };

  return (
    <div className="invitation-small">
      <div className="header">
        <p>Invitations</p>
      </div>
      <button className="buttonFlat" onClick={handleShowReceived}>
        Received
      </button>
      <button className="buttonFlat" onClick={handleShowSent}>
        Sent
      </button>
      <div>
        {showReceived ? 
          (
            receivedRequests.length === 0 && <p>No new invitations</p>
          )
         :
          sentRequests.length === 0 && <p>No sent invitations</p>
        }
        {showReceived ? (
          receivedRequests.map((request, index) => (
            <InvitationCard key={index} id={request.id} user={request.user} sent={false} onUpdate={onUpdate} />
          ))
        ) : (
          sentRequests.map((request, index) => (
            <InvitationCard key={index} id={request.id} user={request.user} sent={true} onUpdate={onUpdate} />
          ))
        )}
      </div>
    </div>
  );
};

export default Invites;
