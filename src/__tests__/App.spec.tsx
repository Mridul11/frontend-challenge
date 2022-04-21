import { act, fireEvent, render, waitFor } from "@testing-library/react";
import App from "../App";

test("should render app", () => {
  const { getByRole } = render(<App />);

  expect(getByRole("appHeader")).toBeInTheDocument();
  expect(getByRole("appHeader")).toHaveTextContent("Welcome to Heartbeat 🏥");
});

test("should render patients", async () => {
  const { getByRole } = render(<App />);
  waitFor(() => expect(getByRole("loader")).toBeUndefined());
  waitFor(() => expect(getByRole("patientList")).toBeUndefined());
  waitFor(() => expect(getByRole("patient")).toHaveLength(0));
  expect(getByRole("loadBtn")).toBeInTheDocument();
  
  await act(async () => {
    await fireEvent.click(getByRole("loadBtn"));
  });
  
  waitFor(() => expect(getByRole("loader")).toBeInTheDocument());
  waitFor(() => expect(getByRole("patientList")).toBeInTheDocument());
  waitFor(() => expect(getByRole("patient")).toHaveLength(2));
});