import _ from "lodash";
import React from "react";
import Image from "next/image";

const ButtonComponent = (props: any, ref: any) => {
  const {
    rootClass,
    required,
    inputClass,
    icon,
    alt,
    iconContainerClassName,
    iconClassNames,
    ...inputProps
  } = props;
  return (
    <div className={`flex flex-col ${rootClass}`}>
      <div className={`${icon ? "relative" : ""}`}>
        <button
          className={`bg-indigo-800 hover:bg-white hover:text-slate-950  border border-transparent hover:border-indigo-800 ${inputClass}`}
          {...inputProps}
          required={required}
          ref={ref}
        >
          {props.children}
        </button>
        {icon && (
          // right -0 have to provide icon container class
          // Icon class fill-current h-4 w-4
          <div
            className={`pointer-events-none absolute inset-y-0 x flex items-center px-2 text-gray-700 ${iconContainerClassName}`}
          >
            <Image src={icon} alt={alt} className={iconClassNames} />
          </div>
        )}
      </div>
    </div>
  );
};

const Button = React.forwardRef(ButtonComponent);
export { Button };
