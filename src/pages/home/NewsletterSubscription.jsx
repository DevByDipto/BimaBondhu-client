import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../../hooks/useAxios";
import Swal from "sweetalert2";

const NewsletterSubscription = () => {
    const axiosInstance = useAxios()
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm();

  const onSubmit = async (data) => {
  try {
    const res = await axiosInstance.post("/newsletter", data);
    if (res.data?.insertedId) {
      Swal.fire({
        icon: "success",
        title: "Subscribed!",
        text: "You have successfully subscribed to our newsletter.",
        confirmButtonColor: "#3085d6",
      });
      reset();
    }
  } catch (error) {
    console.error("❌ Subscription failed:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again.",
      confirmButtonColor: "#d33",
    });
  }
};


  return (
    <div className="max-w-xl mx-auto p-6  shadow-lg rounded-xl mt-20 md:mt-32">
      <h2 className="text-2xl font-semibold mb-4 text-center">📬 Subscribe to our Newsletter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full input input-bordered"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full input input-bordered"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full"
        >
          {isSubmitting ? "Submitting..." : "Subscribe"}
        </button>
        {/* {isSubmitSuccessful && <p className="text-green-600 mt-2 text-center">Thanks for subscribing!</p>} */}
      </form>
    </div>
  );
};

export default NewsletterSubscription;
