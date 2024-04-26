import { Switch, FormControlLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useDateContext } from '@/context/DateContext';
import { useDefaultDisplayInfo } from '@/hooks/useDefaultDisplayInfo';
import { useFavoriteDisplayInfo } from '@/hooks/useFavoriteDisplayInfo';
import moment from 'moment';

type Props = {
    email: string;
  };

export default function DefaultAndFavoriteToggle({ email }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { dates } = useDateContext();

    const [startDate, setStartDate] = useState(moment('2019-01-02').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));

    const { defaultDisplayInfo, defaultIsLoading, defaultIsError, defaultRefetch } = useDefaultDisplayInfo({ start_date: startDate, end_date: endDate });
    const { favoriteDisplayInfo, favoriteIsLoading, favoriteIsError, favoriteRefetch } = useFavoriteDisplayInfo({ email:email, start_date: startDate, end_date: endDate });

    const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsFavorite(event.target.checked);
    };

    useEffect(() => {
        const { startDate, endDate } = dates;
        const formattedStartDate = startDate.format('YYYY-MM-DD');
        const formattedEndDate = endDate.format('YYYY-MM-DD');
        
        if (!isFavorite) {
            setStartDate(formattedStartDate);
            setEndDate(formattedEndDate);
            defaultRefetch();
        }
        else {
            setStartDate(formattedStartDate);
            setEndDate(formattedEndDate);
            favoriteRefetch();
        }
    }, [startDate, endDate, isFavorite, defaultRefetch, favoriteRefetch, dates]);

    return (
        <FormControlLabel
            control={<Switch checked={isFavorite} onChange={handleToggle} />}
            label={isFavorite ? "Favorite" : "Default"}
            style={{ marginLeft: '200px' }} 
        />
    );
}