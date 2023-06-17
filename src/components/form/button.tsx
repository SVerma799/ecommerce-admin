import _ from "lodash";
import React from "react";
import Image from "next/image";

const ButtonComponent = (props: any, ref: any) => {
  const {
    required,
    buttonClass,
    icon,
    alt,
    iconClassNames,
    ImageSrc,
    ...inputProps
  } = props;
  return (
    <button
      className={`flex items-center justify-center bg-indigo-800  hover:text-slate-950  border-2 border-transparent hover:border-indigo-800  hover:bg-slate-50 gap-2 text-white rounded-md p-4 ${buttonClass}`}
      {...inputProps}
      required={required}
      ref={ref}
    >
      {props.children}
      {(ImageSrc || icon) && (
        // right -0 have to provide icon container class
        // Icon class fill-current h-4 w-4
        <>
          {ImageSrc && (
            <Image src={ImageSrc} alt={alt} className={iconClassNames} />
          )}
          {icon && <props.icon className={iconClassNames} />}
        </>
      )}
    </button>
  );
};

const Button = React.forwardRef(ButtonComponent);
export { Button };
