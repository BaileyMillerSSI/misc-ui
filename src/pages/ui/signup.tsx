import { zodResolver } from "@hookform/resolvers/zod";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DemoContainer from "~/atoms/DemoContainer";
import Input from "~/atoms/Input";

const formSchema = z
  .object({
    email: z.string().min(1, "Email is required").email(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export type SignUpFormSchema = z.infer<typeof formSchema>;

const SignUpPage: NextPage = () => {
  const router = useRouter();
  const { email } = router.query;

  const {
    control,
    setValue,
    formState: { isSubmitting, isValid },
    handleSubmit,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setValue("email", email as string);
  }, [router.query]);

  return (
    <DemoContainer>
      <form
        onSubmit={handleSubmit((form) => console.log(form))}
        className="flex flex-col gap-6"
      >
        <Input<SignUpFormSchema>
          name="email"
          control={control}
          label="Enter Email"
          type="email"
          autoComplete="email"
        />

        <Input<SignUpFormSchema>
          name="password"
          control={control}
          label="Enter Password"
          type="password"
          autoComplete="new-password"
        />

        <Input<SignUpFormSchema>
          name="confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
        />

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="button w-full"
            disabled={!isValid || isSubmitting}
          >
            Sign Up
          </button>
        </div>
      </form>
    </DemoContainer>
  );
};

export default SignUpPage;
