import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import JobCard from "./components/JobCard";
import jobData from "./JobDummyData";
import { useState, useEffect } from "react";

function App() {
  const [jobs, setJobs] = useState([]);
  const [customSearch, setCustomSearch] = useState(false);

  const fetchJobs = () => {
    setCustomSearch(false);
    setJobs(
      jobData.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
    );
  };

  const fetchJobsCustom = (jobCriteria) => {
    setCustomSearch(true);
    const filteredJobs = jobData.filter((job) => {
      const matchesType = job.type.toLowerCase() === jobCriteria.type.toLowerCase();
      const matchesTitle = job.title.toLowerCase() === jobCriteria.title.toLowerCase();
      const matchesExperience = job.experience.toLowerCase() === jobCriteria.experience.toLowerCase();
      const matchesLocation = job.location.toLowerCase() === jobCriteria.location.toLowerCase();
      
      console.log(`Filtering job ID ${job.id}:`, {
        matchesType,
        matchesTitle,
        matchesExperience,
        matchesLocation,
      });

      return matchesType && matchesTitle && matchesExperience && matchesLocation;
    });

    if (filteredJobs.length === 0) {
      console.log("No jobs found matching the criteria:", jobCriteria);
    }

    setJobs(
      filteredJobs.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn))
    );
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom} />
      {customSearch && (
        <button onClick={fetchJobs} className="flex pl-[1250px] mb-2">
          <p className="bg-blue-500 px-10 py-2 rounded-md text-white">Clear Filters</p>
        </button>
      )}
      {jobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  );
}

export default App;
