import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { PatientsSearch } from "../patients/patients_search";

test("should check for input", async () => {
  const baseProps = {
    loadPatients: jest.fn().mockImplementation(() => Promise.resolve()),
    loadPatientsInit: jest.fn().mockImplementation(() => Promise.resolve()),
    onResults: jest.fn().mockImplementation(() => Promise.resolve()),
    updateLoading: jest.fn(),
  };
  const { getByRole } = render(<PatientsSearch {...baseProps} />);

  expect(getByRole("patientSearch")).toBeInTheDocument();

  await act(async () => {
    await fireEvent.change(getByRole("patientSearch"), {
      target: { value: "test" },
    });
  });

  const inputElement = getByRole("patientSearch") as HTMLInputElement;
  expect(inputElement.value).toEqual("test");
  expect(baseProps.loadPatients).toHaveBeenCalled();
  expect(baseProps.onResults).toHaveBeenCalled();

  if (inputElement.value.length == 0) {
    expect(baseProps.loadPatientsInit).toHaveBeenCalled();
    expect(baseProps.onResults).toHaveBeenCalled();
  }
});
