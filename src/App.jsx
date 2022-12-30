import React, {lazy, Suspense} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import MainLayout from "./layouts";
import Login from "./pages/login";
import User from "./pages/user";
import Setting from "./pages/setting";
import Language from "./pages/language";
import Harbour from "./pages/harbour";
import Plan from "./pages/plan";
import PlanAction from "./pages/plan/action";


function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="/users" element={<User/>}/>
                    <Route path="/settings" element={<Setting/>}/>
                    <Route path="/languages" element={<Language/>}/>
                    <Route path="/harbours" element={<Harbour/>}/>
                    <Route path="/plans" element={<Plan/>}/>
                    <Route path="/plans/:action/:id?" element={<PlanAction/>}/>
                </Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
