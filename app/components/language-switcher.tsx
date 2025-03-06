import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const languages = [
  { value: 'en', label: 'English', flag: 'https://flagcdn.com/32x24/gb.png' },
  { value: 'fr', label: 'Français', flag: 'https://flagcdn.com/32x24/fr.png' },
];

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Déterminer la langue actuelle à partir du chemin
  const segments = pathname.split('/');
  const currentLangValue = (segments[1] === 'en' || segments[1] === 'fr') ? segments[1] : 'en';
  const currentLang = languages.find(lang => lang.value === currentLangValue) || languages[0];

  const changeLanguage = (lng: string) => {
    const segments = pathname.split('/');
    if (segments[1] === 'en' || segments[1] === 'fr') {
      segments[1] = lng;
    } else {
      segments.splice(1, 0, lng);
    }
    router.push(segments.join('/'));
    setIsOpen(false);
  };

  // Fermer le menu déroulant si l'utilisateur clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        type="button"
        className="inline-flex items-center rounded-md transition-colors bg-indigo-700 hover:bg-indigo-600 px-2 py-1 text-sm text-white focus:ring-2 focus:ring-indigo-600"
        aria-haspopup="true"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <Image
          src={currentLang.flag}
          alt={currentLang.label}
          width={32}
          height={24}
          className="w-5 h-auto mr-2"
        />
        <span>{currentLang.label}</span>
        <svg
          className="ml-2 h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 9.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <ul
          className="absolute top-full right-0 mt-1 w-40 origin-top-right rounded-md bg-white shadow-lg ring-opacity-5 focus:outline-none z-10"
          role="listbox"
          aria-labelledby="listbox-label"
        >
          {languages.map((lang, index) => (
            <li key={index}>
              <button
                type="button"
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white 
                  ${lang.value === currentLang.value ? 'font-semibold text-indigo-600' : 'text-gray-900'}
                  ${index === 0 ? "rounded-t-md" : ""}
                  ${index === languages.length - 1 ? "rounded-b-md" : ""}
                `}
                onClick={() => changeLanguage(lang.value)}
              >
                <Image
                  src={lang.flag}
                  alt={lang.label}
                  width={32}
                  height={24}
                  className="w-5 h-auto mr-2"
                />
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
