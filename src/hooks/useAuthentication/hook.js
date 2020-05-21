import { useState, useEffect } from "react";
import Axios from "axios";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../../queries";

const CLIENT_ID = process.env.CLIENT_ID;
const GITHUB_DOMAIN = process.env.GITHUB_DOMAIN;
const API_URL = process.env.API_URL;
const githubAuthUrl = `https://${GITHUB_DOMAIN}/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user user:email`;

console.log(API_URL);
console.log(GITHUB_DOMAIN);
console.log(CLIENT_ID);
export function useAuthentication() {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [getUserInfo] = useLazyQuery(GET_USER_PROFILE, {
        onCompleted: (data) => {
            setUser(data.User);
            setAuthenticated(true);
            setLoading(false);
        },
        onError: (e) => {
            alert("Error while querying: ", e);
            setLoading(false);
        },
        fetchPolicy: "network-only",
    });

    useEffect(() => {
        setLoading(true);
        Axios.get(`${API_URL}/read-cookie`, { withCredentials: true }).then(
            (data) => {
                getUserInfo({ variables: { userId: data.data.user_id } });
            }
        ).catch((e) => {
            console.log(e);
            setLoading(false);
        });

    }, [authenticated]);

    const beginAuth = () => {
        window.open(githubAuthUrl, "_self");
    };

    const finishAuth = (code) => {
        console.log("finish auth");
        if (code !== "") {
            setLoading(true);
            Axios.post(`${API_URL}/authenticate`, { "code": code }, {
                withCredentials: true,
            }).then(() => {
                Axios.get(`${API_URL}/read-cookie`, { withCredentials: true },
                ).then((data) => {
                    setAuthenticated(true);
                    getUserInfo({ variables: { userId: data.data.user_id } });
                }).catch((e) => {
                    // console.log(e);
                    setLoading(false);
                });
            }).catch((e) => {
                setLoading(false);
            });
        }
    };

    const signOut = () => {
        Axios.post(`${API_URL}/logout`, null, { withCredentials: true }).then(
            () => {
                setAuthenticated(false);
                setUser(null);
            }
        ).catch((e) => {
            alert("error signing out: " + e);
        });
    };

    const refetchProfile = () => {
        getUserInfo({ variables: { userId: user.id } });
    };
    return {
        authenticated: authenticated,
        loading: loading,
        user: user,
        beginAuth,
        finishAuth,
        refetchProfile,
        signOut,
    };
}
