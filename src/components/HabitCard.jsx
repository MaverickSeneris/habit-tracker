function HabitCard({ title, streak, updateStreak, onDelete }) {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();

  const toggleDay = (index) => {
    if (index !== todayIndex) return; // Only allow toggling for today
    const newStreak = [...streak];
    newStreak[index] = !newStreak[index]; // Toggle the state for today
    updateStreak(newStreak);
  };

  const getStars = () => {
    // Count only the green days (true) from past and presentT
    const streakCount = streak.filter((day, index) => day === true).length;
  
    // Award stars based on the streak count
    if (streakCount === 7) return 3; // 7 days streak
    if (streakCount >= 3) return 2; // 3 or more days streak
    if (streakCount >= 1) return 1; // 1 or more days streak
    return 0; // No streak
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

      {/* Display stars */}
      <div className="flex items-center mb-2">
        {Array(getStars()).fill().map((_, index) => (
          <span key={index} className="text-yellow-400">★</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {streak.map((done, index) => {
          const isPast = index < todayIndex;
          const isToday = index === todayIndex;
          const isFuture = index > todayIndex;

          return (
            <div key={index} className="flex flex-col items-center space-y-1">
              <span className="text-xs">{days[index]}</span>
              <div
                onClick={() => toggleDay(index)} // Only toggle if it's today
                className={`w-8 h-8 rounded-md cursor-pointer transition-colors
                  ${done ? 'bg-green-500' : ''}
                  ${!done && isToday ? 'bg-gray-500' : ''} // Gray for un-toggled today
                  ${isPast && !done ? 'bg-red-500 cursor-not-allowed' : ''} // Red for past and false days
                  ${isFuture ? 'bg-gray-700 cursor-not-allowed' : ''} // Disable future days
                  ${!isToday && !isPast && !isFuture ? 'cursor-not-allowed' : 'hover:bg-blue-300'} 
                `}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HabitCard;
