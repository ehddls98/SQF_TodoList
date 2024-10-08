import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import { Global } from "@emotion/react";
import { reset } from "./styles/common";
import DandP from "./pages/DandP/DandP";
import MainLayout from "./components/MainLayout/MainLayout";
import Note from "./pages/Note/Note";


function App() {
    return (
        <>
            <Global styles={reset} />
            <MainLayout>
                <Routes>
                    <Route path="/todo/*" element={<Dashboard />} /> 
                    <Route path="/login" element={<></>} />
                    <Route path="/join" element={<></>} />
                    <Route path="/dp" element={<DandP />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/note" element={<Note />} />
                </Routes>
            </MainLayout>
        </>
    );
}

export default App;

