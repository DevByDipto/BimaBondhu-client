import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { policyId } = useParams();
  const [loading,SetLoading] = useState(false)
  // console.log(policyId);
  
  const { user } = useAuth();
  // console.log(user.email);
  
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { isPending, data: policyInfo } = useQuery({
    queryKey: ["parcel", policyId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/policies?id=${policyId}`);
      return res.data.data;
    },
  });

  if (isPending) {
    return "....loding";
  }
  // console.log(policyInfo);
  

  const amount = policyInfo.premium_per_month;
  const amountIncents = amount * 100;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // validate the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      // console.log(error);
    } else {
      setError("");
      // console.log("[PaymentMethod]", paymentMethod); //client side e aita create korar por samne aitar ar kaj kii ?? kono kaj nah thakle toiri keno korsi ??
      // step-2 create payment instance
      const res = await axiosSecure.post("/create-payment-intent", {
        amountIncents,
        policyId,
      });

      const clientSecret = res.data.clientSecret;

      //step-3 confirme payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName, // You can collect this from the user
            email: user.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          // console.log("Payment successful!");
          // console.log(result);

          // mark parcel payed also create a payment history
          const paymentInfo = {
            policyId,
            policy_name: policyInfo.title,
            payment_status: 'success',
            userEmail: user.email,
            amount,
            method: result.paymentIntent.payment_method_types,
            transactionId: result.paymentIntent.id,
          };


          try {
             const res = await axiosSecure.post("/savePaymentInfo", paymentInfo);
            SetLoading(true)
            if (res.data.paymentInsert.insertedId) {
            // console.log("paymen success");
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              html: `<strong>Transaction ID:</strong><br><code>${result.paymentIntent.id}</code>`,
              confirmButtonText: "Go to My Parcel",
            }).then(() => {
              navigate("/dashboard/payment-status"); // redirect after confirmation
            });
          }
          } catch (error) {
            toast.error(error.message)
          }finally{
SetLoading(false)
          }
         
          // console.log(res.data);
          
          
        }
      }
    }
  };
  return (
   <div>
  <form
    onSubmit={handleSubmit}
    className="p-5 w-8/12 mx-auto mt-10 space-y-4 rounded-md"
  >
    {/* Readonly Fields from policyInfo */}
    <div>
      <label className="block font-semibold mb-1">Policy Name</label>
      <input
        type="text"
        value={policyInfo?.title}
        readOnly
        className="input input-bordered w-full "
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Policy Category</label>
      <input
        type="text"
        value={policyInfo?.category}
        readOnly
        className="input input-bordered w-full "
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">Premium per Month</label>
      <input
        type="text"
        value={`$${policyInfo?.premium_per_month}`}
        readOnly
        className="input input-bordered w-full "
      />
    </div>

    <div>
      <label className="block font-semibold mb-1">User Email</label>
      <input
        type="email"
        value={user.email}
        readOnly
        className="input input-bordered w-full "
      />
    </div>

    {/* Stripe Card Element */}
    <div>
      <label className="block font-semibold mb-1">Card Info</label>
      <CardElement className="p-2 bg-white border border-gray-300 rounded-md" />
    </div>

    {/* Submit Button */}
    <button
      className="btn btn-primary text-black w-full mt-5"
      type="submit"
      disabled={!stripe || loading}
    >
      Pay policy premium cost ${policyInfo?.premium_per_month}
    </button>

    {/* Error Message */}
    <p className="text-red-500">{error}</p>
  </form>
</div>

  );
};

export default PaymentForm;
