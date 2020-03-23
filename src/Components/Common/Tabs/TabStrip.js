import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const TabStrip = (props) => {

    const content =props.tabs.map(({ title, location, count, notify }) => {
        return (
            <NavLink to={props.match.url + "/" + location} activeClassName="border-nebula-blue" key={count} className={"flex border-b-2 border-transparent pb-4 pt-3 px-8 font-semibold hover:bg-nebula-blue-light transition duration-300 "}>
                <div key={location}
                    className="flex flex-row items-center"
                >
                    {notify &&
                        <div className="bg-nebula-blue w-2 h-2 mr-2 rounded-full"/>
                    }
                    {title}
                    <div className="text-nebula-grey-500 pl-3">
                        {count}
                    </div>
                </div>
            </NavLink>
        );
    }
    );

    return(
        <div className = "flex border-b border-nebula-grey-400 w-full cursor-default">
            { content }
        </div>
    );
};

export default withRouter(TabStrip);