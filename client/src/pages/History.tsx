import { useState } from "react";

interface SearchItem {
  query: string;
  date: string;
}

interface HistoryProps {
  searchHistory?: SearchItem[]; // ✅ Made optional with `?`
}

export default function History({ searchHistory = [] }: HistoryProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  return (
    <div>
      <h2>Search History</h2>
      {searchHistory.length === 0 ? (
        <p>No recent searches.</p>
      ) : (
        <ul>
          {searchHistory.slice(0, visibleCount).map((search: SearchItem, index: number) => (
            <li key={index}>
              <strong>{search.query}</strong> - {search.date}
            </li>
          ))}
        </ul>
      )}
      {searchHistory.length > visibleCount && (
        <button onClick={() => setVisibleCount(visibleCount + 5)}>Load more</button>
      )}
    </div>
  );
}