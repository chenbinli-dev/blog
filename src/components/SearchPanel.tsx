import type { PostFrontmatter } from '@/content/_schema';
import articleIcon from '@iconify/icons-tabler/article';
import deleteIcon from '@iconify/icons-tabler/backspace';
import searchIcon from '@iconify/icons-tabler/search';
import { Icon } from '@iconify/react';
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
  closeModal: () => void;
  searchContentList: SearchItem[];
}
const SearchPanel = ({ searchContentList, closeModal }: Props) => {
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
    setSearchResult(() => fuse.search(e.target.value));
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
  const handleClean = () => {
    if (input) {
      setInput('');
      setSearchResult([]);
    }
  };
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);
  return (
    <div
      ref={modalContainerRef}
      id="modal-container"
      className="fixed left-0 top-0 z-10 h-full w-full overflow-auto bg-black bg-opacity-40 dark:bg-opacity-10"
    >
      <div
        id="modal"
        className="container mx-auto mt-16 max-w-4xl space-y-4 rounded bg-white p-4 duration-300 dark:bg-slate-700"
      >
        <div className="flex items-center gap-2 rounded border-2 border-primary p-2">
          <Icon icon={searchIcon} fontSize={20} />
          <input
            ref={searchInputRef}
            name="search-input"
            type="text"
            autoFocus
            autoComplete="off"
            className="w-full border-none bg-transparent outline-none focus:outline-none dark:text-white"
            value={input}
            onChange={handleInput}
            placeholder="Search for..."
          />
          <Icon
            icon={deleteIcon}
            fontSize={20}
            className={input ? 'hover:scale-110' : 'opacity-50'}
            onClick={handleClean}
          />
        </div>
        {searchResult.length > 0 ? (
          <ul className="flex flex-col gap-2">
            {searchResult.map(({ item, refIndex }) => (
              <a
                key={refIndex}
                href={`/${item.collection}/${item.slug}`}
                onClick={handleLinkClick}
              >
                <div className="cursor-pointer items-center rounded border-2 p-2 hover:border-primary">
                  <div className="flex items-center gap-2">
                    <Icon icon={articleIcon} fontSize={20} />
                    <div
                      title={item.title}
                      className="cursor-pointer text-xl"
                      dangerouslySetInnerHTML={{
                        __html: item.title.replaceAll(
                          new RegExp(input, 'gi'),
                          (match) => `<span class="highlight">${match}</span>`
                        )
                      }}
                    ></div>
                  </div>
                  {item.description && (
                    <div
                      className="mt-2 text-sm"
                      dangerouslySetInnerHTML={{
                        __html: item.description.replaceAll(
                          new RegExp(input, 'gi'),
                          (match) =>
                            `<span class="highlight description">${match}</span>`
                        )
                      }}
                    ></div>
                  )}
                </div>
              </a>
            ))}
          </ul>
        ) : input !== '' ? (
          <div className="text-center">No results for "{input}"</div>
        ) : null}
      </div>
    </div>
  );
};
export default SearchPanel;
