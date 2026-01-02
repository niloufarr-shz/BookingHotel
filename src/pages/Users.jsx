import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/signupForm";
function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user </Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
