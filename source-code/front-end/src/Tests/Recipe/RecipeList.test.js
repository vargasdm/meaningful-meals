import React from 'react';
import { render } from '@testing-library/react';
import RecipeList from '../../components/Recipe/RecipeList';

test('renders RecipeList component when selectedRecipe state is falsy', () => {
  const getUserRecipesMock = jest.fn();
  const handleRemoveRecipeMock = jest.fn();

  jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockReturnValue({ user: { username: 'testUser' } }),
  }));

  const { getByText } = render(<RecipeList getUserRecipes={getUserRecipesMock} handleRemoveRecipe={handleRemoveRecipeMock} />);

  expect(getByText('Create a New Recipe')).toBeInTheDocument();
  expect(getByText('No recipes have been saved for testUser')).toBeInTheDocument();
});