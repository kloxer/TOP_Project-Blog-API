function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-gray-900">
          © {year} Jon.
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/kloxer/TOP_Project-Blog-API"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 transition"
            aria-label="Visit project on GitHub"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .297a12 12 0 00-3.797 23.402c.6.11.82-.26.82-.577v-2.165c-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.834 2.807 1.304 3.492.997.108-.775.42-1.304.763-1.605-2.665-.305-5.467-1.333-5.467-5.931 0-1.311.469-2.381 1.236-3.222-.124-.303-.536-1.525.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 016.003 0c2.29-1.552 3.297-1.23 3.297-1.23.655 1.651.243 2.873.12 3.176.77.841 1.235 1.911 1.235 3.222 0 4.61-2.807 5.624-5.48 5.921.43.372.814 1.102.814 2.222v3.293c0 .32.218.694.825.576A12 12 0 0012 .297z" />
            </svg>
            <span>GitHub</span>
          </a>

          
        </div>
      </div>
    </footer>
  );
}

export default Footer;