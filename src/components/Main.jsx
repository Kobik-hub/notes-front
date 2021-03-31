import React, { useEffect, useState } from "react";

//Import Components
import Notes from "./Notes";
import NewNote from "./NewNote";

import axios from "axios";

//Styles
import "../global_styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function Main({ isLoggedIn, setIsLoggedIn }) {
  const [notes, setNotes] = useState([]);
  const [addNote, setAddNote] = useState(false);

  const jwtHeader = {
    headers: { "x-auth-token": `${localStorage.getItem("token")}` },
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log(process.env.REACT_APP_API_URL);
      const { data } = await axios.get(
        process.env.REACT_APP_API_URL + "/api/notes/",
        jwtHeader
      );
      console.log(data.notes);
      setNotes(data.notes);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      {addNote ? (
        <FontAwesomeIcon
          icon={faMinusCircle}
          className="plus-icon"
          onClick={() => setAddNote(!addNote)}
        />
      ) : (
        <FontAwesomeIcon
          icon={faPlusCircle}
          className="plus-icon"
          onClick={() => setAddNote(!addNote)}
        />
      )}
      {addNote && (
        <NewNote setNotes={setNotes} notes={notes} setAddNote={setAddNote} />
      )}
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default Main;
