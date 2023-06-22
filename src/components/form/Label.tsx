import classNames from "classnames";
import React from "react";
import InfoTip from "./InfoTip";

const LabelComp = ({
  name,
  label,
  required,
  infoText,
  className,
  bold,
}: {
  name: string;
  infoText?: string;
  label: string;
  className?: string;
  required?: boolean;
  bold?: boolean;
}) => (
  <label
    htmlFor={name}
    className={classNames(
      className || "text-granite mb-2",
      bold ? "font-bold" : ""
    )}
  >
    {label}
    {required && <span className="text-red">{" *"}</span>}
    {infoText && <InfoTip text={infoText} />}
  </label>
);

const Label = React.forwardRef(LabelComp);
export { Label };
