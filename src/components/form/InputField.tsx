import { forwardRef } from "react";
import { useTranslation } from "next-i18next";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";

const ErrorLabel = (props: any) => {
  const { error, className, ...otherProps } = props;
  const { t } = useTranslation();

  return (
    <small className={`${className} text-red`} {...otherProps}>
      {error &&
        (error.type === "required" && !error.message
          ? t("thisFieldIsRequired")
          : error.message)}
    </small>
  );
};

const InputFieldComponent = (props: any, ref: any) => {
  const {
    label,
    labelClassName,
    rootClass,
    required,
    infoText,
    inputClass,
    ...inputProps
  } = props;
  const { errors } = useFormContext();
  const error = _.get(errors, inputProps.name);

  return (
    <div className={rootClass}>
      {label && (
        <Label
          name={inputProps.name}
          label={label}
          className={labelClassName}
          required={required}
          infoText={infoText}
        />
      )}
      <input className={inputClass} ref={ref} {...inputProps} />
      {error && <ErrorLabel error={error} />}
    </div>
  );
};

const InputField = forwardRef(InputFieldComponent);

export default InputField;
