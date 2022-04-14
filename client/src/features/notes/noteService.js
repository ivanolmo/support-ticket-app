import axios from 'axios';

const API_URL = '/api/tickets';

const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + `/${ticketId}/notes`,
    { text: noteText },
    config
  );

  return response.data;
};

const getAllNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + `/${ticketId}/notes`, config);

  return response.data;
};

const deleteNote = async (noteId, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + `/${ticketId}/notes/${noteId}`,
    config
  );

  return response.data;
};

const noteService = {
  createNote,
  getAllNotes,
  deleteNote,
};

export default noteService;
