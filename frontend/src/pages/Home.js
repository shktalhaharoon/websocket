import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 3 workouts

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increase the number of workouts shown by 3
  };

  return (
    <div className="home-container">
      <div className="workouts-section">
        <div className="workouts-list">
          {workouts &&
            workouts.slice(0, visibleCount).map((workout) => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))}
        </div>

        {workouts && visibleCount < workouts.length && (
          <button onClick={handleLoadMore} className="load-more-button">
            Load More
          </button>
        )}
      </div>

      <div className="form-section">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;
