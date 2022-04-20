import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { useHandleError } from "../hooks/useHandleError";
import { Patient } from "./patients";

type props = {
  loadPatients: () => Promise<Patient[]>;
  onLoaded: (ps: Patient[]) => void;
  updateLoading: Dispatch<SetStateAction<boolean>>;
};

export const PatientsLoader: FunctionComponent<props> = ({
  loadPatients,
  onLoaded,
  updateLoading,
}) => {
  const [error, handleError] = useHandleError();
  const makeRequest = () => {
    loadPatients()
      .then((ps) => {
        updateLoading(false);
        handleError("");
        return onLoaded(ps);
      })
      .catch((err) => handleError(err));
  };
  return (
    <div>
      <button role="loadBtn" onClick={makeRequest}>Load all patients</button>
    </div>
  );
};
