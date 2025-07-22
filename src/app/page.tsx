'use client';

import Image from "next/image";
import { Button } from "@/components/Button";
import { BentoCard } from "@/components/BentoCard";
import { Gradient, GradientBackground } from "@/components/Gradient";
import { TestimonialGrid } from "@/components/Testimonials";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { PlusGrid } from "@/components/PlusGrid";
import Link from 'next/link'
import { useState } from "react";

// Helper function to format numbers
const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `€${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `€${(value / 1000).toFixed(0)}K`;
  }
  return `€${value.toFixed(0)}`;
};

// Helper function to parse currency ranges
const parseCurrencyRange = (range: string): { min: number; max: number } => {
  const numbers = range.match(/\d+/g)?.map(Number) || [0, 0];
  return {
    min: numbers[0],
    max: numbers[1] || numbers[0],
  };
};

// Testimonials data
const testimonialData = [
  {
    content: "A crypto museum would be amazing! As someone who teaches blockchain tech, having a physical space to show people how crypto security works would be game-changing. Can't wait to bring my students! 🚀 #CryptoEducation",
    author: "Emma Dorsey",
    role: "Blockchain Educator",
    image: "/images/woman1.jpg"
  },
  {
    content: "Finally! We need this so badly. Lost money to a scam last year because I didn't understand wallet security. A museum where people can learn safely would prevent so many others from making the same mistakes 💡 #CryptoSafety",
    author: "Jenny Wilson",
    role: "Crypto Enthusiast",
    image: "/images/woman2.jpg"
  },
  {
    content: "Our company would definitely sponsor this. The interactive exhibits sound perfect for corporate training days. Physical spaces build trust in ways online courses never can. Let's make this happen! 🏛️ #CryptoMuseum",
    author: "Benjamin Russel",
    role: "FinTech Executive",
    image: "/images/man.jpg"
  }
];

const tiers = [
  {
    name: "Popup",
    description: "Temporary setup: ticket sales, small gift shop, simple tours",
    revenue: {
      year1: "€300K – €600K",
      year2: "€400K – €750K",
      year3: "€500K – €900K"
    },
    costs: {
      year1: "€100K – €200K",
      year2: "€120K – €250K",
      year3: "€150K – €300K"
    },
    profit: {
      year1: "€200K – €400K",
      year2: "€250K – €500K",
      year3: "€350K – €600K"
    },
    features: [
      "Limited ticket sales",
      "Small gift shop",
      "Basic guided tours",
      "Perfect for testing market"
    ]
  },
  {
    name: "Small/Mid Museum",
    description: "Permanent venue with full revenue streams",
    revenue: {
      year1: "€900K – €1.8M",
      year2: "€1.2M – €2.2M",
      year3: "€1.5M – €3M"
    },
    costs: {
      year1: "€500K – €1M",
      year2: "€600K – €1.2M",
      year3: "€700K – €1.4M"
    },
    profit: {
      year1: "€400K – €800K",
      year2: "€600K – €1M",
      year3: "€800K – €1.6M"
    },
    features: [
      "Full ticket operations",
      "Complete workshop program",
      "AR/VR experiences",
      "Regular events & networking"
    ]
  },
  {
    name: "Full Museum",
    description: "Large-scale operation with premium offerings",
    revenue: {
      year1: "€4M – €6M",
      year2: "€6M – €8M",
      year3: "€8M – €10M+"
    },
    costs: {
      year1: "€2M – €3.5M",
      year2: "€2.5M – €4M",
      year3: "€3M – €4.5M"
    },
    profit: {
      year1: "€1.5M – €2.5M",
      year2: "€3M – €4M",
      year3: "€5M – €6.5M+"
    },
    features: [
      "Premium events & conferences",
      "VIP memberships",
      "Large visitor capacity",
      "Full educational program"
    ]
  }
];

const revenueStreams = [
  {
    category: "Traditional Museum Revenue",
    items: [
      {
        name: "Ticket Sales",
        popup: "€150K – €300K",
        small: "€400K – €750K",
        full: "€1.5M – €3.5M"
      },
      {
        name: "Gift Shop & Merchandise",
        popup: "€20K – €40K",
        small: "€75K – €150K",
        full: "€250K – €600K"
      },
      {
        name: "Basic Events & Tours",
        popup: "€15K – €30K",
        small: "€75K – €150K",
        full: "€300K – €700K"
      }
    ]
  },
  {
    category: "Interactive Experiences",
    items: [
      {
        name: "VR/AR Experiences",
        popup: "€5K – €10K",
        small: "€60K – €120K",
        full: "€300K – €700K"
      },
      {
        name: "Trading Simulator / Kiosk",
        popup: "€5K – €10K",
        small: "€40K – €80K",
        full: "€200K – €500K"
      },
      {
        name: "Artifact Exhibit Add-ons",
        popup: "€0",
        small: "€0",
        full: "€0 – €50K"
      }
    ]
  },
  {
    category: "Educational Revenue",
    items: [
      {
        name: "Trading Basics Workshops",
        popup: "€2K – €5K",
        small: "€25K – €50K",
        full: "€100K – €250K"
      },
      {
        name: "Web3 Coding Bootcamps",
        popup: "€2K – €5K",
        small: "€20K – €40K",
        full: "€80K – €200K"
      },
      {
        name: "Security Awareness Classes",
        popup: "€1K – €5K",
        small: "€15K – €30K",
        full: "€50K – €150K"
      },
      {
        name: "Corporate Training Days",
        popup: "€0",
        small: "€20K – €40K",
        full: "€150K – €300K"
      }
    ]
  },
  {
    category: "Premium + Events",
    items: [
      {
        name: "VIP Memberships",
        popup: "€0",
        small: "€10K – €20K",
        full: "€80K – €200K"
      },
      {
        name: "Private Events / Networking",
        popup: "€0",
        small: "€15K – €30K",
        full: "€150K – €300K"
      },
      {
        name: "Conference Hosting",
        popup: "€0",
        small: "€0 – €10K",
        full: "€300K – €700K"
      }
    ]
  }
];

const exhibitions = [
  {
    title: "Crypto Time Machine",
    description: "Journey through the history of cryptocurrency, from Bitcoin's creation to modern innovations.",
    icon: "🕰️"
  },
  {
    title: "Security Theater",
    description: "Interactive demonstrations of how crypto custody works, featuring real security systems.",
    icon: "🔐"
  },
  {
    title: "Trading Simulator",
    description: "Experience crypto trading in a safe, guided environment with expert explanations.",
    icon: "📊"
  },
  {
    title: "Blockchain Explorer",
    description: "Visualize how blockchain works with giant interactive displays and real-time data.",
    icon: "🔍"
  },
  {
    title: "Innovation Lab",
    description: "Hands-on area where visitors can create their own tokens and smart contracts.",
    icon: "🔬"
  },
  {
    title: "NFT Gallery",
    description: "Showcase of digital art and collectibles, explaining the technology behind NFTs.",
    icon: "🎨"
  },
  {
    title: "Future of Finance",
    description: "Explore how crypto is changing banking, investments, and global commerce.",
    icon: "🌐"
  },
  {
    title: "Kids Crypto Zone",
    description: "Fun, educational activities teaching children about digital money and security.",
    icon: "🎮"
  }
];

const funderLogos = [
  { src: '/logos/blockriselogo1.png', alt: 'Blockrise', width: 100, height: 25 },
  { src: '/logos/binancelogo.png', alt: 'Binance', width: 85, height: 25 },
  { src: '/logos/coinbaselogo.png', alt: 'Coinbase', width: 90, height: 25 },
  { src: '/logos/ledgerlogo.png', alt: 'Ledger', width: 80, height: 25 }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <GradientBackground />
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              A Proposal for:<br/>The World's First<br/>Cryptocurrency Museum
            </h1>
            <p className="text-2xl text-gray-600 dark:text-gray-300">
              A revolutionary space where cryptocurrency becomes understandable, trustworthy, and accessible for everyone.
            </p>
            <div className="flex gap-6">
              <Button href="#contact" variant="primary">Contact Us</Button>
              <Button href="#about" variant="outline">Explore Proposal</Button>
            </div>
          </div>
        </div>
      </section>

      {/* What Is This Museum Section */}
      <section id="about" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              What Is This Museum?
            </h2>
            <BentoCard
              title="A Space for Everyone"
              description="This museum is a fun and easy place for anyone to learn about crypto — what it is, how it works, and why it matters. It also shows how companies keep your crypto safe. It's perfect for people who don't know much about crypto or might be nervous about it."
              className="hover:scale-[1.01]"
            />
          </div>
        </div>
      </section>

      {/* Vision and Mission Section */}
      <section className="section-padding relative overflow-hidden">
        <Gradient className="absolute inset-0 -z-10" />
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Vision and Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <BentoCard
              eyebrow="Vision"
              title="Understanding Through Experience"
              description="To create a space where crypto is understood, trusted, and accessible for everyone."
              className="h-full"
            />
            <BentoCard
              eyebrow="Mission"
              title="Education & Trust"
              description="To educate the public on crypto custody and security with transparency, hands-on experiences, and emotional reassurance."
              className="h-full"
            />
            <BentoCard
              eyebrow="Core Values"
              title="Our Guiding Principles"
              description={
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <span className="font-semibold">Transparency</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Clear and open about how crypto works</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="font-semibold">Education</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Making complex concepts simple</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <span className="font-semibold">Innovation</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Using technology to enhance learning</span>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                      <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <span className="font-semibold">Emotional safety</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Building trust and confidence</span>
                  </div>
                </div>
              }
              className="md:col-span-2"
            />
          </div>
        </div>
      </section>

      {/* Key Stats Section */}
      <section id="market-size" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            <BentoCard
              eyebrow="Market Size"
              title={
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedNumber value={659} suffix="M+" /> 
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Global Crypto Owners
                  </span>
                </div>
              }
              description={
                <>
                  The crypto market continues to grow, with millions of new users joining every year.{' '}
                  <Link 
                    href="https://www.statista.com/statistics/1202503/global-cryptocurrency-user-base/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Statista, Dec 2024]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Trust Gap"
              title={
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                  <AnimatedNumber value={63} suffix="%" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Not Confident in Crypto
                  </span>
                </div>
              }
              description={
                <>
                  Most people find crypto confusing or scary, creating a massive opportunity for education.{' '}
                  <Link 
                    href="https://www.pewresearch.org/short-reads/2024/10/24/majority-of-americans-arent-confident-in-the-safety-and-reliability-of-cryptocurrency/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Pew Research, Oct 2024]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Museum Interest"
              title={
                <div className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                  <AnimatedNumber value={56} suffix="%" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Would Visit Museum
                  </span>
                </div>
              }
              description={
                <>
                  Over half of respondents would visit a crypto museum to learn safely.{' '}
                  <Link 
                    href="https://www.gemini.com/state-of-crypto-2025" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Gemini State of Crypto, May 2025]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Market Growth"
              title={
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                  <AnimatedNumber value={76} suffix="M+" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    New Crypto Users
                  </span>
                </div>
              }
              description={
                <>
                  The global crypto user base grew by 76 million in 2024.{' '}
                  <Link 
                    href="https://crypto.com/en/research/2024-crypto-market-sizing-report" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Crypto.com Research, Dec 2024]
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding relative overflow-hidden">
        <Gradient className="absolute inset-0 -z-10" />
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            What People Are Saying About A Possible Crypto Museum
          </h2>
          <TestimonialGrid testimonials={testimonialData} />
        </div>
      </section>

      {/* Proposed Exhibitions Section */}
      <section id="exhibitions" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Proposed Exhibitions
          </h2>
          <PlusGrid items={exhibitions} />
        </div>
      </section>

      {/* Exhibition Styles Section */}
      <section id="market-size" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Justification of Exhibition Styles
          </h2>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-blue-700 dark:text-blue-300">Museum as a Mesh of Anthropology, Drama, and Tech</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <h4 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Anthropology</h4>
                <p className="text-gray-700 dark:text-gray-300">Explores how people interact with money, technology, and each other. The museum will showcase the cultural and social impact of cryptocurrency, connecting the past, present, and future of human exchange.</p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <h4 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Drama</h4>
                <p className="text-gray-700 dark:text-gray-300">Uses storytelling, immersive theater, and role-play to make learning memorable. Visitors will experience the drama of crypto history, security breaches, and innovation through interactive exhibits and live demonstrations.</p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <h4 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Tech</h4>
                <p className="text-gray-700 dark:text-gray-300">Leverages the latest technology—AR, VR, simulators, and real blockchain tools—to create hands-on, future-focused experiences. This approach makes complex concepts accessible and engaging for all ages.</p>
              </div>
            </div>
            <p className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
              <span className="italic">“The future of museums lies in blending technology, storytelling, and cultural context to create participatory, transformative experiences.”</span><br/>
              <Link href="https://www.tandfonline.com/doi/full/10.1080/09647775.2020.1847587" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">[Source: Parry, R. (2021). Museums in a Digital Age. Museum Management and Curatorship]</Link>
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Key Points */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 h-full">
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                  <span className="text-blue-500 mt-1">⚠️</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      Many don't trust companies holding their crypto money
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      63% of Americans have little to no confidence in the safety and reliability of cryptocurrency. <Link href="https://www.pewresearch.org/short-reads/2024/10/24/majority-of-americans-arent-confident-in-the-safety-and-reliability-of-cryptocurrency/" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">[Pew Research Center, Oct 2024]</Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/10">
                  <span className="text-purple-500 mt-1">🎯</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      No museum today focuses on explaining crypto custody and security in simple ways
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Most public crypto education is online or through private workshops; no major museum exists for this. <Link href="https://www.bankofcanadamuseum.ca/2023/11/understanding-cryptocurrencies/" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">[Bank of Canada Museum, 2023]</Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <span className="text-green-500 mt-1">💡</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      This museum will help people feel safe and excited about crypto
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      56% of Americans who do not own crypto cite lack of knowledge and safety concerns as their main barrier to entry. <Link href="https://nftevening.com/crypto-ownership-report/" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">[NFTevening Crypto Ownership Report, 2025]</Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/10">
                  <span className="text-indigo-500 mt-1">📈</span>
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      Supports financial literacy and builds trust in new digital money systems
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Higher financial literacy is strongly linked to greater confidence and safer participation in crypto markets. <Link href="https://www.kansascityfed.org/research/research-working-papers/financial-literacy-risk-tolerance-and-cryptocurrency-ownership-in-the-united-states/" target="_blank" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline">[Federal Reserve Bank of Kansas City, 2024]</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Stats */}
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-8 text-center">
                <p className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  <AnimatedNumber value={83} suffix="%" />
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  of museum visitors want interactive exhibits{' '}
                  <Link 
                    href="https://www.aam-us.org/2024/09/20/demographics-of-us-museum-goers-a-2024-annual-survey-of-museum-goers-data-story-update/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: AAM Survey, Sept 2024]
                  </Link>
                </p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-8 text-center">
                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  <AnimatedNumber value={40} suffix="%" />
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  higher engagement with interactive displays{' '}
                  <Link 
                    href="https://www.aam-us.org/2024/10/25/museums-and-community-perceptions-and-engagement-a-2024-annual-survey-of-museum-goers-data-story/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: AAM Engagement Study, Oct 2024]
                  </Link>
                </p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-8 text-center">
                <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-3">
                  <AnimatedNumber value={76} suffix="%" />
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  want hands-on learning experiences{' '}
                  <Link 
                    href="https://www.aam-us.org/2024/11/22/homeschool-families-a-2024-annual-survey-of-museum-goers-data-story/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: AAM Learning Report, Nov 2024]
                  </Link>
                </p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-8 text-center">
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  <AnimatedNumber value={40} suffix="%" />
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  of frequent visitors feel museums connect them to community{' '}
                  <Link 
                    href="https://www.aam-us.org/2024/10/25/museums-and-community-perceptions-and-engagement-a-2024-annual-survey-of-museum-goers-data-story/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: AAM Community Study, Oct 2024]
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Who Are We Serving?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 hover:scale-105 transition-transform">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">👥</span>
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400">New to Crypto</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500">•</span>
                  People who have heard about crypto but don't understand it
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-blue-500">•</span>
                  New users wanting to learn safely
                </li>
              </ul>
            </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 hover:scale-105 transition-transform">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">🏢</span>
                <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400">Institutions</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-purple-500">•</span>
                  Institutional clients interested in crypto custody
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-purple-500">•</span>
                  Schools and universities seeking financial education
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-purple-500">•</span>
                  Skeptics who need proof before trusting crypto companies
                </li>
              </ul>
            </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 hover:scale-105 transition-transform">
              <div className="text-center mb-6">
                <span className="text-4xl mb-4 block">🚀</span>
                <h3 className="text-xl font-semibold text-green-600 dark:text-green-400">Crypto Enthusiasts</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500">•</span>
                  Crypto fans who want to see how custody works
                </li>
                <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500">•</span>
                  Active traders seeking deeper understanding
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Who's Paying?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <h3 className="text-2xl font-semibold mb-8 text-blue-600 dark:text-blue-400">
                Ideal Funders
              </h3>
              <div className="flex flex-col gap-4 items-center p-3">
                {funderLogos.map((logo, index) => (
                  <div key={index} className="relative h-8 flex items-center justify-center hover:opacity-80 transition-opacity duration-300">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="object-contain max-h-full w-auto"
                    />
                  </div>
                ))}
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 text-center">
                Plus financial institutions and tech foundations
              </p>
            </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <h3 className="text-2xl font-semibold mb-6 text-purple-600 dark:text-purple-400">
                Benefits for Funders
              </h3>
              <ul className="space-y-4">
                {[
                  'Boost brand trust',
                  'Show educational leadership',
                  'Grow adoption',
                  'Improve public image'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3 text-lg text-gray-700 dark:text-gray-300">
                    <span className="text-green-500">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
              <h3 className="text-2xl font-semibold mb-6 text-indigo-600 dark:text-indigo-400">
                Sponsorship Options
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Sponsorship tiers and custom exhibit branding to tailor messages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projected Revenue Section */}
      <section id="revenue" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Let's Talk Money: Projected Revenue
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <div key={index} className="card hover:scale-105 transition-transform duration-300 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">{tier.description}</p>
                
                {/* Revenue Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-blue-600 dark:text-blue-400">
                    <span className="mr-2">📈</span> Revenue Growth
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 1</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{tier.revenue.year1}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 2</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{tier.revenue.year2}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 3</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{tier.revenue.year3}</span>
                    </div>
                  </div>
                </div>

                {/* Costs Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-purple-600 dark:text-purple-400">
                    <span className="mr-2">💸</span> Operating Costs
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 1</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{tier.costs.year1}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 2</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{tier.costs.year2}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/10 dark:to-purple-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 3</span>
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{tier.costs.year3}</span>
                    </div>
                  </div>
                </div>

                {/* Profit Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-green-600 dark:text-green-400">
                    <span className="mr-2">💰</span> Projected Profit
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 1</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{tier.profit.year1}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 2</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{tier.profit.year2}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/10 dark:to-green-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Year 3</span>
                      <span className="font-semibold text-green-600 dark:text-green-400">{tier.profit.year3}</span>
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-indigo-600 dark:text-indigo-400">
                    <span className="mr-2">✨</span> Key Features
                  </h4>
                  <ul className="space-y-2">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue Streams Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Revenue Streams
          </h2>
          <div className="space-y-8">
            {revenueStreams.map((stream, index) => (
              <div key={index} className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
                <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                  {stream.category}
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left pb-4 text-gray-600 dark:text-gray-400">Revenue Stream</th>
                        <th className="text-right pb-4 text-gray-600 dark:text-gray-400">Popup</th>
                        <th className="text-right pb-4 text-gray-600 dark:text-gray-400">Small Museum</th>
                        <th className="text-right pb-4 text-gray-600 dark:text-gray-400">Full Museum</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stream.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b border-gray-200 dark:border-gray-700 last:border-0">
                          <td className="py-4 text-gray-700 dark:text-gray-300">{item.name}</td>
                          <td className={`py-4 text-right ${item.popup === "€0" ? "text-gray-400" : "text-green-600 dark:text-green-400 font-semibold"}`}>
                            {item.popup}
                          </td>
                          <td className={`py-4 text-right ${item.small === "€0" ? "text-gray-400" : "text-green-600 dark:text-green-400 font-semibold"}`}>
                            {item.small}
                          </td>
                          <td className={`py-4 text-right ${item.full === "€0" ? "text-gray-400" : "text-green-600 dark:text-green-400 font-semibold"}`}>
                            {item.full}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Additional Benefits
          </h2>
          <div className="card backdrop-blur-sm bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Increase client conversions by 5–15%',
                'Improve customer retention',
                'Enable premium service upsells',
                'Generate sponsorship income',
                'Enhance brand trust',
                'Attract bigger clients'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
                  <span className="text-green-500 text-xl">✓</span>
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Get Involved
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
            Ready to shape the future of crypto education?<br/>
            Join us in building a revolutionary space that makes cryptocurrency understandable and accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Contact Us</a>
            <a href="#about" className="inline-block px-6 py-3 rounded-lg bg-white text-blue-600 border border-blue-600 font-semibold hover:bg-blue-50 dark:bg-gray-900 dark:hover:bg-gray-800 transition-colors">Learn More</a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container max-w-xl mx-auto">
          <h2 className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Contact Us
          </h2>
          <ContactForm />
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container">
          <div className="text-center">
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-6 rounded-xl text-center shadow-lg">
        <h3 className="text-2xl font-semibold mb-2">Thank you!</h3>
        <p>Your message has been sent. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form
      action="https://formspree.io/f/mvgqkzdo"
      method="POST"
      className="space-y-6 bg-white/80 dark:bg-gray-900/80 p-8 rounded-xl shadow-lg"
      onSubmit={e => {
        setTimeout(() => setSubmitted(true), 100); // Simulate instant feedback
      }}
    >
      <div>
        <label htmlFor="name" className="block font-medium mb-1">Name</label>
        <input type="text" id="name" name="name" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label htmlFor="email" className="block font-medium mb-1">Email</label>
        <input type="email" id="email" name="email" required className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label htmlFor="message" className="block font-medium mb-1">Message</label>
        <textarea id="message" name="message" required rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
      </div>
      <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
    </form>
  );
}
