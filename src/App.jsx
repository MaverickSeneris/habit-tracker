import { useState, useEffect } from "react";
import FormInput from "./components/FormInput";
import HabitsList from "./components/HabitsList";
import HabitCard from "./components/HabitCard";
import seedHabits from "./seedData/seedData";

function App() {
  const [habits, setHabits] = useState([]);

  // Load habits from localStorage or fallback to seed data
  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habit-streaks"));
    if (savedHabits && savedHabits.length > 0) {
      setHabits(savedHabits);
    } else {
      // If no habits are found in localStorage, use seed data
      setHabits(seedHabits);
      localStorage.setItem("habit-streaks", JSON.stringify(seedHabits)); // Store seed data in localStorage
    }
  }, []);

  // Save habits to localStorage whenever the habits state changes
  useEffect(() => {
    if (habits.length > 0) {
      localStorage.setItem("habit-streaks", JSON.stringify(habits)); // Save habits to localStorage
    }
  }, [habits]);

  // Add a new habit dynamically
  const handleAddHabit = (event) => {
    event.preventDefault();
    const newHabit = event.target.habitName.value;
    if (newHabit && !habits.some((habit) => habit.title === newHabit)) {
      const newHabitObj = {
        title: newHabit,
        streak: Array(7).fill(false), // 7 days, all initially false
      };
      setHabits((prevHabits) => {
        const updatedHabits = [...prevHabits, newHabitObj];
        localStorage.setItem("habit-streaks", JSON.stringify(updatedHabits)); // Save immediately after adding
        return updatedHabits;
      });
    }
    event.target.reset();
  };

  // Delete a habit
  const handleDeleteHabit = (habitTitle) => {
    const updatedHabits = habits.filter((habit) => habit.title !== habitTitle);
    setHabits(updatedHabits);
    localStorage.setItem("habit-streaks", JSON.stringify(updatedHabits)); // Save immediately after deletion
  };

  const updateHabits = (updatedHabits) => {
    setHabits(updatedHabits);
  };

  console.log(habits);

  return (
    <div className="app p-8">
      <h1 className="text-3xl font-bold mb-6">Habit Tracker</h1>

      {/* Form to add new habit */}
      <FormInput handleAddHabit={handleAddHabit} />
      
      {/* Habits List component */}
      <HabitsList
        habits={habits}
        updateHabits={updateHabits}
        handleDeleteHabit={handleDeleteHabit}
      />
    </div>
  );
}

export default App;
