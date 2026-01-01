import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import SupportFaq from "./_components/SupportFaq";

const categories = [
  { icon: "flight", title: "Booking", count: 12 },
  { icon: "payments", title: "Payments", count: 8 },
  { icon: "luggage", title: "Baggage", count: 6 },
  { icon: "event_busy", title: "Cancellations", count: 5 },
  { icon: "loyalty", title: "Rewards", count: 4 },
];

export default function SupportPage() {
  return (
    <div className="bg-background dark:bg-background-dark min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-slate-800 dark:from-accent/20 dark:to-background-dark py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6">
            <span className="material-symbols-outlined text-accent">support_agent</span>
            <span className="text-white text-sm font-medium">We&apos;re Here to Help</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            How can we help you?
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto bg-white dark:bg-surface-dark rounded-full p-2 flex items-center gap-3 shadow-lg">
            <span className="material-symbols-outlined text-gray-400 ml-4">search</span>
            <input
              type="text"
              placeholder="Search for help..."
              className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            <button className="bg-accent hover:bg-sky-400 text-primary font-bold px-6 py-2.5 rounded-full transition">
              Search
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, index) => (
              <button
                key={index}
                className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-card border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-accent/50 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition">
                  <span className="material-symbols-outlined text-2xl text-accent">
                    {cat.icon}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-400">{cat.count} articles</p>
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <SupportFaq />

        {/* Contact Section */}
        <div className="mt-16 bg-gradient-to-br from-primary to-slate-800 dark:from-accent/20 dark:to-surface-dark rounded-3xl p-8 md:p-12 text-center">
          <span className="material-symbols-outlined text-4xl text-accent mb-4">
            contact_support
          </span>
          <h2 className="text-2xl font-bold text-white mb-4">
            Still need help?
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@flyhigher.com"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-sky-400 text-primary font-bold px-6 py-3 rounded-full transition"
            >
              <span className="material-symbols-outlined">email</span>
              Email Us
            </a>
            <a
              href="tel:+016075550123"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-6 py-3 rounded-full transition"
            >
              <span className="material-symbols-outlined">call</span>
              Call Us
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
