'use client';

import { Gradient } from "@/components/Gradient";
import { TestimonialGrid } from "@/components/Testimonials";

const testimonialData = [
  {
    content: "A crypto museum would be amazing! As someone who teaches blockchain tech, having a physical space to show people how crypto security works would be game-changing. Can't wait to bring my students! 🚀 #CryptoEducation",
    author: "Emma Dorsey",
    role: "Blockchain Educator",
    image: "/individual-investors/emma-dorsey.jpg"
  },
  {
    content: "Finally! We need this so badly. Lost money to a scam last year because I didn't understand wallet security. A museum where people can learn safely would prevent so many others from making the same mistakes 💡 #CryptoSafety",
    author: "Jenny Wilson",
    role: "Crypto Enthusiast",
    image: "/individual-investors/jenny-wilson.jpg"
  },
  {
    content: "Our company would definitely sponsor this. The interactive exhibits sound perfect for corporate training days. Physical spaces build trust in ways online courses never can. Let's make this happen! 🏛️ #CryptoMuseum",
    author: "Benjamin Russel",
    role: "FinTech Executive",
    image: "/individual-investors/benjamin-russel.jpg"
  }
];

export function TestimonialSection() {
  return (
    <section className="section-padding relative overflow-hidden">
      <Gradient className="absolute inset-0 -z-10" />
      <div className="container">
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          What People Are Saying About A Crypto Museum
        </h2>
        <TestimonialGrid testimonials={testimonialData} />
      </div>
    </section>
  );
} 