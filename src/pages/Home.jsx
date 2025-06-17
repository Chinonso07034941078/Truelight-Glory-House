import bgimg from '../assets/truelight-photo2.jpg'
import trueligtLogo from '../assets/truelight-logo.png'; 

export default function Home() {
   
  return (
    
    <div className="bg-white text-white ">
      {/* Hero Section */}
      <section
         className="relative h-[700px] lg:h-screen bg-cover bg-center"Add commentMore actions
         style={{ backgroundImage: `url(${bgimg})`}}  // replace with your image path
      >
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 z-10">
          <div className="text-white text-2xl font-bold flex items-center gap-2">
            TRUELIGHT GLORY HOUSE <span className="text-red-600">∞</span>
          </div>
      
          <div className="md:hidden">
            <button className="text-white text-3xl">☰</button>
          </div>
        </nav>

        {/* Vision Section */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-4">
          <button className="bg-white bg-opacity-10 text-white px-4 py-1 rounded-full border border-white mb-4 text-xs font-semibold tracking-wide">
            ● OUR VISION
          </button>
          <h1 className="text-3xl md:text-6xl font-extrabold leading-tight max-w-4xl">
            WE DISCIPLE THE NATIONS  <br className="hidden md:block" />
            AND DISCIPLINE THE DEVIL <br className="hidden md:block" />
          </h1>
          <button className="mt-6 bg-white text-black px-6 py-3 text-sm font-semibold rounded-full">
            WATCH LIVE
          </button>
        </div>
      </section>
      
    <div className="min-h-screen bg-white flex flex-col items-start p-8">
      {/* Top Right Button */}
    

      {/* Main Content Area */}
      <div className="flex flex-col items-start ml-8 pt-[10em]"> {/* Adjusted margin for content */}
        {/* Welcome to CCI */}
        <img src={trueligtLogo} className='size-2'/>
        <div className="flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full mb-4 text-sm font-semibold">
          <span role="img" aria-label="house" className="mr-2">⛪</span> WELCOME TO TRUELIGHT
        </div>

        {/* Welcome Home! Heading */}
        <h1 className="text-6xl lg:text-7xl text-black mb-6 leading-tight font-extrabold">
          SERVING GOD PAYS!!!
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-700 mb-8 max-w-xl">
          Dive into our teachings, events and community.<br />
          Your journey of faith begins here.
        </p>

        {/* Navigation Arrows */}
        <div className="flex space-x-4">
          <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
</div>
     
 </div>
  

  );
}