import { screen, fireEvent, getAllByPlaceholderText, render } from "@testing-library/react";
import LoginContainer from "../Login/LoginContainer";
import FavoriteContainer from "./FavoriteContainer";

test("renders favorite button", () => {
  // AAA
  // Arrange Act Assert
  render(<FavoriteContainer />);

  // check if the component renders with an initial count of 0
  const favoriteButton = screen.getByPlaceholderText("heart-empty");

  // cehck if the "increment" and "decrement" buttons are present

  expect(favoriteButton).toBeInTheDocument();
});
