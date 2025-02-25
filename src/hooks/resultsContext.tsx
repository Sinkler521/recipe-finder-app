"use client"

import React, { createContext, useContext, useState, useEffect } from "react";

type ResultsType = any;

interface ResultsContextProps {
  results: ResultsType | null;
  setResults: (results: ResultsType) => void;
}

const ResultsContext = createContext<ResultsContextProps | undefined>(undefined);

export const ResultsProvider = ({ children }: { children: React.ReactNode }) => {
  const [results, setResultsState] = useState<ResultsType | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);

  const setResults = (newResults: ResultsType) => {
    setResultsState(newResults);
    setTimestamp(Date.now());
  };

  useEffect(() => {
    if (timestamp) {
      const timer = setTimeout(() => {
        setResultsState(null);
        setTimestamp(null);
      }, 60000);

      return () => clearTimeout(timer);
    }
  }, [timestamp]);

  return (
    <ResultsContext.Provider value={{ results, setResults }}>
      {children}
    </ResultsContext.Provider>
  );
};

export const useResultsFound = () => {
  const context = useContext(ResultsContext);
  if (context === undefined) {
    throw new Error("useResultsFound must be used within a ResultsProvider");
  }
  return context;
};