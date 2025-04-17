const seedHabits = [
  {
    title: "Perfect Streak",
    streak: [true, true, true, true, true, true, true], // 3 stars
  },
  {
    title: "Almost There",
    streak: [true, true, true, true, true, true, false], // 0 stars (since past false)
  },
  {
    title: "Bare Minimum",
    streak: [true, true, true, false, false, false, false], // 0 stars (since past false)
  },
  {
    title: "Nope",
    streak: [false, false, false, false, false, false, false], // 0 stars
  },
  {
    title: "Code",
    streak: [true, true, false, false, false, false], // 0 stars
  },
];


export default seedHabits;