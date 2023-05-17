import { useState, useRef, useEffect } from "react";
import cn from "classnames";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { v4 as uid } from "uuid";

import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as SendIcon } from "../../assets/send.svg";
import { useAppDispatch, useAppSelector } from "../../store/useStore";
import { authSelector, messagesSelector } from "../../store/selectors";
import {
  getHistory,
  sendMessages,
  addMessages,
  getReceiveNotification,
  getDeleteNotification,
} from "../../store/slices/messagesSlice";
import type { IGetMessagesHistory, IMessages, ITokens } from "../../types";

import styles from "./App.module.scss";

interface IMessagesProps {
  phone: string;
}

export const Messages = ({ phone }: IMessagesProps) => {
  const text = useRef("");

  const [placeholder, setPlaceholder] = useState("Enter your message");

  const { messages } = useAppSelector(messagesSelector);

  const { apiTokenInstance, idInstance } = useAppSelector(authSelector);

  const newPhone = phone.replace(/\D/g, "");

  const dispatch = useAppDispatch();

  useEffect(() => {
    const data: IGetMessagesHistory = {
      chatId: newPhone,
      idInstance,
      apiTokenInstance,
      count: 100,
    };

    dispatch(getHistory(data));
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data: ITokens = {
        idInstance,
        apiTokenInstance,
      };

      const result = await dispatch(getReceiveNotification(data));

      if (result.meta.requestStatus === "fulfilled") {
        console.log("fullfilled");
      }

      data

      dispatch(getDeleteNotification(data));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (evt: ContentEditableEvent) => {
    text.current = evt.target.value;

    if (text.current.length > 0) {
      setPlaceholder("");
    } else {
      setPlaceholder("Enter your message");
    }
  };

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatchMessage();
    }
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatchMessage();
  }

  function dispatchMessage() {
    if (text.current.length === 0 || text.current.length >= 10000) return;

    // отправка сообщений
    dispatch(
      sendMessages({
        idInstance,
        apiTokenInstance,
        message: text.current,
        chatId: newPhone,
      })
    );

    const unixTime = Math.floor(new Date().getTime() / 1000);

    const data: IMessages = {
      timestamp: unixTime,
      textMessage: text.current,
      type: "outgoing",
    };

    // добавления в стор

    dispatch(addMessages(data));
    text.current = "";
    setPlaceholder("Enter your message");
  }

  function conversionUnix(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    return hours + ":" + minutes.slice(-2);
  }

  return (
    <div className={cn(styles.app__right)}>
      <div className={cn(styles.app__header)}>
        <UserIcon />
        {phone}
      </div>
      <div className={cn(styles.app__wrapper)}>
        {messages.map(({ type, textMessage, timestamp }) => {
          return (
            <div
              key={uid()}
              className={cn(styles.app__content, {
                [styles.app__content_incoming]: type === "incoming",
              })}
            >
              <div
                className={cn(styles.app__content_bg, {
                  [styles.app__content_bg_incoming]: type === "incoming",
                })}
              >
                <p className={cn(styles.app__content_text)}>{textMessage}</p>
                <span className={cn(styles.app__content_span)}>
                  {conversionUnix(timestamp)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cn(styles.app__bottom)}>
        <form onSubmit={onSubmit} className={cn(styles.app__bottom_form)}>
          <ContentEditable
            html={text.current}
            onChange={handleChange}
            className={cn(styles.app__bottom_input)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
          />
          <button type="submit" className={cn(styles.app__bottom_btn)}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};
