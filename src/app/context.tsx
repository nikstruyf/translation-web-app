"use client";
import { createContext, useState, useContext } from "react";

type HistoryType = {
    input: string,
    output: string,
    inputLang: string,
    outputLang: string
}

interface HistoryContextType {
    historyArray: HistoryType[],
    setHistoryArray: React.Dispatch<React.SetStateAction<HistoryType[]>>;
}

export const HistoryContext = createContext<HistoryContextType>({
    historyArray: [],
    setHistoryArray: () => {}
});

export function HistoryProvider({ children }: any) {
    const [historyArray, setHistoryArray] = useState<HistoryType[]>([]);

    return (
        <HistoryContext.Provider value={{historyArray, setHistoryArray}}>
            {children}
        </HistoryContext.Provider>
    );
}

export const useHistory = () => useContext(HistoryContext);