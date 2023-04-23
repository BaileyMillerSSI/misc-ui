import { Control, FieldName, useController } from "react-hook-form";
import { LoginFormSchema } from "~/pages/ui/login";
import ErrorMessage from "./ErrorMessage";

interface ICheckboxProps {
  name: FieldName<LoginFormSchema>;
  control: Control<LoginFormSchema>;
  label: string;
}

const Checkbox = ({ name, control, label }: ICheckboxProps) => {
  const {
    field: { onChange, onBlur, ref, value },
    fieldState: { error },
  } = useController<LoginFormSchema>({
    control,
    name: name,
  });

  return (
    <div>
      <input
        id={name}
        title={label}
        tabIndex={3}
        className="checkbox float-left mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded-sm border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-700 checked:bg-blue-700 focus:outline-none"
        type="checkbox"
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={value as any}
      />
      <label
        htmlFor={name}
        className="form-check-label inline-block cursor-pointer select-none text-black dark:text-white"
      >
        {label}
      </label>
      <ErrorMessage show={error !== undefined} message={error?.message} />
    </div>
  );
};

export default Checkbox;
