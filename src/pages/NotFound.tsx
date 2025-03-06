
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-8 bg-tavern-parchment/60 rounded-xl border border-tavern-wood/30 backdrop-blur-md shadow-xl max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-tavern-dark">404</h1>
        <p className="text-xl text-tavern-dark/80 mb-6">It seems you've wandered into the wrong tavern...</p>
        <Button
          asChild
          className="bg-tavern-wood text-white hover:bg-tavern-wood/90 transition-all"
        >
          <a href="/">Return to the Main Hall</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
