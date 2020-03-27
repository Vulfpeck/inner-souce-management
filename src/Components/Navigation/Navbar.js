import React, { Component } from "react";
import * as Icons from "react-feather";
import SearchBar from "../Common/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileModalOpen: false,
            mouseInside: null,
        };
        this.openProfilePopup = this.openProfilePopup.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.profileIcon = React.createRef();
    }

    openProfilePopup(event) {
        this.setState({
            profileModalOpen: true,
        });
    }

    closePopup() {
        this.handleMouseOver(false);
        setTimeout(
            () => {
                if (!this.state.mouseInside) {
                    this.setState({
                        profileModalOpen: false,
                    });
                }
            },
            200
        );
    }

    handleMouseOver(value) {
        this.setState({
            mouseInside: value,
        });
    }

    render() {
        return (
            <div className="h-24 items-center flex z-10 relative" ref={this.profileIcon} >
                <div className="flex-1 flex items-center h-12">
                    <SearchBar className="h-12 mr-4 bg-nebula-grey-300" inputClass="bg-nebula-grey-300 placeholder-nebula-grey-600" />
                    {/* Svg for notifications */}
                    <div className="flex-0 bg-nebula-grey-300 mr-4 rounded-full h-12 w-12 flex items-center">
                        <Icons.Bell className="h-6 w-6 flex-1 hover:text-nebula-blue" />
                    </div>
                    <button onClick={this.openProfilePopup} >
                        <img src="../assets/icons/Ellipse 1.png" className="flex-0 h-12 w-12 rounded-full" />
                    </button>
                    <ProfileModal
                        onMouseOver={this.handleMouseOver}
                        onMouseLeave={this.closePopup}
                        profileModalOpen={this.state.profileModalOpen}
                    />
                </div >
            </div>
        );
    }
}

class ProfileModal extends Component {
    render() {
        return (
            <CSSTransition
                in={this.props.profileModalOpen}
                timeout={300}
                appear
                unmountOnExit
                classNames={{
                    enter: "opacity-0",
                    enterActive: "transition duration-300 opacity-100 transform transform-x-0 transform-y-0",
                    exit: "",
                    exitActive: "transition duration-300 opacity-0 transform -translate-y-4 translate-x-4",
                }}
            >
                <div className={"w-96 mt-2 absolute top-0 right-0 inline-block" + this.props.className || ""} onMouseOver={() => this.props.onMouseOver(true)} onMouseLeave={this.props.onMouseLeave}>
                    <div className="overflow-hidden w-full shadow-lg shadow-2xl rounded-lg p-4 pr-20 z-50 bg-white" >
                        <div className="flex p-4" >
                            <img src="../assets/icons/Ellipse 1.png" className="h-12 w-12 rounded-full" />
                            <div className="font-semibold leading-tight ml-8">
                                <p className="text-nebula-grey-600 text-xs">Signed in as</p>
                                <p className="text-lg mb-2">Tushar Paliwal </p>
                                <Link to="/profile" className="text-xs text-nebula-blue tracking-widest">VIEW PROFILE</Link>
                            </div>
                        </div>
                        <hr />
                        <Link to="/login" className="flex mt-4 text-nebula-blue font-semibold" >
                            <Icons.LogOut className="stroke-current ml-4 mr-8" />
                            <p>Logout</p>
                        </Link>
                    </div>
                </div>
            </CSSTransition>

        );
    }
}

ProfileModal.propTypes = {
    className: PropTypes.string,
    onMouseOver: PropTypes.func,
    onMouseLeave: PropTypes.func,
    profileModalOpen: PropTypes.bool,
};

export default Navbar;
