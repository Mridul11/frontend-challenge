import { Dispatch, FunctionComponent, SetStateAction, useState } from "react";
import { useHandleError } from "../hooks/useHandleError";
import { Patient, PatientSearchQuery } from "./patients";

type props = {
  loadPatients: (query: PatientSearchQuery) => Promise<Patient[]>;
  onResults: (ps: Patient[]) => void;
  loadPatientsInit: () => Promise<Patient[]>;
  updateLoading: Dispatch<SetStateAction<boolean>>;
};

export const PatientsSearch: FunctionComponent<props> = ({
  loadPatients,
  onResults,
  loadPatientsInit,
  updateLoading,
}) => {
  const [query, updateQuery] = useState("");
  const [error, handleError] = useHandleError();

  const makeRequest = (e: React.FormEvent<HTMLInputElement>) => {
    updateQuery(e.currentTarget.value);
    updateLoading(true);
    const sq: PatientSearchQuery = {
      name: query,
      ehrID: query,
      id: query,
    };

    e.currentTarget.value.length
      ? loadPatients(sq)
          .then((ps) => {
            updateLoading(false);
            handleError("");
            return onResults(ps);
          })
          .catch((err) => handleError(err))
      : loadPatientsInit()
          .then((ps) => {
            updateLoading(false);
            handleError("");
            return onResults(ps);
          })
          .catch((err) => handleError(err));
  };

  return (
    <div>
      <input value={query} name={query} onChange={(e) => makeRequest(e)} role="patientSearch" />
    </div>
  );
};

type psearchboxprops = {
  onQueryChange: (query: PatientSearchQuery) => void;
};
