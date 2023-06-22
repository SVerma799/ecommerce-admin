import _ from "lodash";
import React from "react";
import { Label } from "./Label";

const SelectFieldComponent = (props: any, ref: any) => {
  const {
    label,
    labelClassName,
    infoText,
    rootClass,
    required,
    inputClass,
    icon,
    ...inputProps
  } = props;
  return (
    <div className={`flex flex-col ${rootClass}`}>
      <Label
        infoText={infoText}
        label={label}
        name={inputProps.name}
        bold
        className={labelClassName}
      />
      <div className={`${icon ? "relative" : ""}`}>
        <select
          className={`block appearance-none w-full border border-gray-200 hovers:border-gray-300 px-4 py-2   rounded leading-tight focus:outline-none focus:border-gray-300 ${inputClass}`}
          {...inputProps}
          required={required}
          ref={ref}
        >
          {props.children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12l-5-5 1.41-1.41L10 9.17l4.59-4.58L15 7l-5 5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const SelectField = React.forwardRef(SelectFieldComponent);
export { SelectField };
