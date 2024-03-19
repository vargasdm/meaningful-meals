import React from "react";
import { render, fireEvent, screen  } from "@testing-library/react";
import RecipeSingle from "../../components/Recipe/RecipeSingle";

describe("RecipeSingle component", () => {
  const selectedRecipe = {
    title: "Test Recipe",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instructions: ["Instruction 1", "Instruction 2"],
  };

  const updateRecipe = jest.fn();
  const handleEditClick = jest.fn();
  const handleBackClick = jest.fn();

  const props = {
    selectedRecipe,
    updateRecipe,
    isEditing: false,
    handleEditClick,
    handleBackClick,
  };

  test("renders without crashing", () => {
    const { getByText } = render(<RecipeSingle {...props} />);

    expect(getByText(selectedRecipe.title)).toBeInTheDocument();
    expect(getByText(selectedRecipe.ingredients[0])).toBeInTheDocument();
    expect(getByText(selectedRecipe.instructions[0])).toBeInTheDocument();
  });

  test("component renders correctly when isEditing is false", () => {
    const selectedRecipe = {
      title: "Test Recipe",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: ["Instruction 1", "Instruction 2"],
    };

    const props = {
      selectedRecipe: selectedRecipe,
      updateRecipe: jest.fn(),
      isEditing: false,
      handleEditClick: jest.fn(),
      handleBackClick: jest.fn(),
    };

    render(<RecipeSingle {...props} />);

    // Assert that the recipe details are displayed correctly when not in edit mode
    expect(screen.getByText(selectedRecipe.title)).toBeInTheDocument();

    selectedRecipe.ingredients.forEach((ingredient) => {
      expect(screen.getByText(ingredient)).toBeInTheDocument();
    });

    selectedRecipe.instructions.forEach((instruction) => {
      expect(screen.getByText(instruction)).toBeInTheDocument();
    });

    // Assert that the "Edit Recipe" button is rendered when not in edit mode
    expect(screen.getByText("Edit Recipe")).toBeInTheDocument();

    // Assert that the "Back to My Recipes" button is rendered when not in edit mode
    expect(screen.getByText("Back to My Recipes")).toBeInTheDocument();

  });

  test("calls updateRecipe when form is submitted", async () => {
    const { getByTestId, getByText } = render(
      <RecipeSingle {...props} isEditing={true} />
    );

    const titleInput = getByTestId("title-input");
    if (titleInput) {
      const newTitle = "New Title";
      titleInput.value = newTitle;
      fireEvent.change(titleInput);
    }

    const saveButton = getByText("Save Changes");
    fireEvent.click(saveButton);

    await Promise.resolve(); // wait for promises to resolve
  });





    //   test('handleSubmit calls updateRecipe and handleEditClick', async () => {
  //     const updateRecipeMock = jest.fn();
  //     const handleEditClickMock = jest.fn();
  //     const mockedTitle = "New Title";
  //     const mockedEditedRecipe = { title: mockedTitle };
  //     const props = {
  //       updateRecipe: updateRecipeMock,
  //       handleEditClick: handleEditClickMock,
  //       editedRecipe: mockedEditedRecipe,
  //     };

  //     const { getByTestId, getByText } = render(
  //       <RecipeSingle {...props} isEditing={true} />
  //     );

  //     const titleInput = getByTestId("title-input");
  //     titleInput.value = mockedTitle;
  //     fireEvent.change(titleInput);

  //     const saveButton = getByText("Save Changes");
  //     fireEvent.click(saveButton);

  //     // Check if editedRecipe is defined before accessing its properties
  //     const editedRecipeValue = props.editedRecipe ? props.editedRecipe.title : "";

  //     await waitFor(() => {
  //       expect(updateRecipeMock).toHaveBeenCalled();
  //       expect(handleEditClickMock).toHaveBeenCalled();
  //     });
  //   });
  //   test("component renders correctly when isEditing is true", () => {
  //     const mockedEditedRecipe = { title: "Mocked Title" };
  //     const props = {
  //       editedRecipe: mockedEditedRecipe,
  //       isEditing: true,
  //     };

  //     const { getByTestId } = render(<RecipeSingle {...props} />);

  //     // Assert that the title input is rendered with the correct value
  //     const titleInput = getByTestId("title-input");
  //     expect(titleInput).toBeInTheDocument();
  //     expect(titleInput).toHaveValue(mockedEditedRecipe.title);

  //     // You can add more assertions here for other elements rendered in the component
  //   });
});
