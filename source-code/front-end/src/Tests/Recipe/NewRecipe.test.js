import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NewRecipe from '../../components/Recipe/NewRecipe';



test('renders NewRecipe component', () => {
  const { queryAllByText } = render(<NewRecipe />);
  const newRecipeElements = queryAllByText(/New Recipe/i);
  expect(newRecipeElements.length).toBe(1); // or use toBeInTheDocument if there should be only one element
});

test('handleInputChange updates state correctly for title', () => {
  const { getByPlaceholderText } = render(<NewRecipe />);
  const titleInput = getByPlaceholderText('add a title');
  fireEvent.change(titleInput, { target: { value: 'Test Recipe' } });
  expect(titleInput.value).toBe('Test Recipe');
});

test('handleInputChange updates state correctly for ingredients', () => {
  const { getByPlaceholderText } = render(<NewRecipe />);
  const ingredientsInput = getByPlaceholderText('add ingredients. Put each ingredient on a new line.');
  fireEvent.change(ingredientsInput, { target: { value: 'Ingredient 1\nIngredient 2' } });
  expect(ingredientsInput.value).toBe('Ingredient 1\nIngredient 2');
});

test('handleInputChange updates state correctly for instructions', () => {
  const { getByPlaceholderText } = render(<NewRecipe />);
  const instructionsInput = getByPlaceholderText('add instructions. Put each instruction on a new line.');
  fireEvent.change(instructionsInput, { target: { value: 'Step 1\nStep 2' } });
  expect(instructionsInput.value).toBe('Step 1\nStep 2');
});

test('handleSubmit calls handleCreateRecipe with correct arguments', () => {
  const mockHandleCreateRecipe = jest.fn();
  const { getByText, getByPlaceholderText } = render(<NewRecipe handleCreateRecipe={mockHandleCreateRecipe} />);
  const titleInput = getByPlaceholderText('add a title');
  const ingredientsInput = getByPlaceholderText('add ingredients. Put each ingredient on a new line.');
  const instructionsInput = getByPlaceholderText('add instructions. Put each instruction on a new line.');
  const createButton = getByText('Create Recipe');
  fireEvent.change(titleInput, { target: { value: 'Test Recipe' } });
  fireEvent.change(ingredientsInput, { target: { value: 'Ingredient 1\nIngredient 2' } });
  fireEvent.change(instructionsInput, { target: { value: 'Step 1\nStep 2' } });
  fireEvent.click(createButton);
  expect(mockHandleCreateRecipe).toHaveBeenCalledWith({
    title: 'Test Recipe',
    ingredients: ['Ingredient 1', 'Ingredient 2'],
    instructions: ['Step 1', 'Step 2'],
  });
});