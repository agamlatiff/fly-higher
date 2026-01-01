import { Navbar } from "@/components/ui/navbar";
import Image from "next/image";
import {
  Plane,
  Shield,
  Heart,
  Globe,
  Users,
  Award,
  Clock,
  MapPin,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - FlyHigher",
  description:
    "Learn about FlyHigher's mission to make air travel accessible, affordable, and enjoyable for everyone.",
};

const stats = [
  { value: "500+", label: "Destinations", icon: MapPin },
  { value: "50K+", label: "Happy Travelers", icon: Users },
  { value: "24/7", label: "Support", icon: Clock },
  { value: "99%", label: "Satisfaction", icon: Award },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Your security is our top priority. We partner only with certified airlines and payment providers.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with one question: How does this benefit our travelers?",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Connecting you to 500+ destinations worldwide with the best airlines at competitive prices.",
  },
];

const timeline = [
  { year: "2020", title: "Founded", description: "Started with a vision to simplify flight booking" },
  { year: "2021", title: "10K Users", description: "Reached our first major milestone" },
  { year: "2022", title: "50+ Airlines", description: "Expanded partnerships across Asia" },
  { year: "2023", title: "Mobile App", description: "Launched iOS and Android apps" },
  { year: "2024", title: "500+ Destinations", description: "Now serving travelers worldwide" },
];

const AboutPage = () => {
  return (
    <div className="bg-background-light min-h-screen font-display">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-sky-primary/10 text-sky-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Plane className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-text-dark mb-6 leading-tight">
              Making Air Travel{" "}
              <span className="text-sky-primary">Simple & Joyful</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              We believe everyone deserves to explore the world. That&apos;s why we&apos;ve built
              FlyHigher — to make booking flights as easy as dreaming about your next destination.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-sky-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-sky-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-text-dark mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-text-dark mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To make air travel accessible, affordable, and enjoyable for everyone.
                We&apos;re building technology that removes the complexity from travel planning,
                so you can focus on what matters — the adventure ahead.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every feature we build, every partnership we form, and every decision we make
                is guided by this simple belief: travel should be simple.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=600&fit=crop"
                  alt="Airplane wing view from window"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-100 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-dark mb-4">
              What We Stand For
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              These core values guide everything we do at FlyHigher.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-sky-primary rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-text-dark mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-text-dark mb-4">
              Our Journey
            </h2>
            <p className="text-gray-500 text-lg">
              From a small idea to serving travelers worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 inline-block">
                      <div className="text-sky-primary font-black text-2xl mb-1">
                        {item.year}
                      </div>
                      <div className="font-bold text-text-dark mb-1">
                        {item.title}
                      </div>
                      <div className="text-gray-500 text-sm">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-sky-primary rounded-full border-4 border-white shadow-lg flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-sky-primary to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Fly Higher?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust FlyHigher for their journeys.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-white text-sky-primary font-bold px-8 py-4 rounded-full hover:shadow-xl transition-all hover:-translate-y-1"
          >
            <Plane className="w-5 h-5" />
            Start Exploring
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

