import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import CreateTask from './CreateTask';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

test('render the text',()=>{
    render(<CreateTask />)
    const lableElement = screen.getByText("Enter Your Title")
    expect(lableElement).toBeInTheDocument();
})
describe('CreateTask Component', () => {
    let mock;
  
    beforeAll(() => {
      mock = new MockAdapter(axios);
    });
  
    afterEach(() => {
      mock.reset();
    });
  
    afterAll(() => {
      mock.restore();
    });
  
    it('handles form submission', async () => {
      // Set up Axios mock for the post request
      mock.onPost('http://localhost:3002/api/').reply(200, { message: 'Task added' });
  
      render(<CreateTask />);
  
      // Simulate user input
      const titleInput = screen.getByLabelText('Enter Your Title');
      fireEvent.change(titleInput, { target: { value: 'Test Task' } });
  
      const descriptionInput = screen.getByLabelText('Enter Your Description');
      fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
  
      // Submit the form
      fireEvent.click(screen.getByText('Add'));
  
      // Wait for the success message
      await waitFor(() => {
        expect(screen.getByText('Task added successfully')).toBeInTheDocument();
      });
    });
  });