import React, { useState, useEffect } from "react";
import moment from "moment";
import CustomButton from "../customButton/CustomButton";
import EditSeminarCards from "../editSeminarCards/EditSeminarCards";
import styles from "./seminarCards.module.css";
import Loading from "../../img/loading.gif";

const SeminarCards = () => {
  const [seminars, setSeminares] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSeminar, setCurrentSeminar] = useState(null);

  //Отрисовка
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await fetch("http://localhost:3100/seminars");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const seminars = await response.json();
        setSeminares(seminars);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Удаления
  const deleteSeminar = async (id) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(`http://localhost:3100/seminars/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSeminares((prevSeminars) =>
        prevSeminars.filter((seminar) => seminar.id !== id)
      );
      setLoading(false);
    } catch (error) {
      console.error("Error deleting seminar:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  //открыть модальное окно для редактирования
  const openEditModal = (seminar) => {
    setCurrentSeminar(seminar);
    setIsEditing(true);
    window.document.body.style.overflow = "hidden";
  };
  //закрыть модальное окно для редактирования
  const closeEditModal = () => {
    setIsEditing(false);
    window.document.body.style.overflow = "scroll";
  };

  //внести изменения
  const handleEditChange = (e) => {
    setCurrentSeminar({
      ...currentSeminar,
      [e.target.name]: e.target.value,
    });
  };

  //сохранить изменения
  const handleSaveEdit = async () => {
    setLoading(true);
    setError(false);

    // Получить текущую дату и время
    const currentDate = moment().format("YYYY-MM-DD HH:mm");

    // Обновить объект семинара с текущей датой редактирования
    const updatedSeminar = {
      ...currentSeminar,
      date: currentDate, // Устанавить текущую дату редактирования
    };

    try {
      const response = await fetch(
        `http://localhost:3100/seminars/${updatedSeminar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSeminar),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setSeminares((prevSeminars) =>
        prevSeminars.map((seminar) =>
          seminar.id === updatedSeminar.id ? updatedSeminar : seminar
        )
      );

      setIsEditing(false);
      setLoading(false);
    } catch (error) {
      console.error("Error saving edited seminar:", error);
      setError(true);
    } finally {
      setLoading(false);
      window.document.body.style.overflow = "scroll";
    }
  };

  // Форматирование даты для отображения
  const formatSeminarDate = (date, time) => {
    const dateTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
    return dateTime.format("DD.MM.YYYY HH:mm");
  };

  return (
    <div>
      {loading && (
        <div className={styles.spinner}>
          <img src={Loading} alt="" />
        </div>
      )}
      {error && <>Что-то пошло не так!</>}
      <div className={styles.wrapper}>
        {seminars.map((item, index) => (
          <div className={styles["seminar-card"]} key={index}>
            <div className={styles.content}>
              <p className={styles.item}>{item.title}</p>
              <p className={styles.item}>{item.description}</p>
              <p className={styles.item}>
                Дата: {formatSeminarDate(item.date, item.time)}
              </p>

              <img className={styles.img} src={item.photo} alt="" />
            </div>
            <div className={styles["card-btn__block"]}>
              <CustomButton
                label="Удалить семинар"
                onClick={() => deleteSeminar(item.id)}
                className={styles["delete-btn"]}
              />
              <CustomButton
                label="Редактировать семинар"
                onClick={() => openEditModal(item)}
                className={styles["edit-btn"]}
              />
            </div>
          </div>
        ))}
      </div>
      {isEditing && currentSeminar && (
        <EditSeminarCards
          closeEditModal={closeEditModal}
          handleEditChange={handleEditChange}
          handleSaveEdit={handleSaveEdit}
          currentSeminar={currentSeminar}
        />
      )}
    </div>
  );
};

export default SeminarCards;
