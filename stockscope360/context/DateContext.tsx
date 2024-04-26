import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

interface DateValues {
    startDate: Dayjs
    endDate: Dayjs
}

interface DateContextType {
    dates: DateValues;
    setDates: Dispatch<SetStateAction<DateValues>>;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const useDateContext = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDateContext must be used within a DateProvider');
    }
    return context;
};

interface DateProviderProps {
    children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
    const [dates, setDates] = useState<DateValues>({
        startDate: dayjs('2019-01-02'),
        endDate: dayjs(),
    });

    return (
        <DateContext.Provider value={{ dates, setDates }}>
            {children}
        </DateContext.Provider>
    );
};