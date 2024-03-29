import * as React from 'react';
import { useReducer } from 'react';
import { useAppDispatch } from 'redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { editContact } from 'redux/contacts/contacts.thunk';
import { reducerEditContact } from 'services/reducer';
import { ActionAddContact } from 'types/reduserTypes';
import { IContact, IEditContact } from 'types/contactsType';
import Button from 'components/Button/Button';
import ModalContainer from 'components/Modal/Modal';

import { List } from './EditContact.styled';

interface IProps {
  handleCloseModalEdit: () => void;
  open: boolean;
  contact: IContact;
}

const EditContact = ({ handleCloseModalEdit, open, contact }: IProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, reducerDispatch] = useReducer(reducerEditContact, contact);

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    reducerDispatch({ type: name, payload: value } as ActionAddContact);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const contact: IEditContact = {
      id: state.id,
      item: { name: state.name, number: state.number },
    };

    dispatch(editContact(contact));
    handleCloseModalEdit();
    navigate('/contacts');
  };
  return (
    <ModalContainer open={open} onClose={handleCloseModalEdit}>
      <Container component="main" maxWidth="xs" style={{ height: 316 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <BorderColorIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="secondary">
            Edit Contact
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type="text"
              required
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="off"
              autoFocus
              color="secondary"
              onChange={handleChange}
              value={state.name}
            />
            <TextField
              margin="normal"
              required
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              fullWidth
              name="number"
              label="Number"
              type="tel"
              id="password"
              autoComplete="off"
              color="secondary"
              onChange={handleChange}
              value={state.number}
            />
            <List>
              <li>
                <Button
                  style={{ width: 115 }}
                  color="success"
                  type="submit"
                  variant="contained"
                  name="Edit"
                />
              </li>

              <li>
                <Button
                  style={{ width: 115 }}
                  color="primary"
                  onClick={() => handleCloseModalEdit()}
                  type="button"
                  variant="contained"
                  name="Cancel"
                />
              </li>
            </List>
          </Box>
        </Box>
      </Container>
    </ModalContainer>
  );
};
export default EditContact;
