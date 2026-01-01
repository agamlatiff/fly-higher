import FormSignUp from "./_components/FormSignUp";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="w-full max-w-[1000px] bg-white dark:bg-surface-dark rounded-2xl shadow-card flex flex-col md:flex-row overflow-hidden border border-white/50 dark:border-white/5 md:min-h-[650px]">
      {/* Left Side - Image */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 relative bg-accent/5 dark:bg-accent/10 flex-col justify-between overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
        <div className="relative z-10 p-10 h-full flex flex-col justify-between">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
          </div>
          <div className="text-white space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/10 text-xs font-medium">
              <span className="material-symbols-outlined text-sm">rocket_launch</span>
              <span>Start Your Adventure</span>
            </div>
            <h3 className="text-3xl font-bold leading-tight tracking-tight">
              Join millions of travelers worldwide.
            </h3>
            <p className="text-white/80 font-medium leading-relaxed">
              Create your FlyHigher account and get access to exclusive deals,
              faster booking, and personalized recommendations.
            </p>
            <div className="flex gap-2 pt-2">
              <div className="w-2 h-1 bg-white/30 rounded-full" />
              <div className="w-8 h-1 bg-accent rounded-full" />
              <div className="w-2 h-1 bg-white/30 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-7/12 lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center h-full">
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center gap-2 mb-6 text-accent">
          <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">FlyHigher</span>
        </div>

        {/* Header */}
        <div className="space-y-2 mb-8">
          <h1 className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold">
            Create Account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">
            Sign up to start booking your flights with ease.
          </p>
        </div>

        {/* Form */}
        <FormSignUp />

        {/* Sign In Link */}
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link
              href="/sign-in"
              className="font-bold text-accent hover:text-sky-400 hover:underline transition-colors ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
