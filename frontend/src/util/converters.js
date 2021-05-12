// export const RATING_EMOJIS = [undefined, '😡', '😞', '😐', '😊', '😁'];
export const RATING_EMOJIS = [
    undefined,
    "😒",
    "😕",
    "🙂",
    "😊",
    "😁"
  ];
export const toYesNo = count => !!count ? 'Yes' : 'No';
export const toRating = count => RATING_EMOJIS[count];

const dateToYMDArr = date => [
  date.getFullYear().toString().padStart(4, '0'),
  (date.getMonth() + 1).toString().padStart(2, '0'),
  date.getDate().toString().padStart(2, '0')
];

export const mDYToYMD = mdy => {
  const [y, m, d] = dateToYMDArr(new Date(mdy));
  return `${y}-${m}-${d}`;
};

export const yMDToMDY = ymd => {
  const [y, m, d] = dateToYMDArr(new Date(ymd.replace(/-/g, '/')));
  return `${m}/${d}/${y}`;
};

export const dateToYMD = date => {
  const [y, m, d] = dateToYMDArr(date);
  return `${y}-${m}-${d}`;
};

export const dateToMDY = date => {
  const [y, m, d] = dateToYMDArr(date);
  return `${m}/${d}/${y}`;
};

export const completed = (variable) => 
  (variable.dailylogs[dateToMDY(new Date())] !== undefined);