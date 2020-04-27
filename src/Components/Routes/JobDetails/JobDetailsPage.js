import React, { Fragment, useState } from "react";
import JobInformation from "./JobInformation";
import MilestonesList from "../../Milestones/MilestonesList";
import Button from "../../Common/Button/Button";
import TabStrip from "../../Common/TabStrip/TabStrip";
import Discussions from "./Discussions";
import Applications from "./Applications";
import { withRouter, Redirect } from "react-router";
import { Route } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import WorkingUsers from "./WorkingUsers";
import { useQuery } from "@apollo/client";
import { GET_JOB_TABS } from "../../../queries";
import { connect } from "react-redux";
import { DELETE_JOB } from "../../../mutations";
import { useMutation } from '@apollo/client';

const JobDetailsPage = (props) => {
    
    const initialState = {
        isEditMode: true,
        jobId: props.match.params.id,
    }

    const [ state, setState ] = useState(initialState)

    // ToDo implement this function 
    const applyToJobClickHandler = () => {    }
    // ToDo implement Modal for getting password
    const deleteJobHandler = () => {
        let confirmed = window.confirm("Are you sure you want to delete this job? Note: all the associated milestones, discussions and applications will be lost.");
        if(confirmed) {
            deleteJobMutation({
                variables:{
                    jobId: state.jobId
                }
            }).then(
                res => console.log(res),
                err => console.log(err)
            );
        }
    }   

    const [deleteJobMutation, {mutationLoading, mutationError}] = useMutation(DELETE_JOB);
    if(mutationLoading) return <p>Loading...</p>;
    if(mutationError) return <p>Mutation Error! {mutationError}</p>;

    const { loading, error, data } = useQuery(GET_JOB_TABS, { variables: { jobId: state.jobId } });
    if (loading) return "Loading...";
    else if (error) alert(`Error! ${error.message}`);

    const userActions = [
        (<Button type="primary" label="Apply to Job"
            key="applyjob"
            className=" w-auto mr-4 "
        />),
        /* Functionality to be added in version 2
        (<Button type="secondary" label="Apply to Milestones"
            className=" w-auto mr-4 "
            key="applyMilestone"
        />),
            */
    ];

    const authorActions = [
        (<Button type="secondary" label="Edit Job"
            key="editjob"
            className=" w-auto mr-4 "
        />),
        (<Button type="error" label="Delete Job"
            className=" w-auto mr-4 "
            key="deletejob"
            onClick={deleteJobHandler}
        />),
    ];

    const tabList = [
        {
            title: "Milestones",
            location: "milestones",
            count: data.Job.milestones.totalCount ? data.Job.milestones.totalCount : 0,
        },
        {
            title: "Discussions",
            location: "discussions",
            count: data.Job.discussion.totalCount ? data.Job.discussion.totalCount : 0,
        },
        {
            title: "Applications",
            location: "applications",
            count: data.Job.applications.pendingCount ? data.Job.applications.pendingCount : 0,
            notify: true
        },
        {
            title: "Currently Working",
            location: "working",
            count: data.Job.applications.acceptedCount ? data.Job.applications.acceptedCount : 0,
        }
    ];


    return (
        <Fragment>
            <div className="px-4 pb-24 max-w-screen-lg mx-auto lg:px-10">
                <button onClick={() => {props.history.goBack();}} className="flex  py-4">
                    <ArrowLeft /> 
                    <p className="px-4">Back</p>
                </button>
                < JobInformation jobId = {state.jobId} />
                <TabStrip tabs = { tabList } />
                {
                    location.pathname === ("/jobDetails/"+state.jobId)?<Redirect to={props.match.url + "/milestones"} />: "" 
                }
                <Route exact path = {props.match.url + "/milestones"} component = {(props) => <MilestonesList jobId = {state.jobId}/>} />
                <Route exact path = {props.match.url + "/discussions"} component = {(props) => <Discussions jobId = {state.jobId}/>} />
                <Route exact path = {props.match.url + "/applications"} component = {(props) => <Applications jobId = {state.jobId}/>} />
                <Route exact path={props.match.url + "/working"} component={(props) => <WorkingUsers jobId = {state.jobId}/>} />
            </div>
            <div className="sticky bottom-0 bg-white">
                <hr/>
                <div className="px-4 flex flex-wrap-reverse items-center max-w-screen-lg mx-auto py-4 lg:px-10">
                    <div className="flex">
                        { props.user.id == data.Job.createdBy.id ? authorActions : userActions}
                    </div>
                    <div>
                        {/* <p className="text-sm font-semibold text-nebula-blue">This title</p>
                        <p className="text-sm font-semibold text-nebula-grey-600">This subtitle</p> */}
                    </div>  
                </div>
            </div>
        </Fragment>
    );
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(JobDetailsPage));