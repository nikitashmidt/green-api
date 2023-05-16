import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router";
import cn from "classnames";

import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { IAuth } from "../../types";
import { loginUser, clearError, addTokens } from "../../store/slices/authSlice";
import { authSelector } from "../../store/selectors";
import { ReactComponent as Error } from "../../assets/error.svg";
import styles from "./Auth.module.scss";

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IAuth>();

  const dispatch = useAppDispatch();

  const { statusAuthorization, error } = useAppSelector(authSelector);

  if (statusAuthorization === "authorized") {
    return <Navigate to={"/phone"} />;
  }

  const onSubmit: SubmitHandler<IAuth> = async (data) => {
    clearError();
    dispatch(addTokens(data));
    dispatch(loginUser(data));
  };

  const idInstance = register("idInstance");

  const apiTokenInstance = register("apiTokenInstance");

  return (
    <div className={cn(styles.auth)}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn(styles.form)}>
        <h2 className={cn(styles.title)}>Log in</h2>
        <input
          className={cn(styles.input, { [styles.input__error]: error })}
          type="text"
          placeholder="id Instance"
          required
          minLength={3}
          ref={idInstance.ref}
          name={idInstance.name}
          onChange={idInstance.onChange}
          value={1101821107}
        />
        <input
          className={cn(styles.input, { [styles.input__error]: error })}
          type="text"
          placeholder="api TokenInstance"
          required
          minLength={3}
          ref={apiTokenInstance.ref}
          name={apiTokenInstance.name}
          onChange={apiTokenInstance.onChange}
          value={"3f188a6656834d339777c82b64d11e2c6938e9081f6a4527a6"}
        />
        <button
          type="submit"
          className={cn(styles.button)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
        {error && (
          <div className={cn(styles.error)}>
            <Error className={cn(styles.error__icon)} />
            <div className={cn(styles.error__text)}>{error}</div>
          </div>
        )}
        {statusAuthorization === "notAuthorized" && (
          <div className={cn(styles.error)}>
            <Error className={cn(styles.error__icon)} />
            <div className={cn(styles.error__text)}>not Authorized</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Auth;
