import { Icon } from '@iconify/react';
import arrowBigUp from '@iconify/icons-tabler/arrow-big-up';
import { useEffect, useMemo, useState } from 'react';
const BackToTop = () => {
  const [isShow, setIsShow] = useState(false);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 800) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <button
      id="back-to-top"
      aria-label="Back to Top"
      className={`fixed bottom-10 right-40 rounded-full border-2 border-dashed bg-slate-200 p-2 hover:border-pink-500 hover:text-pink-500 dark:bg-slate-800 max-md:hidden ${
        isShow ? 'visible' : 'invisible'
      }`}
      onClick={handleClick}
    >
      <Icon icon={arrowBigUp} fontSize={20} />
    </button>
  );
};
export default BackToTop;
