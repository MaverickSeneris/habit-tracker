function HabitCard({ title, streak, updateStreak, onDelete }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();

  const toggleDay = (index) => {
    if (index !== todayIndex) return; // Only allow toggling for today
    const newStreak = [...streak];
    newStreak[index] = !newStreak[index];
    updateStreak(newStreak);
  };

  return (
    <div className="relative habit-card mt-4 p-4 border rounded-lg shadow-md bg-black text-white">
      {/* Delete Button */}
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center border border-white rounded-full text-white hover:bg-white hover:text-black transition"
        title="Delete Habit"
      >
        ×
      </button>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      <div className="grid grid-cols-7 gap-2">
        {streak.map((done, index) => {
          const isPast = index < todayIndex;
          const isToday = index === todayIndex;

          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <span className="text-xs">{days[index]}</span>
              <div
                onClick={() => toggleDay(index)}
                className={`w-8 h-8 rounded-md cursor-pointer transition-colors
                  ${done ? 'bg-green-500' : isPast ? 'bg-red-500 cursor-not-allowed' : 'bg-gray-300'}
                  ${!isToday && !isPast ? 'hover:bg-blue-300' : ''}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitCard;
