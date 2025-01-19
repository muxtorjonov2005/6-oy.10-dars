import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function App() {
  const [comments, setComments] = useState([]);
  const [current, setCurrent] = useState(1);
  const [limit, setLimit] = useState(5);


  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${current}&_limit=${limit}`
      )
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
      });
  }, [current, limit]);

  function handlePaginate(event, current) {
    setCurrent(current);
  }
  function handleChange(event) {
    setLimit(event.target.value);
    setCurrent(current);
  }

  return (
    <div>
      {comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <div key={index} className="p-3 border rounded-md shadow-md">
              <h2>{comment.name}</h2>
              <p>{comment.body}</p>
            </div>
          );
        })}

      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="limit"
          onChange={handleChange}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>

      <Pagination
        onChange={handlePaginate}
        count={20}
        variant="outlined"
        color="primary"
      />
    </div>
  );
}

export default App;
