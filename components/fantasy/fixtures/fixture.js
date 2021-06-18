import React, { useEffect, useState } from 'react';
import {Grid} from '@material-ui/core';
import Axios from 'axios';
import teamName from '../../../lib/info/teamName.json';
import {useDispatch, useSelector, connect} from 'react-redux';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function Fixture(){
    const dispatch = useDispatch();
    const fixtureData = useSelector(state=>state.fixture);

    const [apiFlag, setApiFlag] = useState(true);
    // const [lastEventId, setLastEventId] = useState();
    const [eventId, setEventId] = useState(fixtureData.lastEventId);
    // const [event, setEvent] = useState([]);
    // const [lastEventDate, setLastEventDate] = useState();

    useEffect(()=>{
        if(apiFlag){
            setApiFlag(false);
            Axios.post("/api/fantasy/bootstrap-api")
            .then((res)=>{
                dispatch({type: "SET_FULL_BOOTSTRAP_API", payload: res.data})
                dispatch({type: "SET_LAST_EVENT_ID", payload:res.data.events.length-1});
                setEventId(res.data.events.length-1);
                Axios({
                    method: "POST",
                    url: "/api/fantasy/event-api",
                    data: {
                        id:res.data.events.length-1
                    }
                })
                .then((res)=>{
                    dispatch({type: "SET_FIXTURE_EVENT", payload:res.data});
                    var date = new Date(res.data[0].kickoff_time);
                    var time = date.toString();
                    var first = time.split(' ')[0]+" "+time.split(' ')[1]+" "+time.split(' ')[2]+" "+time.split(' ')[3];
                    dispatch({type: "SET_LAST_EVENT_DATE", payload: first});
                })
            })
        }
    })
    const handleSync = () =>{
        window.location.href = "https://pl.ecal.com/";
    }
    const handlePrevious = () =>{
        setEventId(eventId-1);
        Axios({
            method: "POST",
            url: "/api/fantasy/event-api",
            data: {
                id:eventId
            }
        })
        .then((res)=>{
            dispatch({type: "SET_FIXTURE_EVENT", payload:res.data});
            var date = new Date(res.data[0].kickoff_time);
            var time = date.toString();
            var first = time.split(' ')[0]+" "+time.split(' ')[1]+" "+time.split(' ')[2]+" "+time.split(' ')[3];
            dispatch({type: "SET_LAST_EVENT_DATE", payload: first});
        })
    }
    const handleNext = () =>{
        setEventId(eventId+1);
        Axios({
            method: "POST",
            url: "/api/fantasy/event-api",
            data: {
                id:eventId
            }
        })
        .then((res)=>{
            dispatch({type: "SET_FIXTURE_EVENT", payload:res.data});
            var date = new Date(res.data[0].kickoff_time);
            var time = date.toString();
            var first = time.split(' ')[0]+" "+time.split(' ')[1]+" "+time.split(' ')[2]+" "+time.split(' ')[3];
            dispatch({type: "SET_LAST_EVENT_DATE", payload: first});
        })
    }
    return(
        <div>
            <div className = "x-font3 text-center">
                Fixtures
            </div>
            <div className = "mt-2 text-center">
                <button className = "x-button3" style = {{backgroundColor:"#592373"}} onClick = {handleSync}>Sync Calendar</button>
            </div>
            <div className = "text-center mt-4 mb-5">
                <button className = "x-button7 float-left" onClick =  {handlePrevious}>Previous</button>
                <span className = "x-font4 d-inline-block">{`Total event in GameWeek ${eventId+1}`}</span>
                <button className = "x-button7 float-right" onClick =  {handleNext} style = {eventId==fixtureData.lastEventId?{display: "none"}:null}>Next</button>
            </div>
            <div className = "mt-2 text-center">
                <div className = "x-transfer-fixture-day x-font4">
                    {eventId==fixtureData.lastEventId?fixtureData.lastEventDate:`GameWeek ${eventId+1}`}
                </div>
                {fixtureData.event.map((el)=>(
                    eventId==fixtureData.lastEventId?(
                        <div className = "x-font4 mt-2">
                            <Grid container>
                                <Grid item xs = {2} sm = {4} md = {4}>
                                    {teamName[el.team_a]}
                                </Grid>
                                <Grid item xs = {2} sm = {1} md = {1}>
                                    <img src = {`/img/clubs/team${el.team_a}.png`} alt = "team1"/>
                                </Grid>
                                <Grid item xs = {4} sm = {2} md = {2} className = "x-transfer-fixture-point">
                                    {new Date(el.kickoff_time).toString().split(' ')[4]}
                                </Grid>
                                <Grid item xs = {2} sm = {1} md = {1}>
                                    <img src = {`/img/clubs/team${el.team_h}.png`} alt = "team1"/>
                                </Grid>
                                <Grid item xs = {2} sm = {4} md = {4}>
                                    {teamName[el.team_h]}
                                </Grid>
                            </Grid>
                            <hr />
                        </div>
                        ):
                        (
                        <div className = "x-font4 mt-2">
                            <Grid container>
                                <Grid item xs = {4} sm = {4} md = {4}>
                                    {teamName[el.team_a]}
                                </Grid>
                                <Grid item xs = {1} sm = {1} md = {1}>
                                    <img src = {`/img/clubs/team${el.team_a}.png`} alt = "team1"/>
                                </Grid>
                                <Grid item xs = {2} sm = {2} md = {2} className = "x-transfer-fixture-point">
                                    {`${el.team_a_score}:${el.team_h_score}`}
                                </Grid>
                                <Grid item xs = {1} sm = {1} md = {1}>
                                    <img src = {`/img/clubs/team${el.team_h}.png`} alt = "team1"/>
                                </Grid>
                                <Grid item xs = {4} sm = {4} md = {4}>
                                    {teamName[el.team_h]}
                                </Grid>
                            </Grid>
                            <hr />
                        </div>
                        )
                    )
                )
                }
            </div>
        </div>
    )
}

export default Fixture;