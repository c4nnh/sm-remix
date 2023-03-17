import React from "react";

type Props = {
  name: string;
  label?: string;
  inputProps?: Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "name"
  >;
  labelProps?: Omit<
    React.DetailedHTMLProps<
      React.LabelHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >,
    "htmlFor"
  >;
};

export const Input: React.FC<Props> = ({
  name,
  label,
  inputProps,
  labelProps,
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-heading"
        {...labelProps}
      >
        {label}
      </label>
      <input
        name={name}
        className="mt-2 block w-full rounded-xl border-2 border-muted-3 bg-transparent px-4 py-2.5 font-semibold text-heading placeholder:text-text/50 focus:border-primary focus:outline-none focus:ring-0 sm:text-sm"
        {...inputProps}
      />
    </div>
  );
};
