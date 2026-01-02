import { useForm } from "react-hook-form";
import { useState } from "react";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /^\S+@\S+\.\S+/

function SignupForm() {
  const { singup, isPending } = useSignup();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { register, formState, getValues, handleSubmit, reset } = useForm();

  const { errors } = formState;
  function onSubmit({ fullName, email, password }) {
    singup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          disabled={isPending}
          type="text"
          id="fullName"
           autoComplete="username"
          {...register("fullName", { required: " این فیلد اجباری می باشد  " })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
           autoComplete="email"
          disabled={isPending}
          {...register("email", {
            required: "این فیلد اجباری می باشد ",
            pattern: {
              value: /^\S+@\S+\.\S+/,
              message: "لطفا ایمیل را صحیح وارد کنید ",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.password?.message}>
        <div style={{ position: "relative" }}>
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            autocomplete="new-password"
            disabled={isPending}
            style={{ paddingRight: "40px", width: "100%" }}
            {...register("password", {
              required: "پسورد الزامی است",
              minLength: {
                value: 8,
                message: "پسورد باید حداقل ۸ کاراکتر باشد",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%&*])[A-Za-z\d@#$%&*]{8,}$/,
                message:
                  "پسورد باید شامل حرف بزرگ، عدد و کاراکتر خاص (@#$%&*) باشد",
              },
            })}
          />

          <span
            onClick={() => setShowPassword((s) => !s)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <div style={{ position: "relative" }}>
          <Input
            type={showConfirm ? "text" : "password"}
            id="passwordConfirm"
            disabled={isPending}
            autoComplete="new-password"
            style={{ paddingRight: "40px", width: "100%" }}
            {...register("passwordConfirm", {
              required: "تکرار پسورد الزامی است",
              validate: (value) =>
                value === getValues().password || "پسوردها با هم برابر نیستند",
            })}
          />

          <span
            onClick={() => setShowConfirm((s) => !s)}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {showConfirm ? "🙈" : "👁"}
          </span>
        </div>
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset" disabled={isPending} onClick={reset}>
          cancel
        </Button>
        <Button variation="secondary" type="submit" disabled={isPending}>
          Create new user
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
