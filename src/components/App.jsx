import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import SearchBar from "./SearchBar";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setLoading(false);
    }
  };
  async function editNote(id, updatedNote) {
    try {
      await axios.put(`http://localhost:5000/api/notes/${id}`, updatedNote);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updatedNote } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }
  async function addNote(newNote) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/notes",
        newNote
      );
      setNotes((prevNotes) => [...prevNotes, { ...response.data }]);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(id) {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <div>
      <Header />
      <SearchBar query={searchQuery} onSearch={handleSearch} />
      <CreateArea onAdd={addNote} />
      {filteredNotes.map((noteItem) => (
        <Note
          key={noteItem._id}
          id={noteItem._id}
          title={noteItem.title}
          content={noteItem.content}
          onDelete={deleteNote}
          onEdit={editNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
