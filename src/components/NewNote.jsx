import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";
import datAndTime from "date-and-time";
const NewNote = ({ notes, setNotes, setAddNote }) => {
  const [newNote, setNewNote] = useState({ title: "", content: "", date: "" });

  const jwtToken = localStorage.getItem("token");
  const decoded = jwt_decode(jwtToken);

  const titleHandler = (e) => {
    setNewNote({ ...newNote, title: e.target.value });
  };

  const contentHandler = (e) => {
    const date = datAndTime.format(new Date(), "YYYY/MM/DD HH:mm:ss");

    setNewNote({ ...newNote, content: e.target.value, date: date });
  };

  const newNoteHandler = async (e) => {
    e.preventDefault();

    await axios.post(
      process.env.REACT_APP_API_URL + "/api/notes",
      {
        id: decoded._id,
        title: newNote.title,
        content: newNote.content,
        date: newNote.date,
      },
      { headers: { "x-auth-token": `${jwtToken}` } }
    );
    setNotes([...notes, newNote]);

    setAddNote(false);
  };
  return (
    <form onSubmit={newNoteHandler} className="new-note">
      <h2>New Note</h2>
      <div className="title">
        <input
          placeholder="Title"
          type="text"
          value={newNote.title}
          onChange={titleHandler}
        />
      </div>
      <div className="content">
        <textarea
          cols="40"
          rows="8"
          value={newNote.content}
          onChange={contentHandler}
          placeholder="Content..."
        ></textarea>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default NewNote;
