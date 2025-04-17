import HabitCard from "./HabitCard";

function HabitsList({ habits, updateHabits, handleDeleteHabit, }) {
  return (
    <div className="space-y-4">
      {/* Render each habit dynamically */}
      {habits.map((habit) => (
        <div key={habit.title} className="flex justify-center items-center">
          <HabitCard
            title={habit.title}
            streak={habit.streak}
            updateStreak={(newStreak) => {
              const updatedHabits = habits.map((h) =>
                h.title === habit.title ? { ...h, streak: newStreak } : h
              );
              updateHabits(updatedHabits)
            }}
            onDelete={() => handleDeleteHabit(habit.title)}
          />
        </div>
      ))}
    </div>
  );
}

export default HabitsList;
