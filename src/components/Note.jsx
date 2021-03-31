import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import jwt_decode from "jwt-decode";
import ReactCardFlip from "react-card-flip";

const Note = ({ title, content, notes, setNotes, date }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const jwtToken = localStorage.getItem("token");
  const decoded = jwt_decode(jwtToken);
  const deleteNoteHandler = async () => {
    const updatedNotes = notes.filter((n) => n.title !== title);
    await axios.delete(process.env.REACT_APP_API_URL + "/api/notes", {
      data: {
        id: decoded._id,
        title: title,
      },
      headers: { "x-auth-token": `${jwtToken}` },
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="note">
      <ReactCardFlip
        className="flip"
        isFlipped={isFlipped}
        flipDirection="vertical"
      >
        <div className="note-title" onMouseEnter={() => setIsFlipped(true)}>
          <h4>{title}</h4>
          <p>{date}</p>
        </div>

        <div className="note-content" onMouseLeave={() => setIsFlipped(false)}>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={deleteNoteHandler}
            className="delete-icon"
          />
          <p>{content}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default Note;
