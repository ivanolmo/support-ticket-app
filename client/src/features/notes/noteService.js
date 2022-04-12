import axios from 'axios';

const API_URL = '/api/tickets';

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, noteData, config);

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

const noteService = {
  createNote,
  getAllNotes,
};

export default noteService;
