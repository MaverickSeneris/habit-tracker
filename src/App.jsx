import { useState, useEffect } from 'react';
import HabitCard from './components/HabitCard';

function App() {
  const [habits, setHabits] = useState([]);

  // Load saved habits from localStorage when the component mounts
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem('habit-streaks'));
    if (savedHabits) {
      setHabits(savedHabits);
    }
  }, []);

  // Save habits to localStorage whenever the 'habits' state changes
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem('habit-streaks', JSON.stringify(habits));
    }
  }, [habits]);

  // Add a new habit dynamically
  const handleAddHabit = (event) => {
    event.preventDefault();
    const newHabit = event.target.habitName.value;
    if (newHabit && !habits.some(habit => habit.title === newHabit)) {
      const newHabitObj = {
        title: newHabit,
        streak: Array(7).fill(false), // 7 days, all initially false
      };
      setHabits((prevHabits) => {
        const updatedHabits = [...prevHabits, newHabitObj];
        localStorage.setItem('habit-streaks', JSON.stringify(updatedHabits)); // Save immediately after adding
        return updatedHabits;
      });
    }
    event.target.reset();
  };

  // Delete a habit
  const handleDeleteHabit = (habitTitle) => {
    const updatedHabits = habits.filter(habit => habit.title !== habitTitle);
    setHabits(updatedHabits);
    localStorage.setItem('habit-streaks', JSON.stringify(updatedHabits)); // Save immediately after deletion
  };

  return (
    <div className="app p-8">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>

      {/* Form to add new habit */}
      <form onSubmit={handleAddHabit} className="mb-4">
        <input
          type="text"
          name="habitName"
          placeholder="Add a new habit"
          className="p-2 border rounded mr-2 justify-center items-center"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Habit
        </button>
      </form>

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
                setHabits(updatedHabits);
                localStorage.setItem('habit-streaks', JSON.stringify(updatedHabits)); // Save immediately after updating
              }}
              onDelete={() => handleDeleteHabit(habit.title)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
