// ./pages/index.tsx
import { useEffect, useState } from 'react';

const Home = () => {
  const [isSticky, setIsSticky] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [alwaysVisible, setAlwaysVisible] = useState(false);

  let lastScrollY = 0;

  useEffect(() => {
    const handleScroll = () => {
      if (alwaysVisible) return; // If alwaysVisible is toggled, do nothing
      
      if (window.scrollY > lastScrollY) {
        setIsScrollingDown(true);  // Scrolling down
      } else {
        setIsScrollingDown(false); // Scrolling up
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [alwaysVisible]);

  const toggleAlwaysVisible = () => setAlwaysVisible(!alwaysVisible);

  return (
    <div>
      <header
        className={`fixed top-0 left-0 w-full transition-transform duration-300 
          ${alwaysVisible ? 'translate-y-0' : isScrollingDown ? '-translate-y-full' : 'translate-y-0'} 
          bg-blue-500 text-white p-4`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Sticky Header</h1>
          <button
            onClick={toggleAlwaysVisible}
            className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
          >
            {alwaysVisible ? 'Disable Always Visible' : 'Enable Always Visible'}
          </button>
        </div>
      </header>

      <main className="mt-20 p-6">
        <h2 className="text-2xl font-bold">Scroll to see header behavior</h2>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vehicula malesuada velit, ut condimentum erat gravida non. Vivamus pharetra magna at ante tristique, at dictum dui feugiat...
          {/* Add more content to allow scrolling */}
        </p>
        <div className="h-[200vh]" /> {/* Spacer to enable scrolling */}
      </main>
    </div>
  );
};

export default Home;
