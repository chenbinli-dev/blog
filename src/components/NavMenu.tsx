import menu2 from '@iconify/icons-tabler/menu-2';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';

interface Props {
  pathname: string;
}
const menu = [
  {
    title: 'Blogs',
    url: '/blogs'
  },
  {
    title: 'Tags',
    url: '/tags'
  }
];
const NavMenu: React.FC<Props> = ({ pathname }) => {
  const [show, setShow] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const openMenu = () => {
    setShow((state) => !state);
  };
  const handleClick = () => {
    setShow(false);
  };
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target !== menuContainerRef.current) {
        setShow(false);
      }
    };
    if (maskRef.current) {
      maskRef.current.addEventListener('click', handleClick);
    }
    return () => {
      if (maskRef.current) {
        maskRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);
  return (
    <>
      <button
        title="menu"
        aria-label="Menu"
        className={`cursor-pointer hover:scale-110 hover:text-primary max-md:absolute max-md:right-20 max-md:block md:hidden dark:text-slate-300`}
        onClick={openMenu}
      >
        <Icon icon={menu2} fontSize={20} />
      </button>
      <div
        ref={maskRef}
        className={`absolute left-0 right-0 top-0 z-[990] mt-[64px] h-full w-full opacity-40 transition-all duration-300 ease-in-out max-md:bg-black ${
          show ? 'block animate-in fade-in' : 'hidden animate-out fade-out'
        }`}
      ></div>
      <nav
        ref={menuContainerRef}
        className={`flex gap-8 max-md:absolute max-md:right-0 max-md:top-0 max-md:z-[999] max-md:mt-[64px] max-md:flex max-md:h-full max-md:flex-col max-md:gap-2 max-md:overflow-hidden max-md:bg-slate-800 max-md:text-white max-md:duration-500 ${
          show ? 'max-md:w-1/2' : 'max-md:w-0'
        }`}
      >
        {menu.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className={`hover:text-primary max-md:flex max-md:justify-center max-md:p-4 max-md:hover:bg-slate-300 max-md:focus:bg-slate-300 ${
              pathname.includes(item.url)
                ? 'underline decoration-primary decoration-wavy underline-offset-4 max-md:bg-slate-300 max-md:decoration-transparent'
                : ''
            }`}
            onClick={handleClick}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
};
export default NavMenu;
