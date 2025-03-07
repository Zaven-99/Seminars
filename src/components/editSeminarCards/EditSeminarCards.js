import React from "react";

import CustomButton from "../customButton/CustomButton";
import CustomInput from "../customInput/CustomInput";
import styles from "./editSeminarCards.module.css";

const EditSeminarCards = ({
  closeEditModal,
  handleEditChange,
  handleSaveEdit,
  currentSeminar,
}) => {
  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles.editForm}>
        <h2>Редактировать семинар</h2>
        <div>
          <label>Название</label>

          <CustomInput
            type="text"
            name="title"
            title
            value={currentSeminar.title}
            onChange={handleEditChange}
          />
        </div>
        <div>
          <label>Описание</label>
          <textarea
            name="description"
            value={currentSeminar.description}
            onChange={handleEditChange}
          />
        </div>

        <div>
          <label>Фото</label>

          <CustomInput
            type="text"
            name="photo"
            title
            value={currentSeminar.photo}
            onChange={handleEditChange}
          />
        </div>

        <div className={styles["modal-btn__block"]}>
          <CustomButton
            label="Сохранить изменения"
            onClick={handleSaveEdit}
            className={styles.save}
          />
          <CustomButton
            label="Отменить"
            onClick={closeEditModal}
            className={styles.cancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EditSeminarCards;
