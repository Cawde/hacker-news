//eslint-disable-line react-hooks/exhaustive-deps
import { useState, useEffect } from "react";
import moment from "moment";
import "./Search.css";

const Search = ({ history, setHistory, keywords }) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const getSearchResults = () => {
    keywords.add(searchTerm);
    fetch(
      `http://hn.algolia.com/api/v1/search?query=${searchTerm}&page=${
        pageNumber - 1
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setResults(data.hits);
      })
      .catch(console.error);
  };

  useEffect(() => {
    getSearchResults();
  }, [pageNumber]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-page">
      <div className="header-container">
        <h1 className="header">Welcome to Hacker News' Search Page</h1>
      </div>
      <div className="search-box">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getSearchResults();
          }}
        >
          <input
            type="text"
            placeholder="Search for listings here"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              getSearchResults();
            }}
          >
            Search
          </button>
        </form>
        <div className="pagination">
          {pageNumber > 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPageNumber(pageNumber - 1);
              }}
            >
              Previous
            </button>
          ) : null}

          {pageNumber < 50 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setPageNumber(pageNumber + 1);
              }}
            >
              Next
            </button>
          ) : null}
        </div>
      </div>
      <h2 className="page-number">Page Number {pageNumber}</h2>
      <div>
        {results
          ? results.map((result, index) => {
              return (
                <div className="search-results" key={index}>
                  <h1>{result.title}</h1>
                  <p>{moment(result.created_at).format("DD MMM, YYYY")}</p>
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setHistory([
                        ...history,
                        { term: searchTerm, url: result.url },
                      ]);
                    }}
                  >
                    {result.url}
                  </a>
                  <p>Poster: {result.author}</p>
                </div>
              );
            })
          : "There's no search results currently"}
      </div>
    </div>
  );
};

export default Search;
