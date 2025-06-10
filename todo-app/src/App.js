import logo from './logo.svg';
import './App.css';


import React, { useState } from 'react';

function App() {
  
  const [openForm, setOpenForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    languages: [],
    email: '',
    agree: false
  });
  const [dataList, setDataList] = useState([]);
  const [errors, setErrors] = useState({});
  

  const handleCheckbox = (lang) => {
    setFormData((prev) => {
      const languages = prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang];
      return { ...prev, languages };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
  
    if (!formData.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email || !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.languages || formData.languages.length === 0) newErrors.languages = 'Select at least one language';
    if (!formData.agree) newErrors.agree = 'You must accept terms';
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    setErrors({});
    const timestamp = new Date().toLocaleString();
    setDataList([...dataList, { ...formData, timestamp }]);
    setSubmitted(true);
  };
  
  
  return (
    <>
     
    <header className="border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-2  transition-all duration-300 ${openForm ? 'backdrop-blur-sm brightness-50' : 'bg-gray-100'}`}">
        <img
  alt="do List logo black square with white text"
  className="w-26 h-26"       // Increased from w-8 h-8
  src="image.png"
  width="84"                 // Optional: sets fallback width
  height="54"                // Optional: sets fallback height
/>

          {/* <span className="font-bold text-lg">do List</span> */}
        </div>
        <ul className="hidden md:flex space-x-8 text-sm font-semibold text-gray-700">
          <li>
            <a className="hover:text-red-600" href="#">
              About Us
            </a>
          </li>
          <li>
            <a className="hover:text-red-600" href="#">
              Features
            </a>
          </li>
          <li>
            <a className="hover:text-red-600" href="#">
              How it Works
            </a>
          </li>
          <li>
            <a className="hover:text-red-600" href="#">
              Contact
            </a>
          </li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <button className="text-red-600 border border-red-600  px-5 py-1.5 text-sm font-semibold hover:bg-red-600 hover:text-white transition">
            Log In
          </button>
          <button className="bg-red-600 text-white border border-red-600 px-5 py-1.5 text-sm font-semibold hover:bg-white hover:text-red-600 transition">
          Sign Up
          </button>
      {openForm && !submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg relative">
            <button onClick={() => setOpenForm(false)} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl">&times;</button>
            <h2 className="text-xl font-bold mb-1">Get Started Today!</h2>
            <p className="text-sm text-gray-600 mb-4">Fill in your details and take control of your tasks.</p>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="flex gap-4">
                <input type="text" placeholder="First Name" required
                  className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
                <input type="text" placeholder="Last Name" required
                  className="w-1/2 p-2 border rounded" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
              </div>
              <div>
                <label className="block font-medium mb-1">Gender</label>
                <div className="flex gap-4">
                  <label><input type="radio" name="gender" value="male" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Male</label>
                  <label><input type="radio" name="gender" value="female" onChange={(e) => setFormData({ ...formData, gender: e.target.value })} /> Female</label>
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Language</label>
                <div className="space-y-1">
                  {['English', 'Hindi', 'Marathi'].map(lang => (
                    <label key={lang} className="block">
                      <input
                        type="checkbox"
                        checked={formData.languages.includes(lang)}
                        onChange={() => handleCheckbox(lang)}
                      /> {lang}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block font-medium mb-1">Email Address</label>
                <input type="email" required placeholder="Enter your email"
                  className="w-full p-2 border rounded"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <label className="block text-sm">
                <input type="checkbox" onChange={(e) => setFormData({ ...formData, agree: e.target.checked })} required />
                <span className="ml-2">I agree to the <span className="text-red-600">terms and conditions</span></span>
              </label>
              <button type="submit" className="w-full bg-red-600 text-white rounded py-2 font-semibold hover:bg-red-700">
                Done
              </button>
            </form>
          </div>
        </div>
      )}

      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-sm">
            <div className="text-3xl mb-2">❤️</div>
            <h3 className="text-lg font-bold">Thank you for connect with us.</h3>
            <p className="text-sm text-gray-600 mb-4">Our team will contacting with you soon</p>
            <button onClick={() => { setOpenForm(false); setSubmitted(false); }}
              className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
              Done
            </button>
          </div>
        </div>
      )}
    </div>

        <button
          aria-label="Open menu"
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
        >
          <i className="fas fa-bars text-xl"></i>
        </button>
      </nav>
    </header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-black-700 font-extrabold text-lg sm:text-xl md:text-2xl leading-tight">
          Simplify Your Life with Our
          <span className="block font-extrabold  text-lg sm:text-4xl md:text-2xl mt-1">
            Todo App
          </span>
        </h1>
        <p className="text-gray-600 text-sm sm:text-base mt-3">
          Stay organized and boost your productivity with our intuitive task
          solution. </p>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
          Experience a new level of efficiency in your everyday
          living.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
        <button
        className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700"
        onClick={() => setOpenForm(true)}
      >
        Get Started
      </button>
          <button className="border border-gray-300 rounded-full px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>
      <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 border-4 border-teal-500 rounded-md overflow-hidden">
        <div className="bg-red-500 p-8 flex flex-col justify-center relative">
          <h2 className="text-white font-extrabold text-4xl sm:text-5xl leading-tight max-w-xs">
            Organize.
            <br />
            Achieve.
            <br />
            Relax.
          </h2>
          <span className="absolute top-12 left-36 bg-teal-600 text-white font-semibold text-base px-3 py-1 rounded">
            Prajwal Tarpe
          </span>
          <p className="text-white mt-6 max-w-xs">
            Turn tasks into habits, share achievements, and discover the power
            of seamless task management.
          </p>
          <div className="mt-6 flex space-x-4">
            <button className="bg-white text-red-600 font-semibold rounded-full px-5 py-1.5 text-sm hover:bg-gray-100 transition">
              Get Started Today
            </button>
            <button className="border border-white text-white rounded-full px-5 py-1.5 text-sm hover:bg-white hover:text-red-600 transition">
              Discover Features
            </button>
          </div>
        </div>
        <div className="relative bg-gray-100">
          <img
            alt="Smiling man in white shirt with task app UI overlay on right side"
            className="w-full h-full object-cover"
            height="400"
            src="https://storage.googleapis.com/a1aa/image/5e883a42-e8e8-44d5-76c3-a17f2985cfff.jpg"
            width="400"
          />
          <div
            className="absolute top-4 left-4 text-white text-4xl font-semibold uppercase"
            style={{ textShadow: '0 0 3px rgba(0,0,0,0.7)' }}
          >
            Your Tasks.
            <br />
            Our Tools.
          </div>
          <div
            className="absolute bottom-4 left-4 text-white text-2xl font-semibold flex items-center space-x-2"
            style={{ textShadow: '0 0 3px rgba(0,0,0,0.7)' }}
          >
            <p>Freedie Halvorson</p>
           <br/>
            <p> Chief Productivity Enthusiast</p>
            
          </div>
        </div>
      </section>
      <section className=" flex justify-center space-x-8 max-w-4xl mx-auto">
  <img
    alt="Google logo"
    className="h-36 object-contain"
    src="https://storage.googleapis.com/a1aa/image/953d6e94-f246-4f02-33ab-677f65554467.jpg"
    width="100"
    height="48"
  />
  <img
    alt="Facebook logo"
    className="h-36 object-contain"
    src="https://storage.googleapis.com/a1aa/image/0505a7dd-05ff-4863-d82d-6d8959b5e47d.jpg"
    width="100"
    height="48"
  />
  <img
    alt="YouTube logo"
    className="h-36 object-contain"
    src="https://storage.googleapis.com/a1aa/image/4c50dd93-4484-4431-eae0-de7953bbd04d.jpg"
    width="150"
    height="58"
  />
  <img
    alt="Pinterest logo"
    className="h-36 object-contain"
    src="https://storage.googleapis.com/a1aa/image/965759b3-ad47-4451-e764-98b5c40a39aa.jpg"
    width="100"
    height="48"
  />
  <img
    alt="Twitch logo"
    className="h-36 object-contain"
    src="https://storage.googleapis.com/a1aa/image/b09b5d78-20bb-4d8c-d3de-1c5a0408506e.jpg"
    width="100"
    height="48"
  />
</section>

      <section className=" max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-semibold text-lg sm:text-xl text-gray-900">
          Transform Your Productivity with Our
          <span className="block font-extrabold text-red-600 text-2xl sm:text-3xl mt-1">
            Innovative To-Do List Features
          </span>
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center text-gray-700">
          <div>
            <div className="text-red-600 mb-3 text-3xl">01</div>
            <div className="mb-2">
              <i className="fas fa-user-friends text-red-600 text-3xl"></i>
            </div>
            <h3 className="font-semibold mb-1">User-Friendly Interface</h3>
            <p className="text-sm max-w-xs mx-auto">
              Our platform offers intuitive navigation to make task management
              easy and efficient.
            </p>
          </div>
          <div>
            <div className="text-red-600 mb-3 text-3xl">02</div>
            <div className="mb-2">
              <i className="fas fa-users-cog text-red-600 text-3xl"></i>
            </div>
            <h3 className="font-semibold mb-1">
              Collaborate &amp; Share Effortlessly
            </h3>
            <p className="text-sm max-w-xs mx-auto">
              Work together with your team and share tasks seamlessly to boost
              productivity.
            </p>
          </div>
          <div>
            <div className="text-red-600 mb-3 text-3xl">03</div>
            <div className="mb-2">
              <i className="fas fa-comments text-red-600 text-3xl"></i>
            </div>
            <h3 className="font-semibold mb-1">Efficient Collaboration</h3>
            <p className="text-sm max-w-xs mx-auto">
              Communicate in real-time and keep everyone on the same page with
              our chat features.
            </p>
          </div>
          <div>
            <div className="text-red-600 mb-3 text-3xl">04</div>
            <div className="mb-2">
              <i className="fas fa-bolt text-red-600 text-3xl"></i>
            </div>
            <h3 className="font-semibold mb-1">Seamless Access</h3>
            <p className="text-sm max-w-xs mx-auto">
              Stay connected and manage your tasks anytime, anywhere with our
              cloud sync.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-semibold text-lg sm:text-xl text-gray-900 mb-8">
          Customer Testimonials
        </h2>
        <div className="border-4 border-red-600 rounded-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
          <div className="md:flex-1">
            <p className="text-sm sm:text-base font-semibold max-w-md">
              Using this website has made my tasks so much easier! I can't
              imagine my day without it.
            </p>
            <div className="mt-4 flex items-center space-x-3">
              <img
                alt="User avatar with initials JS in red circle"
                className="w-6 h-6 rounded-full"
                height="24"
                src="https://storage.googleapis.com/a1aa/image/47a298d1-0164-437f-8710-6ea0c6c07a70.jpg"
                width="24"
              />
              <div>
                <p className="text-red-600 font-semibold text-sm">
                  Jason S. Clarke
                </p>
                <p className="text-xs text-gray-600">
                  Project Manager, California
                </p>
              </div>
            </div>
            <div className="mt-4 flex space-x-3 text-red-600">
              <button aria-label="Previous testimonial" className="hover:text-red-700">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button aria-label="Next testimonial" className="hover:text-red-700">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
          <img
            alt="Woman looking sideways portrait with neutral expression"
            className="w-40 h-40 object-cover rounded-md border-4 border-red-600"
            height="160"
            src="https://storage.googleapis.com/a1aa/image/e143c3f4-7f32-4932-4751-d64fc281c462.jpg"
            width="160"
          />
        </div>
      </section>
      <section className="mt-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <img
          alt="Hand holding phone showing todo app outdoor with blurred background"
          className="w-full rounded-md object-cover"
          height="400"
          src="https://storage.googleapis.com/a1aa/image/4612fa8a-b319-4a08-3564-29e055f0899a.jpg"
          width="600"
        />
        <div>
          <h3 className="font-semibold text-xl text-gray-900 mb-4">
            Start Organizing Your Life Today
          </h3>
          <p className="text-gray-700 mb-6 max-w-md">
            Join our user base and transform your productivity with our task
            management tools.
          </p>
          <div className="flex space-x-4">
            <button className="bg-red-600 text-white rounded-full px-6 py-2 text-sm font-semibold hover:bg-red-700 transition">
              Sign Up
            </button>
            <button className="border border-gray-300 rounded-full px-6 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>
        {dataList.length > 0 && (
  
<div className="mt-16 overflow-x-auto w-[1000px] bg-white rounded shadow ">


  <table className="min-w-full table-auto">
      <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
        <tr>
        <td className="px-4 py-2">
        
      </td>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Gender</th>
          <th className="px-4 py-2 text-left">Language</th>
          <th className="px-4 py-2 text-left">Email</th>
          
        </tr>
      </thead>
      <tbody>
        {dataList.map((data, idx) => (
          <tr key={idx} className="border-t border-gray-200 text-sm">
              <td className="px-4 py-2">
        <input type="checkbox" />
      </td>
            <td className="px-4 py-2">{data.firstName} {data.lastName}</td>
            <td className="px-4 py-2">{data.gender}</td>
            <td className="px-4 py-2">{data.languages.join(', ')}</td>
            <td className="px-4 py-2">{data.email}</td>
            
            
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </section>
    </main>
    <footer className="mt-20 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex items-center space-x-2 mb-6 md:mb-0">
          <img
            alt="do List logo black square with white text"
            className="w-38 h-18"
            height="42"
            src="image.png"
            width="52"
          />
          
        </div>
        <form action="#" className="flex space-x-2 max-w-md w-full" method="POST">
          <input
            className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="Enter your email"
            required
            type="email"
          />
          <button
            className="bg-red-600 text-white rounded-r-md px-6 py-2 font-semibold hover:bg-red-700 transition"
            type="submit"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-8 text-gray-700 text-sm pb-10">
        <div>
          <h4 className="font-semibold mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-red-600" href="#">
                About Us
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Careers
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Press
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Blog
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-red-600" href="#">
                Features
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Pricing
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Integrations
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                API
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-red-600" href="#">
                Help Center
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Contact Us
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Status
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-red-600" href="#">
                Terms of Service
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Cookie Policy
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Security
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Social</h4>
          <ul className="space-y-2">
            <li>
              <a className="hover:text-red-600" href="#">
                Facebook
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Twitter
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="hover:text-red-600" href="#">
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 text-xs pb-6">
        © 2023 do List, All rights reserved.
      </div>
    </footer>
  </>

  );
}

export default App;
