import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Box } from '@mui/system';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function CalendarButton() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs('2019-01-02'));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs('2026-07-01'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box marginTop= '30px' marginLeft='10px' display="flex" flexDirection="row" gap={2}>
        <DatePicker
          label="display start date"
          value={startDate}
          minDate={dayjs('2019-01-02')}
          maxDate={dayjs('2026-07-01')}
          onChange={(newValue) => setStartDate(newValue)}
        />
        <DatePicker
          label="display end date"
          value={endDate}
          minDate={dayjs('2019-01-02')}
          maxDate={dayjs('2026-07-01')}
          onChange={(newValue) => setEndDate(newValue)}
        />
      </Box>
    </LocalizationProvider>
  );
}