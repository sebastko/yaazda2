import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Youtube, Music, Calendar, Users, Video, Camera, Mail, ExternalLink } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [activeSection, setActiveSection] = useState('');
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const photos = [
    { src: '/images/band1.jpg', alt: 'Yaazda! Band Photo 1' },
    { src: '/images/band2.jpg', alt: 'Yaazda! Band Photo 2' },
    { src: '/images/band3.jpg', alt: 'Yaazda! Band Photo 3' },
    { src: '/images/band4.jpg', alt: 'Yaazda! Band Photo 4' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['events', 'about', 'videos', 'photos', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Touch handling for swipe navigation
  useEffect(() => {
    if (!isModalOpen) return;

    let startX = 0;
    let startY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startX || !startY) return;

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const diffX = startX - endX;
      const diffY = startY - endY;

      // Only trigger swipe if horizontal movement is greater than vertical
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
          if (diffX > 0) {
            // Swipe left - next photo
            showNextPhoto();
          } else {
            // Swipe right - previous photo
            showPreviousPhoto();
          }
        }
      }

      startX = 0;
      startY = 0;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case 'Escape':
          closePhotoModal();
          break;
        case 'ArrowLeft':
          showPreviousPhoto();
          break;
        case 'ArrowRight':
          showNextPhoto();
          break;
      }
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openPhotoModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsModalOpen(false);
  };

  const showNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const showPreviousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(/images/background.jpg)',
            filter: 'blur(2px) brightness(0.4)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-6 text-red-500 transform hover:scale-105 transition-transform duration-300"
              style={{
                fontFamily: 'Impact, Arial Black, sans-serif',
                textShadow: '4px 4px 8px rgba(0,0,0,0.8), 0 0 20px rgba(239, 68, 68, 0.5)',
                letterSpacing: '0.1em'
              }}>
            Yaazda!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-8 tracking-wide px-2">
            Seattle-based Polish rock cover band
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a href="https://www.facebook.com/Yaazda" 
               className="p-3 sm:p-4 bg-blue-600 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <Facebook size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="#" 
               className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <Instagram size={20} className="sm:w-6 sm:h-6" />
            </a>
            <a href="https://www.youtube.com/@YaazdaBand" 
               className="p-3 sm:p-4 bg-red-600 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
              <Youtube size={20} className="sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8">
              {[
                { name: 'Events', id: 'events' },
                { name: 'About', id: 'about' },
                { name: 'Videos', id: 'videos' },
                { name: 'Photos', id: 'photos' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 transform text-sm sm:text-base ${
                    activeSection === item.id
                      ? 'bg-red-500 text-white'
                      : 'text-white hover:text-red-500 hover:bg-red-500/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Events Section */}
      <section id="events" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Calendar className="text-red-500 mr-4" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">Upcoming Events</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-red-500/30 hover:border-red-500 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-2">Polish Festival Seattle</h3>
                  <p className="text-gray-300 text-base sm:text-lg">March 15, 2025 • 7:00 PM</p>
                  <p className="text-gray-400 text-sm sm:text-base">Seattle Center, Fisher Pavilion</p>
                </div>
                <Music className="text-red-500 flex-shrink-0" size={24} />
              </div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">Join us for an evening of Polish rock classics and folk favorites!</p>
              <a href="https://www.facebook.com/events/1010361367875263" 
                 className="inline-flex items-center text-red-500 hover:text-red-400 font-semibold text-sm sm:text-base">
                Facebook Event <ExternalLink className="ml-2" size={16} />
              </a>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 sm:p-8 border border-red-500/30 hover:border-red-500 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-red-500 mb-2">Eastern European Night</h3>
                  <p className="text-gray-300 text-base sm:text-lg">April 22, 2025 • 8:00 PM</p>
                  <p className="text-gray-400 text-sm sm:text-base">The Crocodile, Seattle</p>
                </div>
                <Music className="text-red-500 flex-shrink-0" size={24} />
              </div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">A night celebrating the music of Eastern Europe with special guests!</p>
              <a href="#" className="inline-flex items-center text-red-500 hover:text-red-400 font-semibold text-sm sm:text-base">
                More Details Coming Soon
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Users className="text-red-500 mr-4" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">About Yaazda!</h2>
          </div>
          
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
              Smashing harder than <span className="text-red-500 font-bold">Iga Świątek</span> and more powerful than 
              <span className="text-red-500 font-bold"> Robert Lewandowski's right foot</span>, Yaazda band brings the energy 
              and passion of Polish rock to the Pacific Northwest.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
              Covering hits from various eras of Polish music ranging from pop, rock to Polish and Balkan inspired folk, 
              they have performed regularly at Polish and Eastern European festivals on the West Coast for many years.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed">
              After transplanting from Portland, OR to Seattle, WA and multiple member rotations, they are back and 
              <span className="text-red-500 font-bold"> ready to rock your weekend</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Video className="text-red-500 mr-4" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">Videos</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl border-4 border-red-500/30 hover:border-red-500 transition-all duration-300">
              <iframe
                src="https://www.youtube.com/embed/TxvzaIb6dl4"
                title="Yaazda! Performance"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-center text-gray-400 mt-4 text-base sm:text-lg">
              Watch Yaazda! in action performing Polish rock classics
            </p>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section id="photos" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Camera className="text-red-500 mr-4" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">Photos</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {photos.map((photo, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-xl border-2 border-red-500/30 hover:border-red-500 transition-all duration-300 cursor-pointer"
                onClick={() => openPhotoModal(index)}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center mb-12">
            <Mail className="text-red-500 mr-4" size={32} />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">Contact Us</h2>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-base sm:text-lg font-semibold text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-base sm:text-lg font-semibold text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-base sm:text-lg font-semibold text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-white resize-none"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
            
            {/* Direct contact email */}
            <div className="text-center mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-base sm:text-lg">
                or contact us directly at:{' '}
                <a 
                  href="mailto:yaazdaband@gmail.com" 
                  className="text-red-500 hover:text-red-400 font-semibold transition-colors duration-300"
                >
                  yaazdaband@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-500/30 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-red-500 mb-6">Follow Yaazda!</h3>
            <div className="flex justify-center space-x-4 sm:space-x-6 mb-8">
              <a href="https://www.facebook.com/Yaazda" 
                 className="p-3 sm:p-4 bg-blue-600 rounded-full hover:bg-blue-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <Facebook size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="#" 
                 className="p-3 sm:p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <Instagram size={20} className="sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.youtube.com/@YaazdaBand" 
                 className="p-3 sm:p-4 bg-red-600 rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-300 shadow-lg">
                <Youtube size={20} className="sm:w-6 sm:h-6" />
              </a>
            </div>
            <p className="text-gray-400 text-base sm:text-lg">
              © 2025 Yaazda! • Seattle's Premier Polish Rock Cover Band
            </p>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Ready to rock your weekend!
            </p>
          </div>
        </div>
      </footer>

      {/* Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closePhotoModal}
              className="absolute -top-12 right-0 text-white text-2xl bg-black/50 hover:bg-red-500 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 z-10"
            >
              ×
            </button>

            {/* Previous button */}
            <button
              onClick={showPreviousPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 hover:bg-red-500 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-10"
            >
              ‹
            </button>

            {/* Image */}
            <img
              src={photos[currentPhotoIndex].src}
              alt={photos[currentPhotoIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh'
              }}
            />

            {/* Next button */}
            <button
              onClick={showNextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black/50 hover:bg-red-500 rounded-full w-12 h-12 flex items-center justify-center transition-all duration-300 z-10"
            >
              ›
            </button>

            {/* Photo counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;