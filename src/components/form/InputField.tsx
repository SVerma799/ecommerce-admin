import { forwardRef } from "react";
import { useTranslation } from "next-i18next";
import _ from "lodash";
import { useFormContext } from "react-hook-form";
import { Label } from "./Label";

const ErrorLabel = (props: any) => {
  const { error, className, ...otherProps } = props;
  const { t } = useTranslation("common");

  return (
    <small className={`${className} text-red-600`} {...otherProps}>
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
  const hasError = !!error;

  return (
    <div className={rootClass}>
      {label && (
        <Label
          name={inputProps.name}
          label={label}
          required={required}
          className={labelClassName}
          infoText={infoText}
        />
      )}
      <input
        data-testid={inputProps.name}
        className={`border border-slate-950 text-slate-950 bg-white   p-2 mt-2 rounded ${
          hasError
            ? "outline-red-600 border-red-600 focus:border-red-600"
            : "border-indigo-800 focus:border-indigo-800 focus:outline-indigo-800"
        }  focus:border-indigo-800 ${inputClass}`}
        ref={ref}
        {...inputProps}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
};

const TextAreaFieldComponent = (props: any, ref: any) => {
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
  const hasError = !!error;
  return (
    <div className={rootClass}>
      {label && (
        <Label
          name={inputProps.name}
          label={label}
          required={required}
          className={labelClassName}
          infoText={infoText}
        />
      )}
      <textarea
        className={`border border-slate-950 text-slate-950 bg-white ${
          hasError
            ? "outline-red-600 border-red-600 focus:border-red-600"
            : "border-indigo-800 focus:border-indigo-800 focus:outline-indigo-800"
        }  focus:border-indigo-800  p-2 mt-2 rounded ${inputClass}`}
        ref={ref}
        {...inputProps}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
};

const ImageFieldComponent = (props: any, ref: any) => {
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
  const hasError = !!error;
  return (
    <div className={rootClass}>
      {label && (
        <Label
          name={inputProps.name}
          label={label}
          className={`${
            hasError ? "text-red-600 " : "text-slate-950"
          }${labelClassName}`}
          required={required}
          infoText={infoText}
        />
      )}
      <input
        className={`border border-slate-950 text-slate-950 bg-white focus:outline-indigo-800  p-2 mt-2 rounded ${
          hasError
            ? "outline-red-600 border-red-600 focus:border-red-600"
            : "border-indigo-800 focus:border-indigo-800"
        } ${inputClass}`}
        ref={ref}
        type="file"
        {...inputProps}
      />
      {error && <ErrorLabel error={error} />}
    </div>
  );
};

const InputField = forwardRef(InputFieldComponent);
const TextAreaField = forwardRef(TextAreaFieldComponent);
const ImageField = forwardRef(ImageFieldComponent);

export { InputField, TextAreaField, ImageField };
