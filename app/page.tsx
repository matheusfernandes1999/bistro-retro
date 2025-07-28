"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";

// Images
import AboutUs from "../public/images/about.png";
import Logo from "../public/images/logo.svg";
import LogoName from "../public/images/logo-name.svg";
import LandingPic from "../public/images/landing.jpg";
import Service1 from "../public/images/service1.png";
import Service2 from "../public/images/service2.png";
import Service3 from "../public/images/service3.png"; 

import KnowUs1 from "../public/images/service (1).png";
import KnowUs2 from "../public/images/service (2).png";
import KnowUs3 from "../public/images/service (3).png";
import KnowUs4 from "../public/images/service (4).png";
import KnowUs5 from "../public/images/service (5).png";
import KnowUs6 from "../public/images/service (6).png";
import KnowUs7 from "../public/images/service (7).png";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    "Cardápio",
    "Eventos", 
    "Galeria",
    "Sobre Nós",
    "Contato",
  ];

  return (
    <div className="bg-[#0f1312] text-white min-h-screen overflow-x-hidden">
      {/* Header */}
      <header className="w-full top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={mounted ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                whileHover={{ rotate: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src={Logo}
                  alt="Bistrô Retrô Logo"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={mounted ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                  }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    {item}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-[#DE991B] origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden relative z-50 p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {/* Mobile Menu Content */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="pt-24 px-6"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Navigation Links */}
                <nav className="space-y-1 mb-12">
                  {navigationItems.map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 + 0.2
                      }}
                    >
                      <Link
                        href={`#${item.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-4 text-lg font-medium text-gray-200 hover:text-white hover:bg-gray-800/30 rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.span
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {item}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Contact Info */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="border-t border-gray-800 pt-8"
                >
                  <h4 className="text-white font-semibold mb-4">Contato</h4>
                  <div className="space-y-3">
                    <motion.a
                      href="tel:(49)99999-9999"
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Phone size={18} className="text-[#DE991B]" />
                      <span>(49) 99999-9999</span>
                    </motion.a>
                    <motion.a
                      href="mailto:contato@bistrorretro.org"
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <Mail size={18} className="text-[#DE991B]" />
                      <span>contato@bistrorretro.org</span>
                    </motion.a>
                    <motion.div
                      className="flex items-center space-x-3 text-gray-300"
                      whileHover={{ x: 5 }}
                    >
                      <MapPin size={18} className="text-[#DE991B]" />
                      <span>Rua das Flores, 123</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="mt-8"
                >
                  <h4 className="text-white font-semibold">Redes Sociais</h4>
                  <div className="flex space-x-3">
                    {['Instagram', 'Facebook', 'WhatsApp'].map((social, index) => (
                      <motion.button
                        key={social}
                        className="px-4 py-2 text-sm rounded-full bg-[#DE991B]/20 text-[#DE991B] hover:bg-[#DE991B]/30 transition-colors"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.9 }}
                      >
                        {social}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 grid grid-cols-1 md:grid-cols-2 items-center px-4 sm:px-6 md:px-16 py-8 md:py-12 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={mounted ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6 md:mb-0"
        >
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-l-2xl overflow-hidden shadow-lg">
            <Image
              src={LandingPic}
              alt="Bistrô Retrô"
              width={800}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold mb-3 sm:mb-4">
            Bistrô <span className="italic text-gray-200">Retrô</span>
          </h2>
          <p className="text-gray-300 mb-5 sm:mb-6 text-base sm:text-lg">
            Um estilo que vai encantar você e seu paladar 🍷
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
            <Link href="/cardapio" className="bg-[#DE991B] hover:bg-yellow-600 text-white font-semibold px-4 py-2 rounded-md transition duration-300 w-full sm:w-auto text-center">
              Ver Cardápio
            </Link>
            <Link href="/cardapio" className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition duration-300 w-full sm:w-auto text-center">
              Fazer um pedido
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-16 py-20 text-center">
        <motion.h3
          className="text-2xl font-semibold mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Nossos Serviços
        </motion.h3>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            "Alta gastronomia",
            "Eventos com estilo",
            "Comida de qualidade e conforto",
          ].map((desc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="p-4 shadow hover:shadow-xl transition"
            >
              <Image
              src={[Service1, Service2, Service3][i]}
              alt={`Service Icon ${i + 1}`}
              width={250}
              height={250}
              className="h-42 w-42 mx-auto bg-gray-500 rounded-full mb-4"
              />
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="w-[95vw] flex md:flex-row flex-col justify-center items-center px-16 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Sobre Nós</h3>
          <p className="max-w-2xl">
            O Bistrô é mais que um restaurante: é um acolhimento ao paladar, com
            boa música, serviço acolhedor e uma atmosfera única. Nossa paixão
            pela culinária é refletida em cada prato servido.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={AboutUs}
            alt="Sobre Nós"
            width={500}
            height={500}
            className="w-96 h-auto"
          />
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="px-6 md:px-16 py-20 w-full h-full">
        <h3 className="text-2xl font-semibold text-center mb-12">
          Conheça melhor a gente!
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-[repeat(4,minmax(100px,1fr))] gap-4">
          {/* Pizza no restaurante - grande */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs1} alt="Pizza" fill className="object-cover" />
          </div>

          {/* Cerveja + Brownie */}
          <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs2} alt="Cerveja" fill className="object-cover" />
          </div>
          <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs3} alt="Brownie" fill className="object-cover" />
          </div>

          {/* Pizza na mesa - larga */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs4} alt="Pizza na mesa" fill className="object-cover" />
          </div>

          {/* Forno */}
          <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs5} alt="Forno" fill className="object-cover" />
          </div>

          {/* Pessoa comendo */}
          <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs6} alt="Pessoa comendo" fill className="object-cover" />
          </div>

          {/* Hambúrguer */}
          <div className="col-span-1 row-span-1 relative rounded-xl overflow-hidden shadow-lg">
            <Image src={KnowUs7} alt="Hambúrguer" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 px-6 md:px-16 py-16 grid md:grid-cols-3 gap-8 text-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image src={LogoName} alt="Bistrô Retrô Logo" width={120} height={120} className="mb-2" />
          <p className="text-gray-400">
            Sabores únicos que conquistam o paladar mais exigente em um ambiente
            aconchegante.
          </p>
        </motion.div>
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-white font-semibold mb-3">Contato</p>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-green-400" />
            <span>contato@bistrorretro.org</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-green-400" />
            <span>(49) 99999-9999</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-white font-semibold mb-3">Endereço</p>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-green-400" />
            <span>Rua das Flores, 123 - Cidade Gourmet</span>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}