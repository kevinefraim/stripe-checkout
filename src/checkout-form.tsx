import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

interface Props{
  price:number
}

const CheckoutForm: React.FC<Props>= ({price}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: process.env.REACT_APP_RETURN_URL as string,
      },
    });
    if (result.error) {
      setError(result.error.message as string);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <PaymentElement className="relative" />
      <button
        disabled={isLoading || !stripe || !elements}
        className={`bg-blue-600 p-2 rounded mt-4 text-white w-full ${
          (isLoading || !stripe || !elements) && "bg-gray-200"
        }`}
      >
        Pay ${price}
      </button>
    </form>
  );
};

export default CheckoutForm;
