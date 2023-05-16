import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import App from "./components/App/App.tsx";
import Phone from "./components/Phone/Phone.tsx";
import Auth from "./components/Auth/Auth";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Не загрузились...</div>}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/" element={<App />} />
          <Route path="*" element={<App />} />
        </Routes>
      </Suspense>
    </Router>
  </Provider>
);
