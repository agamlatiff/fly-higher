"use client";

import type { ActionResult } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";
import { signUpUser } from "../lib/actions";

const initialState: ActionResult = {
  errorTitle: null,
  errorDesc: [],
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-4 w-full h-11 rounded-lg bg-accent hover:bg-sky-400 text-primary text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-200 transform active:scale-[0.99] shadow-[0_4px_14px_0_rgba(56,189,248,0.39)] hover:shadow-[0_6px_20px_rgba(56,189,248,0.23)] flex items-center justify-center gap-2 disabled:opacity-50"
    >
      <span>{pending ? "Creating..." : "Create Account"}</span>
      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  );
};

const FormSignUp = () => {
  const [state, formState] = useFormState(signUpUser, initialState);

  return (
    <form action={formState} className="flex flex-col gap-5">
      {/* Error Message */}
      {state.errorTitle !== null && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 w-full p-4 rounded-lg text-red-600 dark:text-red-400">
          <div className="text-sm font-bold mb-1 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            {state.errorTitle}
          </div>
          <ul className="list-disc list-inside text-sm">
            {state.errorDesc?.map((e: string, index: number) => (
              <li key={index}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TODO: Social Signup - Enable when OAuth is configured */}
      {/* 
      <div className="grid grid-cols-2 gap-3">
        <button type="button" className="...">Google</button>
        <button type="button" className="...">Apple</button>
      </div>
      <div className="relative flex py-1 items-center">
        <div className="flex-grow border-t border-gray-100 dark:border-gray-700" />
        <span className="...">Or sign up with email</span>
        <div className="flex-grow border-t border-gray-100 dark:border-gray-700" />
      </div>
      */}

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Name and Passport Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="group">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none group-focus-within:text-accent transition-colors">
                person
              </span>
              <input
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-gray-900 dark:text-white text-sm font-medium transition-all placeholder:text-gray-400/70"
                id="name"
                name="name"
                placeholder="John Doe"
                type="text"
                required
              />
            </div>
          </div>
          <div className="group">
            <label
              className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1"
              htmlFor="passport"
            >
              Passport No.
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none group-focus-within:text-accent transition-colors">
                badge
              </span>
              <input
                className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-gray-900 dark:text-white text-sm font-medium transition-all placeholder:text-gray-400/70"
                id="passport"
                name="passport"
                placeholder="A12345678"
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none group-focus-within:text-accent transition-colors">
              mail
            </span>
            <input
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-gray-900 dark:text-white text-sm font-medium transition-all placeholder:text-gray-400/70"
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="group">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 ml-1"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-gray-400 text-[20px] pointer-events-none group-focus-within:text-accent transition-colors">
              lock
            </span>
            <input
              className="w-full h-11 pl-10 pr-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none text-gray-900 dark:text-white text-sm font-medium transition-all placeholder:text-gray-400/70"
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
            />
          </div>
        </div>
      </div>

      <SubmitButton />
    </form>
  );
};

export default FormSignUp;
