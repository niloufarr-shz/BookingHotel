import ButtonIcon from "../../ui/ButtonIcon";
import { IoLogOut } from "react-icons/io5";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {!isPending ? (
        <>
          <IoLogOut /> 
          <span> sign out  </span>{" "}
        </>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
