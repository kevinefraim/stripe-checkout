import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./checkout-form";


function PaymentElement() {
  const queryParams = new URLSearchParams(window.location.search);
  const clientSecret = queryParams.get("secret") as string;
  const stripeAccount = queryParams.get("acc") as string;
  const price = queryParams.get("price");
  const publicKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY as string

  const stripePromise = loadStripe(
    publicKey,
    { stripeAccount }
  );

  return (
    <main className="h-screen w-screen">
      {clientSecret && stripeAccount && price && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <section className="flex w-full h-full justify-center items-center p-20">
            <CheckoutForm price={+price} />
          </section>
        </Elements>
      )}
    </main>
  );
}

export default PaymentElement;
