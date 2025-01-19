import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useSearchParams } from "react-router-dom";

function PaginationComponent() {
  const [comments, setComments] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get("current")
    ? parseInt(searchParams.get("current"))
    : 1;
  const limit = searchParams.get("limit")
    ? parseInt(searchParams.get("limit"))
    : 5;

  useEffect(() => {
    axios
      .get(
        `https://jsonplaceholder.typicode.com/comments?_page=${current}&_limit=${limit}`
      )
      .then((response) => {
        if (response.status === 200) {
          setComments(response.data);
        }
      })
      .catch((error) => {
        console.log(error)        
      })
  }, [searchParams, current, limit]);

  function handlePaginate(event, value) {
    setSearchParams({ current: value, limit });
  }
  function handleChange(event) {
    setSearchParams({ current: 1, limit: event.target.value });
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex flex-wrap gap-6 mb-8">
      {comments.length > 0 &&
        comments.map((comment, index) => {
          return (
            <div key={index} className="w-[389px] p-4 mb-4 border rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-2">{comment.name}</h2>
              <p className="text-gray-700">{comment.body}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Pagination
          onChange={handlePaginate}
          count={20}
          variant="outlined"
          color="primary"
          page={current}
          className="mt-4"
        />
        <FormControl>
          <InputLabel id="demo-simple-select-label">Limit</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={limit}
            label="limit"
            onChange={handleChange}
            className="mb-4 p-0 border rounded-md"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default PaginationComponent;
