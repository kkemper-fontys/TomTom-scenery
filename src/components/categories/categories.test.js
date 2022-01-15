import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Categories from './categories';

// setting up mock location
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: () => ({
      pathname: "localhost:3000/Home"
    })
  }));

describe("Category Component Unit Tests", () => {
  test("Get categories works", () => {
    // arrange
    render(<Categories />);

    // act

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // assert
    const screenElement = screen.getByRole('img');
    expect(screenElement).toBeInTheDocument();
  });
});