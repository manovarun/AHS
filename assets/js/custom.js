const el = document.getElementById('tileGallery');

lightGallery(el, {
  selector: 'a.tile',
  plugins: [lgZoom, lgThumbnail, lgAutoplay],
  loop: true,
  speed: 450,

  // Lightbox animation feel
  mode: 'lg-fade',
  backdropDuration: 250,
  hideBarsDelay: 2500,

  // Slideshow
  autoplay: true,
  pause: 3200,
  progressBar: true,

  download: false,
});

const tiles = document.querySelectorAll('#tileGallery .tile');
tiles.forEach((t, i) => {
  t.setAttribute('data-aos', 'zoom-in');
  t.setAttribute('data-aos-delay', String((i % 12) * 70)); // stagger
  t.setAttribute('data-aos-duration', '650');
  t.setAttribute('data-aos-easing', 'ease-out-cubic');
});

const thEvents = [
  {
    title: 'School Reopening',
    date: '2023-09-03',
    desc: 'First day of the new academic year',
  },
  {
    title: 'Pongal Celebration',
    date: '2024-01-14',
    desc: 'Traditional harvest festival celebration',
  },
  {
    title: 'Tamil New Year',
    date: '2024-04-14',
    desc: 'Celebrate Tamil New Year with cultural programs',
  },
  {
    title: 'Annual Day',
    date: '2024-05-12',
    desc: 'Showcase of student talents and achievements',
  },
  {
    title: 'Summer Break Begins',
    date: '2024-05-26',
    desc: 'Last day of classes for the year',
  },
];

const fmtLong = (yyyy_mm_dd) => {
  const d = new Date(yyyy_mm_dd + 'T00:00:00');
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const elEvents = document.getElementById('thEventsList');
const elSelectedLabel = document.getElementById('thSelectedDateLabel');

function renderEvents(selectedISO) {
  // Sort upcoming by date (ascending)
  const sorted = [...thEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  elEvents.innerHTML = sorted
    .map((ev) => {
      const isSel = selectedISO && ev.date === selectedISO;
      return `
        <div class="th-event-card ${
          isSel ? 'is-selected-date' : ''
        }" data-date="${ev.date}">
          <h5 class="th-event-title">${ev.title}</h5>
          <div class="th-event-date">${fmtLong(ev.date)}</div>
          <p class="th-event-desc">${ev.desc}</p>
        </div>
      `;
    })
    .join('');
}

function setSelectedLabel(selectedISO) {
  if (!selectedISO) {
    elSelectedLabel.textContent = '';
    return;
  }
  elSelectedLabel.textContent = `Selected: ${fmtLong(selectedISO)}`;
}

// Build list initially (no selection)
renderEvents(null);

// Flatpickr inline calendar
const defaultDate = '2025-10-23'; // matches your screenshot feel (change as needed)

flatpickr('#thCalendarPicker', {
  inline: true,
  defaultDate,
  appendTo: document.getElementById('thCalendarInline'),
  dateFormat: 'Y-m-d',
  onChange: function (selectedDates, dateStr) {
    setSelectedLabel(dateStr);
    renderEvents(dateStr);

    // Optional: auto-scroll to the first matching event
    const match = elEvents.querySelector(
      `.th-event-card[data-date="${dateStr}"]`
    );
    if (match) match.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },
});

// Initialize with default selection label + highlight
setSelectedLabel(defaultDate);
renderEvents(defaultDate);
