import React, { useState, useEffect } from 'react';
import { listApplications } from "../../api/applications";
import { ApplicationCard } from "../../components/applications/ApplicationCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "../../components/shared/Button";
import "./ListStyle.css";


export const ApplicationListPage = () => {
    const [applications, setApplications] = useState([]);
    const [searchStatus, setSearchStatus] = useState('nothing');
    const [sortBy, setSortBy] = useState('nothing');
    const [prevPage, setPrevPage] = useState(null);
    const [nextPage, setNextPage] = useState(null);

    const getApplications = async () => {
      try {
        const response = await listApplications(searchStatus, sortBy, undefined);
        setApplications(response["results"]);
        setPrevPage(response["previous"]);
        setNextPage(response["next"]);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
      };

    const handleLoadPrev = async (event) => {
      const response = await listApplications(searchStatus, sortBy, prevPage);
      setApplications(response["results"]);
      setPrevPage(response["previous"]);
      setNextPage(response["next"]);
    };

    const handleLoadNext = async (event) => {
      const response = await listApplications(searchStatus, sortBy, nextPage);
      setApplications(response["results"]);
      setPrevPage(response["previous"]);
      setNextPage(response["next"]);
    };

    useEffect(() => {
      getApplications();
    }, [searchStatus, sortBy]);
    
  
    const handleSearchStatusChange = (event) => {
      setSearchStatus(event.target.value);
    };
  
    const handleSortByChange = (event) => {
      setSortBy(event.target.value);
    };
  
    return (
      <main id="page" className="d-flex flex-column mx-4 py-4">
        <div id="search-results" className="my-4">
          <Row className="pt-4">
            <Col className="text-center">
            <label htmlFor="searchStatus">Search Status:</label>
            <select id="searchStatus" value={searchStatus} onChange={handleSearchStatusChange}>
              {/* Dropdown options */}
              <option value="nothing">All</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="denied">Denied</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
            <br/>

            <label htmlFor="sortBy">Sort By:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
              {/* Dropdown options */}
              <option value="nothing">Default</option>
              <option value="updated_at">Update Time</option>
              <option value="created_at">Create Time</option>
              {/* Add more options as needed */}
            </select>
            </Col>
          </Row>
  
          <div className="large-text text-center p-md-5 p-sm-3">
            Submitted Applications
          </div>
          <Row xs={1} md={2} lg={3} className="justify-content-center">
          {applications.length === 0 ? (
            <div className="text-center">
              <p>No applications to display.</p>
            </div>
          ) : (
            // Display applications
            applications.map((application) => (
              <Col key={application.id} className="mb-4">
                <ApplicationCard applicationID={application.id} />
              </Col>
            ))
          )}
        </Row>
          <Row className="pt-4">
            <Col className="text-center">
              <Button
                onClick={(event) => handleLoadPrev(event)}
                variant="primary"
                disabled={!prevPage}
                text="Previous"
                className="custom-button"
              />
              <Button
                onClick={(event) => handleLoadNext(event)}
                disabled={!nextPage}
                variant="primary"
                text="Next"
                className="custom-button"
              />
            </Col>
          </Row>
        </div>
      </main>
    );
  };
  