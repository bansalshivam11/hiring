import React, { useState, useEffect } from "react";

import { Pagination, Table } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import JobServiceData from "../../API/DashboardRestService";
import Button from "react-bootstrap/Button";

function Dashboard() {
  // Fetch notes when component mounts or token changes
  const [jobreq, setJobreq] = useState([
    {
      jobReqId: 101,
      title: "Software Engineer",
      department: "Engineering",
      location: "Remote",
      status: "Open",
      postedDate: "2024-09-01",
      jobType: "Full-time",
    },
    {
      jobReqId: 103,
      title: "UX Designer",
      department: "Design",
      location: "San Francisco, CA",
      status: "Open",
      postedDate: "2024-09-10",
      jobType: "Contract",
    },
    {
      jobReqId: 104,
      title: "Data Analyst",
      department: "Analytics",
      location: "Austin, TX",
      status: "Open",
      postedDate: "2024-09-05",
      jobType: "Full-time",
    },
    {
      jobReqId: 105,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      status: "Open",
      postedDate: "2024-08-28",
      jobType: "Full-time",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const history = useNavigate();
  const itemsPerPage = 25; // Items per page

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Handle pagination changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const formatHeaderName = (header) => {
    // Remove the "Is" prefix, replace underscores with spaces, and insert spaces between lowercase and uppercase letters
    return header
      .replace(/^Is/, "") // Remove "Is" prefix
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space between lowercase and uppercase letters
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
  };

  // Get the data for the current page
  const currentPageData = jobreq.slice(startIndex, endIndex);

  return (
    <div className="main-container" style={{ padding: "5px" }}>
      <h3 style={{ marginBottom: "20px", color: "#343a40", fontSize: "15px" }}>
        Job Requisition Data
      </h3>

      {/* Display the data in table format */}
      <Table
        responsive
        // style={{
        //   borderCollapse: "collapse",
        //   width: "100%",
        //   border: "1px solid #ddd",
        //   fontSize: "12px",
        // }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th
              style={{
                padding: "5px",
                borderBottom: "1px solid #dee2e6",
                whiteSpace: "nowrap",
              }}
            >
              #
            </th>
            {currentPageData.length > 0 &&
              Object.keys(currentPageData[0]).map((key, index) => (
                <th
                  key={index}
                  style={{
                    padding: "5px",
                    borderBottom: "1px solid #dee2e6",
                    whiteSpace: "nowrap",
                  }}
                >
                  {formatHeaderName(key)}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {/* Generate the rows from the form data */}
          {currentPageData.map((data, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "5px", textAlign: "left" }}>
                {startIndex + rowIndex + 1}
              </td>
              {Object.keys(data).map((key, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    padding: "5px",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                  }}
                >
                  {/* Use a Link component for requisition_id */}
                  {key === "jobReqId" ? (
                    <Link
                      to={`/jobreq/${data[key]}`}
                      style={{ textDecoration: "none", color: "#007bff" }}
                    >
                      {data[key]}
                    </Link>
                  ) : (
                    data[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination controls */}
      {/* <Pagination>
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {Array.from({ length: Math.ceil(jobreq.length / itemsPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(jobreq.length / itemsPerPage)}
        />
        <Pagination.Last
          onClick={() =>
            handlePageChange(Math.ceil(jobreq.length / itemsPerPage))
          }
          disabled={currentPage === Math.ceil(jobreq.length / itemsPerPage)}
        />
      </Pagination> */}
      <div className="mb-2">
        <Button
          style={{ marginTop: "0" }}
          variant="primary"
          size="lg"
          onClick={()=>{history('/HiringPage')}}
        >
          Internal Hiring
        </Button>{" "}
        <Button
          style={{ align: "right" }}
          variant="secondary"
          size="lg"
          onClick={()=><Link to={"./HiringPage"}></Link>}
        >
          External Hiring
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
