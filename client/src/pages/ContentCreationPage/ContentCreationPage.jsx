
import { Route, Routes } from "react-router-dom";
import ContentCreationForm from '../../components/ContentCreationForm/ContentCreationForm';
import ContentDisplay from "../../components/ContentCreationForm/ContentDisplay";

const App = () => {
  return (
    <Routes>
        <Route path="/:id" element={<ContentDisplay />} />
        <Route path="/new" element={<ContentCreationForm />} />
    </Routes>
  );
}

export default App;
