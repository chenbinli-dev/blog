import moonIcon from '@iconify/icons-tabler/moon';
import sunIcon from '@iconify/icons-tabler/sun';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  // Change theme
  const handleSwitchTheme = (e: React.MouseEvent) => {
    // @ts-expect-error: View transition API
    if (!document.startViewTransition) {
      setIsDark((state) => !state);
      return;
    }
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerWidth - y)
    );
    let isDark: boolean;
    //@ts-ignore
    const transition = document.startViewTransition(() => {
      const root = document.documentElement;
      isDark = root.classList.contains('dark');
      setIsDark(!isDark);
      root.classList.remove(isDark ? 'dark' : 'light');
      root.classList.add(isDark ? 'light' : 'dark');
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath
        },
        {
          duration: 500,
          easing: 'ease-in-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)'
        }
      );
    });
  };
  useEffect(() => {
    // @ts-ignore
    // if current browser doesn't support the view transition api
    if (!document.startViewTransition) {
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);
  return (
    <button
      name="theme-switch"
      aria-label="Switch Theme"
      className="cursor-pointer hover:scale-110 hover:text-primary"
      onClick={handleSwitchTheme}
    >
      <Icon icon={isDark ? moonIcon : sunIcon} fontSize={20} />
    </button>
  );
};
export default ToggleTheme;
