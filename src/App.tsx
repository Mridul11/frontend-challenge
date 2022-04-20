import React, { useState } from "react";
import { Loader } from "semantic-ui-react";
import "./App.css";
import { useHandleError } from "./hooks/useHandleError";
import { Patient, PatientsService } from "./patients/patients";
import { createNewPatientsApi } from "./patients/patients_api";
import { PatientsLoader } from "./patients/patients_loader_button";
import { PatientsSearch } from "./patients/patients_search";
import { ToastBox } from "./toast/toast";

function App() {
  const [patients, updatePatients] = useState<Patient[]>([]);
  const [loading, updateLoading] = useState(false);
  const [error] = useHandleError();

  const [patientsApi] = useState<PatientsService>(
    createNewPatientsApi("http://localhost:3000")
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Heartbeat 🏥</h1>
        {error.status === "error" ? (
          <ToastBox title={error.title} status={error.status} />
        ) : (
          ""
        )}
        <div
          style={{
            border: "1px solid white",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2>Please load the patients using the button below or search</h2>
          <PatientsLoader
            loadPatients={patientsApi.All}
            onLoaded={updatePatients}
            updateLoading={updateLoading}
          />
          <PatientsSearch
            loadPatients={patientsApi.Search}
            onResults={updatePatients}
            loadPatientsInit={patientsApi.All}
            updateLoading={updateLoading}
          />
          {patients.length ? displayPatients(loading, patients) : ""}
        </div>
      </header>
    </div>
  );
}

export default App;

function displayPatients(loading: boolean, patients: Patient[]) {
  return (
    <ul>
      {loading ? (
        <Loader active inline="centered" />
      ) : (
        patients.map((p, k) => (
          <li style={{ listStyle: "none" }} key={k}>
            ✅ {p.name}{" "}
          </li>
        ))
      )}
    </ul>
  );
}
