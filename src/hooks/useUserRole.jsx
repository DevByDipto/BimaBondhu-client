import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserRole = () => {
    const {user} = useAuth()
    const email = user.email
    // console.log(email);
    
  const axiosSecure = useAxiosSecure();

  const { data: role = null, isPending:roleLoder, refetch } = useQuery({
    queryKey: ["userRole", email],
    enabled: !!email, // Email থাকলে চালাবে
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${email}`);
      return res.data?.role; // শুধু role string ফেরত দিচ্ছে
    },
  });

  return { role, roleLoder, refetch };
};

export default useUserRole;
