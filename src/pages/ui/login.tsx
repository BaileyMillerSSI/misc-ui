import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Checkbox from "~/atoms/Checkbox";
import DemoContainer from "~/atoms/DemoContainer";
import Input from "~/atoms/Input";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().default(false),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

const LoginPage: NextPage = () => {
  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const emailWatch = useWatch({
    control: control,
    name: "email",
  });

  return (
    <DemoContainer>
      <form
        onSubmit={void handleSubmit((form) => console.log(form))}
        className="flex flex-col gap-6"
      >
        <Input<LoginFormSchema>
          name="email"
          control={control}
          label="Enter Email"
          type="email"
          placeholder="Enter your email"
          autoComplete="username"
        />

        <Input<LoginFormSchema>
          name="password"
          control={control}
          label="Enter Password"
          type="password"
          placeholder="Enter your password"
          autoComplete="current-password"
        />

        <Checkbox name="rememberMe" control={control} label="Remember Me" />

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="button w-full"
            disabled={!isValid || isSubmitting}
          >
            Login
          </button>
          <Link
            href={{
              pathname: "/ui/signup",
              query:
                emailWatch && emailWatch !== "" ? { email: emailWatch } : null,
            }}
            className="w-full"
          >
            <button
              type="button"
              className="button w-full"
              disabled={isSubmitting}
            >
              Sign up
            </button>
          </Link>
        </div>
      </form>
    </DemoContainer>
  );
};

export default LoginPage;
