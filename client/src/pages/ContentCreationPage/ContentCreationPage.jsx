
import { Route, Routes } from "react-router-dom";
import ContentCreationForm from '../../components/ContentCreationForm/ContentCreationForm';

const App = () => {
  return (
    <Routes>
        <Route path="/new" element={<ContentCreationForm />} />
    </Routes>
  );
}

export default App;
