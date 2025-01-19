import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

function ScrollPagination() {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=5`)
    .then((response) => {
        if (response.status === 200) {
          setComments(prevComments => [...prevComments, ...response.data])
        }
    })
    .catch((error) => {
        console.log(error)        
    })

  }, [page]);

  const lastCommentRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {comments.length > 0 &&
        comments.map((comment, index) => {
          if (index === comments.length - 1) {
            return (
              <div
                ref={lastCommentRef}
                key={index}
                className="p-4 mb-4 border rounded-md shadow-md"
              >
                <h2 className="text-xl font-semibold mb-2">{comment.name}</h2>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="p-4 mb-4 border rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-2">{comment.name}</h2>
                <p className="text-gray-700">{comment.body}</p>
              </div>
            );
          }
        })}
    </div>
  );
}

export default ScrollPagination;
