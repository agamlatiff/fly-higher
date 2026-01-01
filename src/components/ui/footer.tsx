import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* CTA Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="max-w-lg text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">
              Ready for takeoff with <span className="text-accent">FlyHigher</span>?
            </h2>
          </div>
          <div className="flex gap-4">
            <Link
              href="/available-flights"
              className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-full text-sm font-bold transition hover:bg-white/20"
            >
              View Deals
            </Link>
            <Link
              href="/sign-up"
              className="bg-accent text-primary px-6 py-3 rounded-full text-sm font-bold transition hover:bg-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
            >
              Sign up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-accent text-primary p-1 rounded-md">
              <span className="material-symbols-outlined text-lg">flight_takeoff</span>
            </div>
            <span className="font-bold text-lg">FlyHigher</span>
          </div>
          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <a
              className="hover:text-white transition flex items-center gap-2"
              href="mailto:booking@flyhigher.com"
            >
              <span className="material-symbols-outlined text-sm">email</span>
              booking@flyhigher.com
            </a>
            <a
              className="hover:text-white transition flex items-center gap-2"
              href="tel:+016075550123"
            >
              <span className="material-symbols-outlined text-sm">phone</span>
              +01 607 555-0123
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
            Explore
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/destinations" className="hover:text-accent transition">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/available-flights" className="hover:text-accent transition">
                Airlines
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Hotels
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Car Rentals
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
            Support
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/support" className="hover:text-accent transition">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Cancellations
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Baggage Rules
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Travel Safety
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <Link href="/about" className="hover:text-accent transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-accent transition">
                Press
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          © 2024 FlyHigher. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
