import React, { Component, useRef } from "react";
import "../../../../assets/style/tailwind.css";
import * as Icons from "react-feather";
import * as config from "../../../../assets/placeholder";
import { appName } from "../../../../assets/placeholder";
import { NavLink, withRouter } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import { actions } from "../../../reducers/JobFeedProvider/JobFeedProvider";
import {
    JobsFeedContext,
} from "../../../reducers/JobFeedProvider/JobFeedProvider";
import TextInput from "../../Common/InputFields/TextInput";
import ActionChip from "../../Common/Chips/ActionChip";

const Sidebar = (props) => {
    const [expansionState, changeExpansionStatus] = React.useState({ expanded: false });

    const mobileExpandCollapseSidebar = (value) => {
        const currentState = expansionState.expanded;
        changeExpansionStatus({
            expanded: value != null ? value : !currentState,
        });
    };


    return (

        <div className={"w-auto border-l-0 z-40 sticky top-0 text-black bg-white border-nebula-grey-400 border border-r-0 px-0 lg:z-10 lg:h-screen lg:border-r-1 lg:border-b-0 lg:border-t-0 lg:border-l-0 lg:w-84 xl:w-84"}>
            <div className="w-full h-12 lg:mt-6 flex items-center ">
                <NavLink
                    className="flex-1 text-xl pl-3 font-semibold hover:text-nebula-blue outline-none cursor-pointer"
                    to={"/"}>
                    {appName}
                </NavLink>
                <button className="lg:hidden focus:outline-none"
                    onClick={() => mobileExpandCollapseSidebar()}>
                    {
                        expansionState.expanded
                            ?
                            <Icons.X
                                className="h-5 w-5 text-nebula-blue stroke-current mr-4 " />
                            :
                            <Icons.Menu className="h-5 w-5 text-nebula-blue stroke-current mr-4 " />
                    }
                </button>
            </div>
            <div className={expansionState.expanded ? "block " : "hidden lg:block "}>
                <ul>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Compass />}
                            location="/"
                            label="Explore Jobs"
                            exactLink={true}
                        />
                    </li>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Activity />}
                            location="/yourJobs"
                            label="Your Applications"
                            exactLink={false}
                        />
                    </li>
                    <li>
                        <SidebarItem
                            onClick={() => mobileExpandCollapseSidebar(false)}
                            icon={<Icons.Edit3 />}
                            location="/manageJobs"
                            exactLink={false}
                            label="Created Jobs"
                        />
                    </li>
                </ul>
                <hr className="my-8" />
                <div>
                    {
                        window.location.pathname === "/" &&
                        <SidebarReactiveFilter />
                    }
                </div>
            </div>
        </div >
    );
};

const SidebarReactiveFilter = (props) => {
    const skillsFilterRef = useRef();

    const ctx = React.useContext(JobsFeedContext);
    const { state, dispatch } = ctx;
    const { skills, status } = state;


    const inputOnKeyDown = (e) => {
        if (e.keyCode === 13 && skillsFilterRef.current.value != "") {

            dispatch({ type: actions.ADD_SKILL, value: skillsFilterRef.current.value });
            skillsFilterRef.current.value = "";
        }
    };

    const removeSkill = (value) => dispatch({ type: actions.REMOVE_SKILL, value: value });

    const checkboxOnChange = (e) => {
        if (e.currentTarget.checked) {
            dispatch({ type: actions.ADD_STATUS, value: e.currentTarget.id });
        } else {
            dispatch({ type: actions.REMOVE_STATUS, value: e.currentTarget.id });
        }
    };

    const openChecked = status.includes("OPEN");
    const ongoingChecked = status.includes("ONGOING");
    const completedChecked = status.includes("COMPLETED");
    return (
        <div className="mx-4 bg-white border border-nebula-grey-400 rounded-lg">
            <h4 className="text-md font-semibold text-nebula-blue border-b border-gray-300 rounded-tl-lg rounded-tr-lg bg-white py-4 pl-4">Filters</h4>
            <div className="px-4 py-2">
                <h4 className="text-sm font-semibold text-nebula-grey-800 mt-4">Skills</h4>
                <TextInput className="w-full my-2" placeholder="Add job skill filters" forwardedRef={skillsFilterRef} onKeyDown={(e) => inputOnKeyDown(e)} />
                <div className="flex flex-row flex-wrap" >
                    {
                        skills.map((skill, key) => (<div key={key}>
                            {
                                <ActionChip
                                    key={key}
                                    id={key}
                                    label={skill}
                                    onClick={() => removeSkill(skill)}
                                    className="m-1 ml-0"
                                />
                            }
                        </div>))
                    }
                </div>
                <h4 className="text-sm font-semibold text-nebula-grey-800 mt-4">Job State</h4>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="OPEN" onChange={(e) => checkboxOnChange(e)} checked={openChecked} />
                    <label htmlFor="OPEN" className="ml-2">Open</label>
                </div>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="ONGOING" onChange={(e) => checkboxOnChange(e)} checked={ongoingChecked} />
                    <label htmlFor="ONGOING" className="ml-2">Ongoing</label>
                </div>
                <div className="flex items-center my-1 py-1">
                    <input type="checkbox" id="COMPLETED" onChange={(e) => checkboxOnChange(e)} checked={completedChecked} />
                    <label htmlFor="COMPLETED" className="ml-2">Completed</label>
                </div>
            </div>
        </div>

    );
};

export default withRouter(Sidebar);
