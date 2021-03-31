import React from "react";
import Note from "./Note";

const Notes = ({ notes, setNotes }) => {
  return (
    <div className="notes">
      {notes.map((note) => {
        return (
          <Note
            title={note.title}
            content={note.content}
            date={note.date}
            notes={notes}
            setNotes={setNotes}
          />
        );
      })}
    </div>
  );
};

export default Notes;
