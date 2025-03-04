import { useState } from 'react';

const History = () => {
    const [searchHistory, setSearchHistory] = useState(() => {
        return JSON.parse(localStorage.getItem("searchHistory") || "[]"); // Load local storage only once
    });
    const [visibleCount, setVisibleCount] = useState(10);

    const showMore = () => {
        setVisibleCount(prev => prev + 10);
    };

    return (
        <div className="p-4" style={{ marginTop: "25%" }}>
            <h1 className="text-xl font-bold mt-4">Search History</h1>
            {searchHistory.length === 0 ? (
                <p>No search history found.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {searchHistory.slice(0, visibleCount).map((search, index) => (
                        <li key={index} className="mb-2">{search.query} - {new Date(search.timestamp).toLocaleString()}</li>
                    ))}
                </ul>
            )}
            {visibleCount < searchHistory.length && (
                <button onClick={showMore} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Show More
                </button>
            )}
        </div>
    );
};

export default History;