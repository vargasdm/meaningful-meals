import { screen, fireEvent, getAllByPlaceholderText, render } from "@testing-library/react";
import FavoriteContainer from "./FavoriteContainer";

test("renders favorite button", () => {
  // AAA
  // Arrange Act Assert
  render(<FavoriteContainer />);

  const favoriteButton = screen.getByPlaceholderText("heart-empty");

  expect(favoriteButton).toBeInTheDocument();
});
