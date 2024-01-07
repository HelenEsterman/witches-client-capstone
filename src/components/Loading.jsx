import { useEffect } from "react";

export const Loading = ({ setShowNavbar }) => {
  useEffect(() => {
    setShowNavbar(false);

    return () => {
      setShowNavbar(true);
    };
  }, [setShowNavbar]);

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center w-screen h-screen">
      <p className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 font-custom text-emerald-500 text-9xl">
        Loading...
      </p>
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bea477f1-cbd2-4a0f-8a7f-8d8b05b9cabd/dappw7j-8e5a1b66-d795-4852-b941-30cd91d024d1.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JlYTQ3N2YxLWNiZDItNGEwZi04YTdmLThkOGIwNWI5Y2FiZFwvZGFwcHc3ai04ZTVhMWI2Ni1kNzk1LTQ4NTItYjk0MS0zMGNkOTFkMDI0ZDEuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.xTct-GvJfbeHHomjJLuSSYwVg5O3Bjbafqu3IuNZXeg"
        alt="witch waiting at bus stop"
        className="w-full h-full"
      />
    </div>
  );
};
