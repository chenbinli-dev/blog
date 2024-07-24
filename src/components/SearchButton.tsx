import searchIcon from '@iconify/icons-tabler/search';
import { Icon } from '@iconify/react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SearchPanel, { type SearchItem } from './SearchPanel';
interface Props {
  searchContentList: SearchItem[];
}
const SearchButton = ({ searchContentList }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const openModal = () => setShow(true);
  const closeModal = useCallback(() => setShow(false), []);

  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === '/') {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }, []);
  return (
    <div
      id="search-input"
      className="flex w-80 cursor-pointer hover:outline items-center justify-between rounded-full border-2 bg-transparent px-2 py-1 max-md:mx-auto dark:border-slate-300"
      onClick={openModal}
    >
      <Icon icon={searchIcon} fontSize={18} className="text-black" />
      <span className="rounded border-2 px-2 text-sm dark:border-slate-300">
        /
      </span>
      {show &&
        createPortal(
          <SearchPanel
            searchContentList={searchContentList}
            closeModal={closeModal}
          />,
          document.body
        )}
    </div>
  );
};
export default SearchButton;
