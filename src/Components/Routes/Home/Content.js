import React, { useState }  from "react";
import JobList from "../../Jobs/JobList";
import OngoingJobsGrid from "../../Jobs/OngoingJobsGrid";
import { GET_ALL_JOBS_FILTER } from '../../../queries';
import { GET_USER_ONGOING_JOBS } from "../../../queries";
import { GET_USER_SKILLS } from "../../../queries"; 
import {useQuery} from "@apollo/react-hooks";
import {connect} from "react-redux";

const Content = (props) => {

    // const initialState = {
    //     skills:  ["nodejs", "spring", "react", "golang", "tableau"],
    //     sortOrder: "NEWEST",
    //     status: ["OPEN","ONGOING"],
    //     userSkills: false,
    // }

    // const [ state, setState ] = useState(initialState);
    
    const ongoingJobsVariables = { 
        userId: props.user.id
    }

    // if(!state.userSkills) {
    //     const {loading, error, data} = useQuery(GET_USER_SKILLS, { variables: {userId: props.user.id} });
    //     if (loading) return "Loading...";
    //     else if (error) return (`Error! ${error.message}`);
    //     else {
    //         setState({
    //             ...state,
    //             userSkills:true,
    //             skills: data.User.skills ? data.User.skills.map((skill, key) => skill.value) : [],
    //         })
    //     }
    // }

    const {loading, error, data} = useQuery(GET_USER_SKILLS, { variables: {userId: props.user.id} });
    if (loading) return "Loading...";
    else if (error) return (`Error! ${error.message}`);
    const exploreJobsFilter = { 
        "filter":{
            "status": ["OPEN","ONGOING"],
            // "skills": data.User.skills ? data.User.skills.map((skill, key) => skill.value) : [],
            "skills":  ["nodejs", "spring", "react", "golang", "tableau"],  
            "sortOrder": "NEWEST", 
        }
    }

    return (
        <div className="h-auto mt-4">
            <OngoingJobsGrid maxCount = {1} location = "home" title = "Ongoing Jobs" query = {GET_USER_ONGOING_JOBS} queryVariables = {ongoingJobsVariables} />
            <JobList title = "Explore Jobs" type = "exploreJobs" query = {GET_ALL_JOBS_FILTER} queryVariables = {exploreJobsFilter} />
        </div>
    );

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Content);