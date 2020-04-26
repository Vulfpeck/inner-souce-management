import React, { useState } from "react";
import SplitContainerWithImage from "../../Containers/SplitContainerWithImage";
import TextInput from "../../Common/InputFields/TextInput";
import SearchTagsInput from "../../Common/InputFields/SearchTagsInput";
import Button from "../../Common/Button/Button";
import { withRouter, Redirect } from "react-router";
import { connect } from "react-redux";
import { USER_SIGN_IN } from "../../../Store/actions";
import { validateOnboarding } from './ValidateForm';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
// import { useQuery } from '@apollo/client';
// import { GET_USER_PROFILE } from "../../../queries";

const OnboardingPage = (props) => {
    
     //To verify if the user has already onboarded ToDo implement query to DB to find out 
     if(props.location.state == undefined || props.location.state.onboarded == true) {
        return <Redirect to="/"/>
    }

    // const [login, {loading, error}] = useMutation(AUTHENTICATE);
    // if(loading) return <p>Authenticating...</p>;
    // if(error) return <p>Authentication Error! {error}</p>;

    const form = {
        name: "",
        position: "",
        department: "",
        contact: "",
        skills: [],
        errMsg: "",
    }
    const [ state, setState ] = useState(form);
    
    const onInputChangeHandler = (event) => {
        const value = event.currentTarget.value;
        switch(event.currentTarget.id) {
            case "name": setState({...state, name:value});break;
            case "position":  setState({...state, position:value});break;
            case "department":  setState({...state, department:value});break;
            case "contact":  setState({...state, contact:value});break;
        }
    }

    const getTagList = (skillList) => {   
        setState({
                ...state,
                skills: skillList
            }
        );
    }

    const validateAndSubmitForm = () => {
        let isValid = validateOnboarding(state);
        if(isValid) {
            setState({
                ...state,
                errMsg: ""
            })
            
        }
        else {
            setState({
                ...state,
                errMsg: "Please fill in all fields!"
            })
        }
        
    }
    
    const body = (
        <div className="flex flex-col w-full px-4 font-semibold ">
            <p className="text-lg text-nebula-grey-600 mb-4">Hello,</p>
            <p className="text-3xl">{Cookies.get('githubName')}</p>
            <p className="text-lg text-nebula-grey-600 mt-2">Before we get
              started, we’d like get to know you a little better.</p>
            <label className="mt-10">Your Full Name</label>
            <TextInput id="name" placeholder="Full Name" onChange={onInputChangeHandler} />
            <label className="mt-10">Your position in company</label>
            <TextInput id="position" placeholder="Position" onChange={onInputChangeHandler} />
            <label className="mt-10">Your department</label>
            <TextInput id="department" placeholder="Department" onChange={onInputChangeHandler} />
            <label className="mt-10">Contact</label>
            <TextInput id="contact" placeholder="Email, Slack ID..." onChange={onInputChangeHandler} />
            <label className="mt-10">Skills & areas of interest (Optional)</label>
            <SearchTagsInput id="skills" getTagList = {getTagList} placeholder="Type and press enter to add skills"/>
            {
                state.errMsg ? 
                    <div className = "mt-6 text-nebula-red" >{state.errMsg}</div>
                : ""
            }
            <Button label="Let's go!" type="primary" className="px-8 mt-24" onClick={validateAndSubmitForm}/>
        </div>
    );

    return (
        <SplitContainerWithImage body={body}/>
    );
};


const mapStateToProps = state => {
    return {
        user: state.user,
    }
}
const mapDispatchToProps = dispatch => {
    return {
      setUserData: (profile) => dispatch({ type: USER_SIGN_IN, payload: {profile: profile}})
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(OnboardingPage));

