import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    props.onEdit(props.id, {
      title: editedTitle,
      content: editedContent,
    });
    setIsEditing(false);
  };

  return (
    <div className="note">
      {isEditing ? (
        <>
          <input
            name="title"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-input"
          />
          <textarea
            name="content"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-textarea"
            rows={3}
          />
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
        </>
      )}
      <div className="note-actions">
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => props.onDelete(props.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Note;
