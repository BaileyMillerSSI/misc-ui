import { type Control, useController, type Path } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { type HTMLInputTypeAttribute } from "react";
import { type LoginFormSchema } from "~/pages/ui/login";
import { type SignUpFormSchema } from "~/pages/ui/signup";

type KnownFormSchemas = LoginFormSchema | SignUpFormSchema;

interface IInputProps<FormType extends KnownFormSchemas> {
  name: Path<FormType>;
  control: Control<FormType>;
  placeholder?: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
}

const Input = <FormType extends KnownFormSchemas>({
  name,
  control,
  placeholder,
  label,
  type,
  autoComplete,
}: IInputProps<FormType>) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController<FormType>({
    control,
    name: name,
  });

  return (
    <div className="relative">
      <input
        id={name}
        tabIndex={1}
        type={type}
        className="peer h-10 w-full rounded bg-gray-200 p-2 text-black placeholder-transparent focus:outline-none"
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value as string | number | readonly string[] | undefined}
        autoComplete={autoComplete}
      />
      <label
        htmlFor={name}
        className="absolute
            -top-5
            left-0
            text-sm text-black transition-all
            peer-placeholder-shown:left-2
            peer-placeholder-shown:top-2
            peer-placeholder-shown:text-base
            peer-placeholder-shown:text-black
            peer-focus:-top-5
            peer-focus:left-0
            peer-focus:text-sm
            peer-focus:text-black
            dark:text-white
            peer-focus:dark:text-white z-50"
      >
        {label}
      </label>
      <ErrorMessage show={error !== undefined} message={error?.message} />
    </div>
  );
};

export default Input;
