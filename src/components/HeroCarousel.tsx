import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';

const HeroCarousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // pauseOnHover: true,
    // arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      title: "Revolutionizing Healthcare with Blockchain",
      subtitle: "Secure, transparent, and efficient hospital management system",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2091&q=80",
      cta: "Get Started",
      link: "/register"
    },
    {
      id: 2,
      title: "Patient-Centered Care",
      subtitle: "Empowering patients with secure access to their medical records",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      cta: "Learn More",
      link: "/about"
    },
    {
      id: 3,
      title: "Join Our Network",
      subtitle: "Connect with leading healthcare providers on our secure platform",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
      cta: "Apply Now",
      link: "/apply"
    }
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative h-screen">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <motion.div 
                  className="max-w-3xl text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                  <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                  <Link 
                    to={slide.link} 
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;