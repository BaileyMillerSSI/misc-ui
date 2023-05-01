import { zodResolver } from "@hookform/resolvers/zod";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DemoContainer from "~/atoms/DemoContainer";
import Input from "~/atoms/Input";
import { DateTime } from "luxon";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.coerce
    .date()
    .min(
      DateTime.now().minus({ years: 150 }).toJSDate(),
      "Date too far in the past"
    )
    .max(
      DateTime.now().startOf("day").toJSDate(),
      "Date cannot be in the future"
    ),
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
        onSubmit={async (e) => {
          await handleSubmit(async (form) => {
            console.log(form);
            await router.push({ pathname: "/ui/login" });
          }, console.error)(e);
        }}
        className="flex flex-col gap-6"
      >
        <Input<SignUpFormSchema>
          name="email"
          control={control}
          label="Enter Email"
          type="email"
          autoComplete="username"
          placeholder="Enter your email"
        />

        <Input<SignUpFormSchema>
          name="password"
          control={control}
          label="Enter Password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
        />

        <Input<SignUpFormSchema>
          name="firstName"
          control={control}
          label="First Name"
          type="text"
          autoComplete="given-name"
          placeholder="Enter your first name"
        />

        <Input<SignUpFormSchema>
          name="lastName"
          control={control}
          label="Last Name"
          type="text"
          autoComplete="family-name"
          placeholder="Enter your last name"
        />

        <Input<SignUpFormSchema>
          name="dateOfBirth"
          control={control}
          label="Date of Birth"
          type="date"
          autoComplete="bday"
          placeholder="Enter your date of birth"
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
