import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Route, Routes } from "react-router-dom";
import People from "../../components/People/People";
import Invites from "../../components/Invitation/Invites";

const PeoplePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/users/recommended_mentors");
        const mentors = response.data;
        setUsers(mentors);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <Routes>
      <Route path="/" element={<People users={users} />} />
      <Route path="/invites" element={<Invites/>} />
    </Routes>
  );
};

export default PeoplePage;
