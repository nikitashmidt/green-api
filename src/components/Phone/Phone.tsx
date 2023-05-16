import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router";
import InputMask from "react-input-mask";
import cn from "classnames";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { addPhones } from "../../store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { authSelector } from "../../store/selectors";
import { IGetPhone } from "../../types";
import { ReactComponent as Error } from "../../assets/error.svg";
import styles from "./Phone.module.scss";

const Phone = () => {
  const { statusAuthorization, phones } = useAppSelector(authSelector);

  const dispatch = useAppDispatch();

  const userSchema = object({
    phone: string().required().min(18, "Enter full number"),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IGetPhone>({
    mode: "onTouched",
    resolver: yupResolver(userSchema),
  });

  if (statusAuthorization === "notAuthorized" || statusAuthorization === "") {
    return <Navigate to={"/auth"} />;
  }

  if (phones.length !== 0) {
    return <Navigate to={"/"} />;
  }

  const onSubmit: SubmitHandler<IGetPhone> = async ({ phone }) => {
    dispatch(addPhones(phone));
  };

  const phone = register("phone");

  return (
    <div className={cn(styles.phone)}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
        <h2 className={cn(styles.title)}>Phone</h2>
        <InputMask
          className={cn(styles.input, {
            [styles.input__error]: errors.phone?.message,
          })}
          mask="+7 (999) 999-99-99"
          maskChar={null}
          type="phone"
          placeholder="Enter phone"
          required
          ref={phone.ref}
          name={phone.name}
          onChange={phone.onChange}
          value={'79139635047'}
        />
        <button
          type="submit"
          className={cn(styles.button)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Create a chat"}
        </button>
        {errors.phone?.message && (
          <div className={cn(styles.error)}>
            <Error className={cn(styles.error__icon)} />
            <div className={cn(styles.error__text)}>Enter full number</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Phone;
