import { Routes, Route } from "react-router-dom";
import PaymentElement from "./payment-element";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<PaymentElement />} />
    </Routes>
  );
};

export default App;
