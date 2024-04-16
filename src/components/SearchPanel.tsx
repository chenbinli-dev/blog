import type { PostFrontmatter } from '@/content/_schema';
import calendarIcon from '@iconify/icons-tabler/calendar';
import searchIcon from '@iconify/icons-tabler/search';
import { Icon } from '@iconify/react';
import dayjs from 'dayjs';
import Fuse from 'fuse.js';
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
export type SearchItem = {
  title: string;
  description?: string;
  collection: string;
  slug: string;
  data: PostFrontmatter;
};
interface SearchResult {
  item: SearchItem;
  refIndex: number;
}
interface Props {
  show: boolean;
  closeModal: () => void;
  searchContentList: SearchItem[];
}
const SearchPanel = ({ searchContentList, show, closeModal }: Props) => {
  const [input, setInput] = useState<string>('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const fuse = useMemo(
    () =>
      new Fuse(searchContentList, {
        keys: ['title', 'description'],
        includeMatches: true,
        threshold: 0.3,
        includeScore: false,
        shouldSort: true,
        minMatchCharLength: 2
      }),
    [searchContentList]
  );
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const result = fuse.search(e.target.value);
    setSearchResult(result);
  };
  const handleLinkClick = () => {
    setInput('');
    setSearchResult([]);
    closeModal();
  };
  // Close modal when click target is not modal content
  window.onclick = (e) => {
    if (e.target === modalContainerRef.current) {
      setInput('');
      setSearchResult([]);
      closeModal();
    }
  };
  useEffect(() => {
    show && searchInputRef.current?.focus();
  }, [show]);
  return (
    <div
      ref={modalContainerRef}
      id="modal-container"
      className={`fixed left-0 top-0 z-10 h-full w-full overflow-auto bg-black bg-opacity-40 dark:bg-opacity-10 ${
        show ? 'visible' : 'invisible'
      }`}
    >
      <div
        id="modal"
        className={`container mx-auto mt-16 max-w-4xl space-y-4 rounded bg-white p-4 duration-300 dark:bg-slate-700 ${
          show
            ? 'animate-in slide-in-from-bottom'
            : 'animate-out fade-out-0 slide-out-to-top'
        }`}
      >
        <div className="flex items-center gap-2 rounded border-2 border-primary p-2">
          <Icon icon={searchIcon} fontSize={20} />
          <input
            ref={searchInputRef}
            name="search-input"
            type="text"
            className="w-full border-none bg-transparent outline-none focus:outline-none dark:text-white"
            value={input}
            onChange={handleInput}
            placeholder="Please enter two characters at least."
          />
        </div>
        <ul className="flex flex-col gap-2">
          {searchResult.length > 0 ? (
            searchResult.map(({ item, refIndex }) => (
              <a
                key={refIndex}
                href={`/${item.collection}/${item.slug}`}
                onClick={handleLinkClick}
              >
                <div className="cursor-pointer space-y-1 rounded border-2 p-2 hover:border-primary">
                  <div
                    title={item.title}
                    className="cursor-pointer italic"
                    dangerouslySetInnerHTML={{
                      __html: item.title.replaceAll(
                        new RegExp(input, 'gi'),
                        (match) => `<em class="highlight">${match}</em>`
                      )
                    }}
                  ></div>
                  <div className="flex items-center gap-2 text-sm opacity-50">
                    <Icon icon={calendarIcon} fontSize={18} />
                    <span>
                      {dayjs(item.data.pubDateTime).format('YYYY-MM-DD')}
                    </span>
                  </div>
                  <p className="text-base">
                    {item.description || 'no description'}
                  </p>
                </div>
              </a>
            ))
          ) : (
            <p>No records</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default SearchPanel;
