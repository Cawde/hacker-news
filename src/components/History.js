import "./History.css";
const History = ({ keywords, history }) => {
  return (
    <div className="history-page">
      <h1 className="history-header">Here's your search history</h1>
      <div className="term-history-container">
        {keywords
          ? [...keywords].filter((keyword) => keyword !== "").map((keyword, index) => {
              return (
                <div key={index}>
                  <div className="keyword-entry">
                    <p>{keyword}</p>
                    <p>
                      Links clicked using{" "}"{keyword}"
                    </p>
                  </div>
                  <div className="history-container">
                    {history
                      ? history
                          .filter((entry) => entry.term === keyword)
                          .map((entry, index) => {
                            return (
                              <div className="history-entry" key={index}>
                                <div>
                                  <a href={entry.url} target="_blank" rel="noreferrer">{entry.url}</a>
                                </div>
                              </div>
                            );
                          })
                      : "There's nothing in your history at the moment"}
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default History;
