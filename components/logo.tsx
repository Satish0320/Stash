export function Logo({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Abstract 'S' formed by two box-like shapes */}
      <path
        d="M7 6H17C18.1046 6 19 6.89543 19 8V11C19 12.1046 18.1046 13 17 13H7C5.89543 13 5 13.8954 5 15V18C5 19.1046 5.89543 20 7 20H19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-blue-600 dark:text-blue-500"
      />
      <path
        d="M5 4V10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-slate-900 dark:text-white"
      />
      <path
        d="M19 14V20"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="text-slate-900 dark:text-white"
      />
    </svg>
  );
}