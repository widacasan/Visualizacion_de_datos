import React, { useState } from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

/**
 * A component that allows selecting a date range using react-dates.
 * @param {Object} props - The component props.
 * @param {function} props.onDateRangeSelect - A callback function called when the date range is selected.
 * @returns {JSX.Element} The DateRangeFilter component.
 */
function DateRangeFilter({ onDateRangeSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
 
  /**
   * Handles the selection of a date range.
   * @param {Object} dateRange - The selected date range.
   * @param {moment.Moment} dateRange.startDate - The start date of the range.
   * @param {moment.Moment} dateRange.endDate - The end date of the range.
   */
  const handleDateRangeSelect = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    onDateRangeSelect({ startDate, endDate });
  };

  return (
    <DateRangePicker
      startDate={startDate}
      startDateId="start_date"
      endDate={endDate}
      endDateId="end_date"
      onDatesChange={handleDateRangeSelect}
      focusedInput={focusedInput}
      onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
    />
  );
}

export default DateRangeFilter;
