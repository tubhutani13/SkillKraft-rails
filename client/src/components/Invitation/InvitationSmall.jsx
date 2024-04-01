import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./InvitationSmall.scss";
import profilePicture from "../../assets/default-profile-image.png";
import InvitationCard from "./InvitationCard";
import api from "../../utils/api";

const InvitationSmall = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      try {
        const response = await api.get("/connection_requests/received_connection_requests");
        setReceivedRequests(response.data.slice(0, 3)); // Slice the first 3 requests
      } catch (error) {
        console.error("Error fetching received connection requests:", error);
      }
    };

    fetchReceivedRequests();
  }, []);

  return (
    <div className="invitation-small">
      <div className="header">
        <p>Invitations</p>
        <Link to="/people/invites"> See All</Link>
      </div>
      <div>
        {receivedRequests.length === 0 ? (
          <p>No new invitations</p>
        ) : (
          receivedRequests.map((request, index) => (
            <InvitationCard key={index} user={request.user} id={request.id} sent={false} />
          ))
        )}
      </div>
    </div>
  );
};

export default InvitationSmall;
