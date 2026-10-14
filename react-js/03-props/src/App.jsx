import React from 'react'
import Card from './components/Card'

const App = () => {

  const jobs = [
  {
    brandlogo: "https://logo.clearbit.com/google.com",
    company: "Google",
    datePosted: "4 days ago",
    post: "Frontend Developer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$45/hr",
    location: "Mumbai, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/apple.com",
    company: "Apple",
    datePosted: "1 week ago",
    post: "iOS Developer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$60/hr",
    location: "Bangalore, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/meta.com",
    company: "Meta",
    datePosted: "2 days ago",
    post: "React Developer",
    tag1: "Part Time",
    tag2: "Junior Level",
    pay: "$40/hr",
    location: "Remote"
  },
  {
    brandlogo: "https://logo.clearbit.com/amazon.com",
    company: "Amazon",
    datePosted: "10 days ago",
    post: "Backend Engineer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$70/hr",
    location: "Hyderabad, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/netflix.com",
    company: "Netflix",
    datePosted: "3 weeks ago",
    post: "UI Engineer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$65/hr",
    location: "Remote"
  },
  {
    brandlogo: "https://logo.clearbit.com/microsoft.com",
    company: "Microsoft",
    datePosted: "5 days ago",
    post: "Software Engineer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$50/hr",
    location: "Noida, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/tesla.com",
    company: "Tesla",
    datePosted: "1 month ago",
    post: "Full Stack Developer",
    tag1: "Full Time",
    tag2: "Senior Level",
    pay: "$75/hr",
    location: "Remote"
  },
  {
    brandlogo: "https://logo.clearbit.com/adobe.com",
    company: "Adobe",
    datePosted: "6 days ago",
    post: "UI/UX Developer",
    tag1: "Part Time",
    tag2: "Mid Level",
    pay: "$55/hr",
    location: "Delhi, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/uber.com",
    company: "Uber",
    datePosted: "2 weeks ago",
    post: "Android Developer",
    tag1: "Full Time",
    tag2: "Junior Level",
    pay: "$48/hr",
    location: "Mumbai, India"
  },
  {
    brandlogo: "https://logo.clearbit.com/airbnb.com",
    company: "Airbnb",
    datePosted: "8 days ago",
    post: "Product Engineer",
    tag1: "Full Time",
    tag2: "Mid Level",
    pay: "$62/hr",
    location: "Remote"
  }
];


  return (
    <div className="parent">
      {jobs.map(function(elem) {
        return <Card company={elem.company} datePosted = {elem.datePosted} post = {elem.post} tag1 = {elem.tag1} tag2 = {elem.tag2} pay = {elem.pay} location = {elem.location} />
      }
      )}
    </div>
  )
}

export default App
