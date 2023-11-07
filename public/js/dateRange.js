const startDateInput = document.querySelector('input[name="start"]');
const endDateInput = document.querySelector('input[name="end"]');

const datepicker = flatpickr(startDateInput, {
  mode: "range",
  dateFormat: "Y-m-d",
  onClose: function (selectedDates, dateStr, instance) {
    if (selectedDates.length > 0) {
      endDateInput.disabled = false;
      endDateInput._flatpickr.set("minDate", selectedDates[0]);
    } else {
      endDateInput.disabled = true;
      endDateInput._flatpickr.clear();
    }
  },
});

endDateInput.disabled = true;
flatpickr(endDateInput, {
  dateFormat: "Y-m-d",
  onOpen: function (selectedDates, dateStr, instance) {
    const minDate = datepicker.selectedDates[0];
    if (minDate) {
      this.set("minDate", minDate);
    }
  },
});
