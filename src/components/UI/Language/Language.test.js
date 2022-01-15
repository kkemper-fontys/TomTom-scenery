import { render, screen } from "@testing-library/react";
import Language from './Language';

describe("Language Component Unit Tests", () => {
  test("NL is in the languages selector", () => {
    // arrange
    render(<Language />);

    // act 

    // assert
    const linkElement = screen.getByText('NL');
    expect(linkElement).toBeInTheDocument();
  });

  test("DE is in the languages selector", () => {
    // arrange
    render(<Language />);

    // act

    // assert
    const linkElement = screen.getByText('DE');
    expect(linkElement).toBeInTheDocument();
  });

  test("EN is in the languages selector", () => {
    // arrange
    render(<Language />);

    // act

    // assert
    const linkElement = screen.getByText('EN');
    expect(linkElement).toBeInTheDocument();
  });
});
