import SearchPanel, { type SearchItem } from './SearchPanel';
import { Icon } from '@iconify/react';
import searchIcon from '@iconify/icons-tabler/search';
import { useState } from 'react';
interface Props {
  searchContentList: SearchItem[];
}
const SearchButton = ({ searchContentList }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  // Add keyboard listeners
  window.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      e.preventDefault();
      openModal();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  return (
    <div
      id="search-input"
      className="flex w-40 items-center cursor-pointer justify-between rounded-full border-2 bg-transparent px-2 py-1 dark:border-slate-300"
      onClick={openModal}
    >
      <Icon icon={searchIcon} fontSize={18} className="text-black" />
      <span className="rounded border-2 px-2 text-sm dark:border-slate-300">
        /
      </span>
      <SearchPanel
        searchContentList={searchContentList}
        show={show}
        closeModal={closeModal}
      />
    </div>
  );
};
export default SearchButton;
