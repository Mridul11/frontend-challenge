import React, { Dispatch, SetStateAction } from "react";

type ErrorTypes = {
  title: string;
  status: "error" | "success";
};

export const useHandleError = (): [ErrorTypes, (error: string) => void] => {
  const [error, setError] = React.useState<ErrorTypes>({
    title: "",
    status: "success",
  });

  const handleError = (error: string) =>
    setError({ title: error, status: "error" });

  return [error, handleError];
};
