import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PatientsLoader } from "./patients_loader_button";
import { PatientsSearch } from "./patients_search";

test("should test for button click api call", async () => {
  const baseProps = {
      loadPatients: jest.fn().mockImplementation(() => Promise.resolve()),
      onLoaded: jest.fn().mockImplementation(() => Promise.resolve()),
      updateLoading: jest.fn(),
    },
    makeRequest = jest.fn();

  const { getByRole } = render(<PatientsLoader {...baseProps} />);

  expect(getByRole("loadBtn")).toBeInTheDocument();

  await act(async () => {
    await fireEvent.click(getByRole("loadBtn"));
  });

  expect(baseProps.loadPatients).toHaveBeenCalled();
});
