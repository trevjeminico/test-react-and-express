const ColorTheme = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
  "bg-slate-500",
  "bg-gray-500",
  "bg-zinc-500",
  "bg-neutral-500",
  "bg-stone-500",
];

export const randomizeColor = () => {
  return ColorTheme[Math.floor(Math.random() * ColorTheme.length)];
};

export const getColor = () => {
  const bgColor = randomizeColor();
  const LocalBgColor = localStorage.getItem("bgColor");
  if (LocalBgColor === null) {
    localStorage.setItem("bgColor", bgColor);
  }

  return LocalBgColor;
};
