import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: singup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
        console.log(user)
      toast.success(
        "Account successfully created . please verify the new account from the users's email address"
      );
    },
  });
  return { singup, isPending };
}
