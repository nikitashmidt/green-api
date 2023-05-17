import { useState } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../store/useStore";
import { authSelector, messagesSelector } from "../../store/selectors";
import cn from "classnames";
import { v4 as uid } from "uuid";

import { ReactComponent as AddIcon } from "../../assets/add.svg";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as WebIcon } from "../../assets/web.svg";
import { Messages } from "./Messages";

import styles from "./App.module.scss";

function App() {
  const { statusAuthorization, phones } = useAppSelector(authSelector);

  const { messages } = useAppSelector(messagesSelector);

  const [currentId, setCurrentId] = useState("");

  if (statusAuthorization !== "authorized") {
    return <Navigate to={"/auth"} />;
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const clickedElement = event.currentTarget as HTMLDivElement;

    const activeElements = document.querySelectorAll(".active");

    activeElements.forEach((element) => {
      element.classList.remove("active");
    });

    clickedElement.classList.add(styles.app__user_active);

    setCurrentId(clickedElement.id);
  };

  return (
    <div className={cn(styles.app)}>
      <div className={cn(styles.app__left)}>
        <div className={cn(styles.app__contacts)}>
          Contacts
          <AddIcon className={cn(styles.app__contacts_icon)} />
        </div>
        <div className={cn(styles.app__users)}>
          {phones.map((item) => {
            return (
              <div
                key={uid()}
                id={item}
                className={cn(styles.app__user)}
                onClick={handleClick}
              >
                <div>
                  <UserIcon />
                </div>
                <div>
                  <div key={uid()}>{item}</div>
                  <div>
                    {messages[messages.length - 1] && messages[messages.length - 1].textMessage}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {currentId ? (
        <Messages phone={currentId} />
      ) : (
        <div className={cn(styles.app__web, styles.app__right)}>
          <WebIcon className={cn(styles.app__web_icon)} />
          <h1 className={cn(styles.app__web_title)}>WhatsApp Web</h1>
          <p className={cn(styles.app__web_descr)}>
            Отправляйте и получайте сообщения без необходимости оставлять
            телефон подключённым. <br />
            Используйте WhatsApp одновременно на четырёх связанных устройствах и
            одном телефоне.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
