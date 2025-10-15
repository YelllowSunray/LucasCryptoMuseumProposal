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
    ],
    visitors: "10,000 – 20,000",
    investment: "€1M – €2M"
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
    ],
    visitors: "50,000 – 100,000",
    investment: "€5M – €10M"
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
    ],
    visitors: "150,000 – 250,000",
    investment: "€15M – €25M"
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
    title: "What is Money?",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Role-play historical money systems to feel scarcity and value evolve up to crypto.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Visitors experience the evolution of money from barter to digital crypto through interactive role-play. Dress in 10,000BCE clothes and share resources, then transition to modern clothing while spending virtual BTC. Feel concepts like scarcity through hands-on activities in reconstructed historical societies.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/1.1.png" 
            alt="What is Money Exhibition - Interactive cryptocurrency museum exhibit showing evolution of money from barter to digital crypto" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "💰"
  },
  {
    title: "How does Crypto Work",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Interactive games teach blockchain, mining, wallets, and immutability.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Build a physical blockchain with giant foam blocks, simulate mining through puzzles, and broadcast transactions to a real-time ledger wall. Create wallets, exchange coins peer-to-peer, and attempt to alter blockchain history to see how immutability prevents tampering. Hands-on hashing games and key recovery exercises make complex concepts intuitive.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/1.2.png" 
            alt="How does Crypto Work Exhibition - Interactive blockchain museum exhibit with hands-on crypto learning games and demonstrations" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "⚙️"
  },
  {
    title: "Unsustainability of Crypto",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Explore crypto's environmental impact and the need for greener solutions.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Put yourself in the shoes of both the planet and financial system users. Explore how blockchain must evolve to achieve net-zero emissions and resource sustainability. Compare hidden environmental costs of traditional banking with emerging low-impact blockchain solutions, showing real-world stakes and choices we face.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/1.3.png" 
            alt="Unsustainability of Crypto Exhibition - Cryptocurrency museum exhibit exploring environmental impact and green blockchain solutions" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "🌱"
  },
  {
    title: "BTC/ETH Trading Simulator",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Try trading real crypto prices using simple market indicators.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          On a large screen, become a trader and attempt to buy and sell with real-time BTC/ETH price movements. Simplified RSI and Rate of Change indicators appear below to help you make better predictions and estimate returns of 1-2% plus crypto gains.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/1.4.png" 
            alt="BTC/ETH Trading Simulator Exhibition - Interactive Bitcoin and Ethereum trading simulator at cryptocurrency museum" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "📈"
  },
  {
    title: "Solve in 2025: Let's try solve Poverty ©",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Interactive simulation where visitors become leaders of mineral-rich nations.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Step into the role of leaders of mineral-rich African or South American nations. Navigate complex choices involving international institutions like the IMF and World Bank, exploring how post-colonial economic systems perpetuate inequality. While one person in the audience keeps printing money to simulate the USA Dollar.
        </p>
        <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-2">*Coolest Exhibition</p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.1.png" 
            alt="Solve in 2025: Let's try solve Poverty Exhibition - Interactive cryptocurrency museum game about global economic systems and digital money solutions" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "🌍"
  },
  {
    title: "Solve in 2026: Let's try hack Crypto",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Teaches crypto financial literacy through hands-on security challenges.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Experience the challenge of crypto security firsthand. Visitors gamify the security lessons by attempting to "hack" a mock wallet, understanding the difficulty and importance of strong security measures in protecting digital assets.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.2.png" 
            alt="Solve in 2026: Let's try hack Crypto Exhibition - Cryptocurrency security education exhibit teaching crypto wallet protection and scam prevention" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "🔐"
  },
  {
    title: "Solve in 2027: Let's try teach financial literacy to a 6 year old",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Playful gamified exhibition teaching financial literacy to 6-year-olds.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Kids make choices—like spending all their tokens or ignoring savings—and see real-time consequences unfold in a game world. A live 6-year-old "player" constantly makes the wrong moves, helping other visitors learn by spotting mistakes and correcting them together in a fun, low-stakes environment.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.3.png" 
            alt="Solve in 2027: Let's try teach financial literacy to a 6 year old Exhibition - Family-friendly cryptocurrency museum exhibit for children's crypto education" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "🎮"
  },
  {
    title: "Solve in 2027: Let's try regulate / Compliance",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          The Compliance Balancing Act game for designing identity and compliance rules.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Put visitors in the role of regulators designing identity and compliance rules to enforce "One Human, One Wallet." Adjust levels of strictness, verification methods, and data sharing to see how choices impact adoption rates, fraud levels, and user privacy. Too much compliance causes friction, while too little leads to scams and mistrust.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.4.png" 
            alt="Solve in 2027: Let's try regulate / Compliance Exhibition - Interactive cryptocurrency regulation and compliance education at crypto museum" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "⚖️"
  },
  {
    title: "Solve by 2030: The De Facto Currency Crisis Game",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Navigate a global financial crisis where Bitcoin has overtaken traditional currencies.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          This gamified exhibit puts visitors in the middle of a global financial crisis where Bitcoin has overtaken the euro and dollar as the dominant currency, causing massive upheaval—especially for pension holders reliant on collapsing fiat currencies. Visitors must navigate political, economic, and social challenges as governments and institutions scramble to respond.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.5.png" 
            alt="Solve by 2030: The De Facto Currency Crisis Game Exhibition - Cryptocurrency museum interactive game about global financial systems and Bitcoin adoption" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "🌐"
  },
  {
    title: "Let's pay with crypto (on us - we pay)",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Experience real crypto payments with a special wristband at the museum kiosk.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          At the museum, visitors get some BTC to spend however they like at the kiosk. They receive a special wristband that works like a contactless payment device—simulating a future where crypto payments could even be inside your body. By tapping the wristband, they can easily buy things like cheesecake, experiencing how simple and seamless crypto payments can be.
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/2.6.png" 
            alt="Let's pay with crypto Exhibition - Interactive cryptocurrency payment experience with contactless crypto transactions at museum" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "💳"
  },
  {
    title: "Let's build crypto apps with AI",
    description: (
      <div>
        <p className="font-bold text-blue-600 dark:text-blue-400 mb-2">
          <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-sm mr-2">TLDR:</span>
          Create crypto apps like social media platforms and Worldcoin extensions with AI guidance.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          In this exhibit, visitors can easily create crypto apps like social media platforms where posts are stored securely on the blockchain, giving users full ownership of their content. They can also build extensions for Worldcoin—the leading crypto passport system—exploring how blockchain can power identity and privacy. The AI guides everyone, even kids and beginners, to make these futuristic tools with no coding experience needed, using Cursor (the future of software dev).
        </p>
        <div className="mt-4">
          <Image 
            src="/exhibitionimages/3.1.png" 
            alt="Let's build crypto apps with AI Exhibition - Interactive cryptocurrency app development workshop using AI coding assistance at museum" 
            width={300}
            height={200}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    ),
    icon: "💻"
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
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 max-w-3xl space-y-8">
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
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="text-center">
                <div className="relative inline-block">
                  <Image 
                    src="/images/Section1PicV2.png" 
                    alt="CryptoMuseum - World's First Interactive Cryptocurrency Museum with Star Trek-inspired futuristic design showing digital money education exhibits" 
                    width={600}
                    height={400}
                    priority
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    className="max-w-full h-auto rounded-xl shadow-2xl"
                  />

                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 italic">
                  Let's make it Star Trek Looking - Because Aliens of course!
                </p>

        </div>
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
              title="A Museum for the Future of Money"
              description="A lively crypto museum that helps everyone understand and explore the world of digital money. We show how crypto can create freedom and trust, while also asking big questions about control and responsibility. Knowledge is powerful—like atomic energy—and we want to use it to build a better future."
              className="h-full"
            />
            <BentoCard
              eyebrow="Mission"
              title="Building Trust Through Experience"
              description="We make crypto easy to understand through hands-on exhibits and simple stories. Our goal is to build trust, spark curiosity, and give everyone the confidence to explore this new digital world."
              className="h-full"
            />
            <BentoCard
              eyebrow="Our Guiding Values"
              title="The Values That Drive Us"
              description={
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">🎓</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Education</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">We demystify money and technology, showing how systems like fiat and blockchain shape our world.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">💛</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Compassion</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Finance should serve everyone, not exclude—crypto opens doors where traditional systems close them.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Fairness</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">It isn't fair that a few nations can print money at will while others bear the cost—decentralized finance levels the field.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">🌱</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Sustainability</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Money systems should be transparent, efficient, and sustainable for both people and the planet.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">🚀</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Innovation</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Crypto is a living experiment—where bold ideas become global revolutions.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">✋</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Experience</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">We invite visitors to feel and explore the evolution of money—because lived experience is the best teacher.</p>
                  </div>
                </div>
              }
              className="h-full md:col-span-2"
            />
            <BentoCard
              eyebrow="Core Principles"
              title="The Foundation of Our Approach"
              description={
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">⚖️</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">1. Accountability Over Privilege</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">No one is above the system. Everyone plays by the same rules—whether you're an individual, a bank, or a government.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">💎</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">2. Value Must Match Contribution</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Rewards come from real value creation, not manipulation, speculation, or insider advantage.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">🤝</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">3. Give and Take Go Together</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Systems work when contribution and benefit are balanced. You can't extract endlessly without giving back.</p>
                  </div>
                  <div className="flex flex-col items-center text-center gap-2">
                    <span className="text-2xl">🌳</span>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">4. Long-Term Thinking Wins</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">We reject short-term gain at long-term expense. Decisions must consider impact on future generations, not just the next quarter.</p>
                  </div>
                </div>
              }
              className="h-full"
            />
            <BentoCard
              eyebrow="What's the current state?"
              title=""
              description={
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏦</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Financial Institutions</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Like banks are a massive waste of money (basically warehouses of money)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">USA Debt Crisis</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">USA is abusing the world by excessively printing USD with 36T Debt</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🌍</span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Global Debt Traps</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">EU/IMF/World Bank debt trap African/South-American Countries</p>
                    </div>
                  </div>
                </div>
              }
              className="h-full"
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
                  The crypto market continues to grow, with millions of new users joining every year. This massive user base represents a huge potential audience for educational experiences like a crypto museum.{' '}
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
                  Most people find crypto confusing or scary, creating a massive opportunity for education. This trust gap shows exactly why people need a safe, educational space like a crypto museum to build confidence.{' '}
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
                  Over half of respondents would visit a crypto museum to learn safely. This direct survey data proves there's strong public demand for exactly the type of educational experience we're proposing.{' '}
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
                  The global crypto user base grew by 76 million in 2024. This explosive growth means more people than ever need education about crypto, creating perfect timing for a museum to serve this expanding audience.{' '}
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
            <BentoCard
              eyebrow="Total Market Value"
              title={
                <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                  <AnimatedNumber value={2.1} suffix="T" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Global Crypto Market Cap
                  </span>
                </div>
              }
              description={
                <>
                  Total cryptocurrency market capitalization reached $2.1 trillion in 2024. This massive financial ecosystem affects everyone's future, making crypto education essential and a museum highly relevant to public interest.{' '}
                  <Link 
                    href="https://coinmarketcap.com/charts/" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: CoinMarketCap, Dec 2024]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Institutional Holdings"
              title={
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                  <AnimatedNumber value={68} suffix="B" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Under Binance Custody
                  </span>
                </div>
              }
              description={
                <>
                  Binance holds over $68 billion in cryptocurrency assets under custody. This institutional scale shows crypto is mainstream, and people need to understand how these massive systems work through educational experiences like museums.{' '}
                  <Link 
                    href="https://www.binance.com/en/blog/ecosystem/binance-custody-secures-over-68-billion-in-digital-assets-4214998246849031684" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Binance Custody Report, 2024]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Average Investment"
              title={
                <div className="text-4xl font-bold text-teal-600 dark:text-teal-400">
                  <AnimatedNumber value={7.4} suffix="K" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Average Crypto Portfolio
                  </span>
                </div>
              }
              description={
                <>
                  Average crypto investor holds $7,400 worth of digital assets. With real money at stake, people have strong motivation to learn about crypto, making a museum an attractive destination for education and understanding.{' '}
                  <Link 
                    href="https://www.gemini.com/state-of-crypto-2025" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: Gemini State of Crypto, 2025]
                  </Link>
                </>
              }
            />
            <BentoCard
              eyebrow="Daily Trading Volume"
              title={
                <div className="text-4xl font-bold text-pink-600 dark:text-pink-400">
                  <AnimatedNumber value={85} suffix="B" />
                  <span className="text-lg text-gray-600 dark:text-gray-400 block mt-2">
                    Daily Trading Volume
                  </span>
                </div>
              }
              description={
                <>
                  Global crypto exchanges process $85 billion in daily trading volume. This incredible daily activity shows crypto is a major part of global finance, creating huge public interest in understanding how it all works through educational venues like museums.{' '}
                  <Link 
                    href="https://www.coingecko.com/en/global_charts" 
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    [Source: CoinGecko Global Charts, 2024]
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
          
          {/* Types of Exhibitions Subsection */}
          <div className="mb-12">
            <h3 className="text-3xl font-semibold text-center mb-6 text-blue-700 dark:text-blue-300">
              Types of Exhibitions
            </h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Our museum will feature three main categories of interactive experiences designed to educate, challenge, and inspire visitors of all ages.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎓</span>
                  <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hover:text-blue-800 dark:hover:text-blue-300 transition-colors" onClick={() => document.getElementById('first-set')?.scrollIntoView({ behavior: 'smooth' })}>Section 1 of Musuem: Let's Explain Crypto</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Hands-on, 'Empathetic' exhibits that teach concepts like scarcity, blockchain/ledgers/blocks etc., trading.</p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">🎮</span>
                  <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 cursor-pointer hover:text-purple-800 dark:hover:text-purple-300 transition-colors" onClick={() => document.getElementById('second-set')?.scrollIntoView({ behavior: 'smooth' })}>Section 2 of Musuem: Let's Solve Crypto's Biggest Flaws</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Games that ask participants to figure out how to solve cryptocurrencies biggest flaws like regulation. Games will ask participants to find balance between 2 opposing forces. To inspire children, leaders of the future.</p>
              </div>
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">💻</span>
                  <h4 className="text-xl font-bold text-green-600 dark:text-green-400 cursor-pointer hover:text-green-800 dark:hover:text-green-300 transition-colors" onClick={() => document.getElementById('third-set')?.scrollIntoView({ behavior: 'smooth' })}>Section 3 of Musuem: Let's get Vibe-Coding *AI Auto-Complete Coding</h4>
                </div>
                <p className="text-gray-700 dark:text-gray-300">Powered by Cursor AI to create software for absolute beginners who want to get their hands dirty that solve crypto's many flaws.</p>
              </div>
            </div>
          </div>
          
          {/* Proposed Exhibits Subsection */}
          <div className="mb-8">
            <h3 className="text-3xl font-semibold text-center mb-4 text-blue-700 dark:text-blue-300">
              Proposed Exhibits:
            </h3>
            <h4 id="first-set" className="text-xl font-medium text-center mb-6 text-gray-600 dark:text-gray-400">
              First Set of Exhibits: Explaining Crypto
            </h4>
          </div>
          
          <PlusGrid items={exhibitions.slice(0, 4)} />
          
          <div className="mt-12 mb-8">
            <h4 id="second-set" className="text-xl font-medium text-center mb-6 text-gray-600 dark:text-gray-400">
              Second Set of Exhibits: Games to solve current flaws of Crypto
            </h4>
          </div>
          
          <PlusGrid items={exhibitions.slice(4, 10)} />
          
          <div className="mt-12 mb-8">
            <h4 id="third-set" className="text-xl font-medium text-center mb-6 text-gray-600 dark:text-gray-400">
              Third Set of Exhibitions: Let's get coding: We'll Teach you/*everyone* Software Dev
            </h4>
          </div>
          
          <PlusGrid items={exhibitions.slice(10)} />
        </div>
      </section>

      {/* Exhibition Styles Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Justification of Exhibition Styles
          </h2>
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-center mb-6 text-blue-700 dark:text-blue-300">Museum as a Mesh of Anthropology, Drama, and Tech</h3>
          <div className="grid md:grid-cols-3 gap-8">
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
                <h4 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">Anthropology</h4>
                <p className="text-gray-700 dark:text-gray-300">Explores how money and technology shape culture, from the U.S. dollar's role as the global reserve currency and costly SWIFT networks to cryptocurrency's challenge to these systems, linking past trade with a decentralized future.</p>
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
              <span className="italic">"The future of museums lies in blending technology, storytelling, and cultural context to create participatory, transformative experiences."</span><br/>
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

      {/* The Urgent Need for Education & Safety Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            The Urgent Need for Education & Safety
          </h2>
          <p className="text-center text-lg mb-8 text-gray-700 dark:text-gray-300">
            The scale of crypto theft and scams shows why this museum is desperately needed
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Crypto Theft Stats */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6 text-center">
              <div className="text-2xl mb-3">💸</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">$1.7B</div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Lost to crypto scams in 2024</p>
              <a href="https://www.fbi.gov/news/press-releases/fbi-releases-2024-internet-crime-report" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">FBI Internet Crime Report 2024 →</a>
                </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6 text-center">
              <div className="text-2xl mb-3">🚨</div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">$3.9B</div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Total crypto crime losses in 2024</p>
              <a href="https://www.chainalysis.com/reports/2024-crypto-crime-report/" target="_blank" className="text-purple-600 dark:text-purple-400 text-sm hover:underline">Chainalysis 2024 Report →</a>
                </div>

            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6 text-center">
              <div className="text-2xl mb-3">📚</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">57%</div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Can pass a basic crypto literacy quiz</p>
              <a href="https://cryptoliteracy.org/insights/" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">CryptoLiteracy.org →</a>
                </div>
                </div>

          {/* Call to Action */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-500/30 rounded-xl">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">This Museum Will Change Everything</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              With crypto adoption growing but theft and scams reaching billions, 
              we need a safe space where people can learn, understand, and protect themselves.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <span>• Interactive learning experiences</span>
              <span>• Real-world security demonstrations</span>
              <span>• Expert guidance and education</span>
              </div>
          </div>
        </div>
      </section>

      {/* Who Are We Serving? Section */}
      <section id="audience" className="section-padding bg-white dark:bg-gray-900">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Who Are We Serving?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* New to Crypto */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 h-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">👥</span>
                <span className="font-bold text-xl">New to Crypto</span>
              </div>
              <div className="w-full flex flex-col items-center mb-3">
                <span className="inline-block text-3xl font-extrabold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-xl mb-2 shadow">
                  51.5%
                </span>
                <span className="text-base font-medium text-gray-700 dark:text-gray-300 text-center mb-1">of non-owners cite lack of knowledge as the main barrier</span>
                <a href="https://nftevening.com/crypto-ownership-report/" target="_blank" className="text-blue-600 hover:underline text-sm font-semibold mt-1">NFTevening 2025</a>
              </div>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-2 text-base">
                <li>People who have heard about crypto but don't understand it</li>
                <li>New users wanting to learn safely</li>
              </ul>
            </div>

            {/* Institutions */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 h-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🏢</span>
                <span className="font-bold text-xl">Institutions</span>
              </div>
              <div className="w-full flex flex-col items-center mb-3">
                <span className="inline-block text-3xl font-extrabold text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-xl mb-2 shadow">
                  71%
                </span>
                <span className="text-base font-medium text-gray-700 dark:text-gray-300 text-center mb-1">of institutions now invest in digital assets</span>
                <a href="https://coinlaw.io/cryptocurrency-adoption-by-institutional-investors-statistics/" target="_blank" className="text-purple-600 hover:underline text-sm font-semibold mt-1">CoinLaw 2025</a>
              </div>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-2 text-base">
                <li>Institutional clients interested in crypto custody</li>
                <li>Schools and universities seeking financial education</li>
                <li>Skeptics who need proof before trusting crypto companies</li>
              </ul>
            </div>

            {/* Crypto Enthusiasts */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 h-full">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🚀</span>
                <span className="font-bold text-xl">Crypto Enthusiasts</span>
              </div>
              <div className="w-full flex flex-col items-center mb-3">
                <span className="inline-block text-3xl font-extrabold text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-xl mb-2 shadow">
                  70% US / 42% Global
                </span>
                <span className="text-base font-medium text-gray-700 dark:text-gray-300 text-center mb-1">of US adults and 42% globally have owned crypto</span>
                <a href="https://nftevening.com/crypto-ownership-report/" target="_blank" className="text-green-600 hover:underline text-sm font-semibold mt-1">NFTevening 2025</a>
              </div>
              <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300 mb-2 text-base">
                <li>Crypto fans and active traders</li>
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

                {/* Visitors Section */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-indigo-600 dark:text-indigo-400">
                    <span className="mr-2">👥</span> Expected Visitors
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/10 dark:to-indigo-800/20">
                      <span className="text-gray-600 dark:text-gray-400">Annual Visitors</span>
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">{tier.visitors}</span>
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 flex items-center text-teal-600 dark:text-teal-400">
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

      {/* Virtual Crypto Museum & IP Strategy Section */}
      <section className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container">
          <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Virtual Crypto Museum & IP Strategy
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Virtual Museum */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Virtual Museum</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Build a virtual counterpart of the Blockrise Crypto Museum accessible via web, VR, or AR, allowing global visitors to explore exhibits remotely.</p>
                <p>Include interactive 3D exhibits, guided tours, and educational content explaining crypto custody and blockchain history.</p>
                <p>Gamify the experience with quizzes, live transaction feeds, and interactive data visualizations to replicate the real museum's immersive learning environment.</p>
                <p>Offer 360° virtual walkthroughs or live-streamed events to engage online audiences.</p>
              </div>
            </div>
            {/* IP Strategy */}
            <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6">
              <h3 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">IP Strategy</h3>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Trademark and brand protection for the museum name, visual identity, and unique exhibit concepts.</p>
                <p>Copyright and licensing for all digital assets—3D models, visual content, and virtual tour materials—to prevent unauthorized reproduction.</p>
                <p>Develop a virtual content licensing model for educational institutions or partners who want to host the digital museum experience.</p>
                <p>Explore patent opportunities for proprietary interactive museum technology, such as blockchain-driven provenance displays or digital archiving tools.</p>
              </div>
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
            Ready to shape the future of crypto education?
            Join us in building a revolutionary space that makes cryptocurrency understandable and accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#contact" variant="primary">
              Contact Us
            </Button>
            <Button href="#about" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <div className="container max-w-xl lg:max-w-4xl mx-auto">
          <h2 className="text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Contact Us
            </h2>
          <div className="flex flex-col gap-8 items-stretch">
            {/* Contact Form */}
            <div className="flex-1">
              <ContactForm />
            </div>
            {/* Contact Info Card (now below the form) */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="card backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 p-6 text-center">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Other Ways to Reach Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">📧</span>
                        <a href="mailto:Iyersamir@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
                          Iyersamir@gmail.com
                        </a>
          </div>
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-2xl">📞</span>
                        <a href="tel:+31687343078" className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">
                          +31 687343078
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="ml-6">
                    <img 
                      src="/images/ContactFormProfilePic.jpg" 
                      alt="CryptoMuseum Contact Representative - Samir Iyer, Cryptocurrency Museum Project Lead" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-200 dark:border-blue-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bibliography Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Bibliography
          </h2>
          <ul className="list-decimal ml-6 space-y-3 text-base text-gray-700 dark:text-gray-300">
            <li>
              <a href="https://nftevening.com/crypto-ownership-report/" target="_blank" className="text-blue-600 hover:underline font-semibold">NFTevening 2025 Crypto Ownership Report</a> – Global and US crypto adoption statistics
            </li>
            <li>
              <a href="https://coinlaw.io/cryptocurrency-adoption-by-institutional-investors-statistics/" target="_blank" className="text-blue-600 hover:underline font-semibold">CoinLaw 2025 Institutional Adoption Report</a> – Institutional crypto investment trends
            </li>
            <li>
              <a href="https://www.pewresearch.org/short-reads/2024/10/24/majority-of-americans-arent-confident-in-the-safety-and-reliability-of-cryptocurrency/" target="_blank" className="text-blue-600 hover:underline font-semibold">Pew Research Center, Oct 2024</a> – Public confidence in cryptocurrency safety
            </li>
            <li>
              <a href="https://www.bankofcanadamuseum.ca/2023/11/understanding-cryptocurrencies/" target="_blank" className="text-blue-600 hover:underline font-semibold">Bank of Canada Museum, 2023</a> – Current state of crypto education in museums
            </li>
            <li>
              <a href="https://www.kansascityfed.org/research/research-working-papers/financial-literacy-risk-tolerance-and-cryptocurrency-ownership-in-the-united-states/" target="_blank" className="text-blue-600 hover:underline font-semibold">Federal Reserve Bank of Kansas City, 2024</a> – Financial literacy and crypto ownership correlation
            </li>
            <li>
              <a href="https://cryptoliteracy.org/insights/" target="_blank" className="text-blue-600 hover:underline font-semibold">CryptoLiteracy.org, 2024</a> – Global crypto literacy assessment results
            </li>
            <li>
              <a href="https://www.fbi.gov/news/press-releases/fbi-releases-2024-internet-crime-report" target="_blank" className="text-blue-600 hover:underline font-semibold">FBI Internet Crime Report, 2024</a> – Crypto scam and fraud statistics
            </li>
            <li>
              <a href="https://www.chainalysis.com/reports/2024-crypto-crime-report/" target="_blank" className="text-blue-600 hover:underline font-semibold">Chainalysis 2024 Crypto Crime Report</a> – Total crypto crime losses and trends
            </li>
            <li>
              <a href="https://www.statista.com/statistics/1202503/global-cryptocurrency-user-base/" target="_blank" className="text-blue-600 hover:underline font-semibold">Statista, Dec 2024</a> – Global cryptocurrency user base statistics
            </li>
            <li>
              <a href="https://www.gemini.com/state-of-crypto-2025" target="_blank" className="text-blue-600 hover:underline font-semibold">Gemini State of Crypto, May 2025</a> – Survey on museum interest and crypto adoption
            </li>
            <li>
              <a href="https://crypto.com/en/research/2024-crypto-market-sizing-report" target="_blank" className="text-blue-600 hover:underline font-semibold">Crypto.com Research, Dec 2024</a> – Market growth and new user statistics
            </li>
            <li>
              <a href="https://www.aam-us.org/2024/09/20/demographics-of-us-museum-goers-a-2024-annual-survey-of-museum-goers-data-story-update/" target="_blank" className="text-blue-600 hover:underline font-semibold">AAM Survey, Sept 2024</a> – Museum visitor preferences and engagement
            </li>
            <li>
              <a href="https://www.aam-us.org/2024/10/25/museums-and-community-perceptions-and-engagement-a-2024-annual-survey-of-museum-goers-data-story/" target="_blank" className="text-blue-600 hover:underline font-semibold">AAM Engagement Study, Oct 2024</a> – Museum engagement and community connection statistics
            </li>
            <li>
              <a href="https://www.aam-us.org/2024/11/22/homeschool-families-a-2024-annual-survey-of-museum-goers-data-story/" target="_blank" className="text-blue-600 hover:underline font-semibold">AAM Learning Report, Nov 2024</a> – Hands-on learning demand in museums
            </li>
            <li>
              <a href="https://www.tandfonline.com/doi/full/10.1080/09647775.2020.1847587" target="_blank" className="text-blue-600 hover:underline font-semibold">Parry, R. (2021). Museums in a Digital Age. Museum Management and Curatorship</a> – The future of museum styles and digital transformation
            </li>
            <li>
              <a href="https://coinmarketcap.com/charts/" target="_blank" className="text-blue-600 hover:underline font-semibold">CoinMarketCap, Dec 2024</a> – Global cryptocurrency market capitalization data
            </li>
            <li>
              <a href="https://www.binance.com/en/blog/ecosystem/binance-custody-secures-over-68-billion-in-digital-assets-4214998246849031684" target="_blank" className="text-blue-600 hover:underline font-semibold">Binance Custody Report, 2024</a> – Institutional cryptocurrency custody statistics
            </li>
            <li>
              <a href="https://www.coingecko.com/en/global_charts" target="_blank" className="text-blue-600 hover:underline font-semibold">CoinGecko Global Charts, 2024</a> – Cryptocurrency trading volume and market data
            </li>
          </ul>
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
