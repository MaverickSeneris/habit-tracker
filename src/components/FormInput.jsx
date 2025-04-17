import React from 'react'

function FormInput({ handleAddHabit}) {
  return (
    <form onSubmit={handleAddHabit} className="mb-4">
      <input
        type="text"
        name="habitName"
        placeholder="Add a new habit"
        className="p-2 border rounded mr-2 justify-center items-center"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Habit
      </button>
    </form>
  );
}

export default FormInput