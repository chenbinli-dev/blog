import type { PostFrontmatter } from '@/content/_schema'
import Fuse from 'fuse.js'
import { useMemo, useState, type ChangeEvent, useRef, useEffect } from 'react'
import dayjs from 'dayjs'
import { Icon } from '@iconify/react'
import calendarIcon from '@iconify/icons-tabler/calendar'
import searchIcon from '@iconify/icons-tabler/search'
export type SearchItem = {
  title: string
  description?: string
  collection: string
  slug: string
  data: PostFrontmatter
}
interface SearchResult {
  item: SearchItem
  refIndex: number
}
interface Props {
  show: boolean
  closeModal: () => void
  searchContentList: SearchItem[]
}
const SearchPanel = ({ searchContentList, show, closeModal }: Props) => {
  const [input, setInput] = useState<string>('')
  const [searchResult, setSearchResult] = useState<SearchResult[]>([])
  const modalContainerRef = useRef<HTMLDivElement | null>(null)
  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const fuse = useMemo(
    () =>
      new Fuse(searchContentList, {
        keys: ['title', 'description'],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      }),
    [searchContentList]
  )
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    const result = fuse.search(e.target.value)
    console.log(result)
    setSearchResult(result)
  }
  const handleLinkClick = () => {
    setInput('')
    closeModal()
  }
  // Close modal when click target is not modal content
  window.onclick = (e) => {
    if (e.target === modalContainerRef.current) {
      setInput('')
      closeModal()
    }
  }
  useEffect(() => {
    show && searchInputRef.current?.focus()
  }, [show])
  return (
    <div
      ref={modalContainerRef}
      id="modal-container"
      className={`fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-40 ${
        show ? 'block' : 'hidden'
      }`}
    >
      <div id="modal" className="container mx-auto max-w-4xl bg-white mt-16 rounded p-4 space-y-4">
        <div className="border-2 border-pink-500 rounded p-2 flex items-center gap-2">
          <Icon icon={searchIcon} fontSize={20} />
          <input
            ref={searchInputRef}
            name="search-input"
            type="text"
            className="border-none outline-none focus:outline-none w-full"
            value={input}
            onChange={handleInput}
          />
        </div>
        <ul className="flex flex-col gap-2">
          {searchResult.length > 0 ? (
            searchResult.map(({ item, refIndex }) => (
              <a key={refIndex} href={`/${item.collection}/${item.slug}`} onClick={handleLinkClick}>
                <div className="space-y-1 border-2 border-dashed p-2 rounded hover:border-pink-500 cursor-pointer">
                  <div
                    title={item.title}
                    className="italic cursor-pointer"
                    dangerouslySetInnerHTML={{
                      __html: item.title.replaceAll(
                        new RegExp(input, 'gi'),
                        (match) => `<em class="highlight">${match}</em>`
                      ),
                    }}
                  ></div>
                  <div className="flex items-center gap-2 text-sm opacity-50">
                    <Icon icon={calendarIcon} fontSize={18} />
                    <span>{dayjs(item.data.pubDateTime).format('YYYY-MM-DD')}</span>
                  </div>
                  <p className="text-base">{item.description || 'no description'}</p>
                </div>
              </a>
            ))
          ) : (
            <p>No records</p>
          )}
        </ul>
      </div>
    </div>
  )
}
export default SearchPanel
