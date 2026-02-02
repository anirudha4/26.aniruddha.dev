'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BorderSettingsContextType {
    showBorders: boolean;
    toggleBorders: () => void;
}

const BorderSettingsContext = createContext<BorderSettingsContextType | undefined>(undefined);

export const BorderSettingsProvider = ({ children }: { children: ReactNode }) => {
    const [showBorders, setShowBorders] = useState(false);

    const toggleBorders = () => {
        setShowBorders(prev => !prev);
    };

    return (
        <BorderSettingsContext.Provider value={{ showBorders, toggleBorders }}>
            {children}
        </BorderSettingsContext.Provider>
    );
};

export const useBorderSettings = () => {
    const context = useContext(BorderSettingsContext);
    if (context === undefined) {
        throw new Error('useBorderSettings must be used within a BorderSettingsProvider');
    }
    return context;
};
