import React, { type ReactNode, type RefObject } from 'react';
import './image-popup.scss';


interface ImagePopupProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  children: ReactNode;
  caption: string;
  closeLabel: string;
}

/** Отображает содержимое в нативном диалоге с кнопкой закрытия и затемнением. */
export default function ImagePopup({ dialogRef, children, caption, closeLabel }: ImagePopupProps) {
  /** Закрывает диалог при клике на крестик или на фон. */
  function close() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="image-popup"
      aria-label={caption}
      onClick={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <button type="button" className="image-popup__close" onClick={close} aria-label={closeLabel}>
        <span aria-hidden="true">×</span>
      </button>
      {children}
    </dialog>
  );
}
