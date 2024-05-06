import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // Initial countdown value in seconds

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      // Redirect to the home page when the countdown reaches 0
      if (countdown === 0) {
        navigate("/");
      } else {
        // Update the countdown value every second
        setCountdown(countdown - 1);
      }
    }, 1000); // 1000 milliseconds = 1 second

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [countdown, navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      {/* You can add a link to the home page or any other relevant page */}
      <p>
        <a href='/'>Go to Home Page</a>
      </p>
      <p>You will be redirected to the home page in {countdown} seconds...</p>
    </div>
  );
};

export default NotFound;
