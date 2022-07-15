import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    
    const notesInitial = [
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        },
        {
          "_id": "62c44fe68d13989513c8aea3",
          "user": "62c4433f4dd0c842f705b208",
          "title": "MyEverything",
          "description": "Every part of my world is PM",
          "tag": "personal",
          "date": "2022-07-05T14:51:18.843Z",
          "__v": 0
        }
      ]

      const [notes, setNotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;