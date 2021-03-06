import React, {useState, useEffect, useContext} from 'react';
import {useRouter} from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import TopHead from '../../components/fantasy/head';
import Fixture from '../../components/fantasy/fixtures/fixture';
import PlayerList from '../../components/fantasy/playerList/playerList';
import TransferGround from '../../components/fantasy/ground/transferGround';
import ControlDialog from '../../components/fantasy/transfer/controlDialog';
import ListControlDialog from '../../components/fantasy/transfer/listDialog';
import { toast, ToastContainer } from 'react-nextjs-toast';
import {ethers} from 'ethers';
import profileContract from '../../lib/abi/profile';
import { ProfileContext } from '../../context/profile';
import fearnContract from '../../lib/abi/fearn';
import { ApiContext } from '../../context/fantasyApi';
import Axios from 'axios';

import {Grid} from "@material-ui/core";
  
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: "40px",
      paddingBottom: "30px",
    }
  }));

  const playerArrange = (a,b) =>{
    if (a.total_points === b.total_points) {
      return 0;
  }
  else {
      return (a.total_points > b.total_points) ? -1 : 1;
  }
  }

function Transfers(){
    const apiData = useContext(ApiContext);
    const {playerData} = useContext(ProfileContext);
    const classes = useStyles();
    const router = useRouter();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(false);
    const [id, setId] = useState();
    const [keeperCount, setKeeperCount] = useState(0);
    const [defenderCount, setDefenderCount] = useState(0);
    const [fielderCount, setFielderCount] = useState(0);
    const [forwardsCount, setForwardsCount] = useState(0);
    const [playerIdArray, setPlayerIdArray] = useState([]);

    const [totalList, setTotalList] = useState({
      goalKeepers:[],
      defenders:[],
      midFielders:[],
      forwarders:[]
  }
  );
    const [listDialog, setListDialog] = useState(false);
  
    const [totalInfo, setTotalInfo] = useState([
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0],
      [false,"player", 0,0,0,0,0,0]
    ]);
  
    const [totalPlayerApi, setTotalPlayerApi] = useState([]);

  
   
      useEffect(()=>{
        if(apiData&&apiData.apiData){
          var temp1 = [];
          var temp2 = [];
          var temp3 = [];
          var temp4 = [];
          setTotalPlayerApi(apiData.apiData.elements);
          apiData.apiData.elements.map((el)=>{
              if(el.element_type==1){
                  temp1.push(el);
              }
              if(el.element_type==2){
                  temp2.push(el);
              }
              if(el.element_type==3){
                  temp3.push(el);
              }
              if(el.element_type==4){
                  temp4.push(el);
              }
          })
          setTotalList({
              goalKeepers:temp1.sort(playerArrange),
              defenders:temp2.sort(playerArrange),
              midFielders:temp3.sort(playerArrange),
              forwarders: temp4.sort(playerArrange)
          })
        }
    },[apiData])



    
      
  
    const handleDialogClose = () => {
          setDialogOpen(false);
          setListDialog(false);
        };
  
    const handleListItemClick = (e,id,bool) =>{
      var fg = 0;
      if(bool){
        let addP = [...totalInfo];
        if(id<2){
          totalList.goalKeepers.map((el)=>{
            if(fg==0){
            var ix=0;
            totalInfo.map((p)=>{
              if(el.id==p[5])
              ix++;
            })
            if(ix==0){
              fg = 1;
              addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
              setTotalInfo(addP);
              console.log(addP[id]);
              setPlayerIdArray(oldArray => [...oldArray, el.id]);
            }
          }
          })
          setKeeperCount(keeperCount+1);
        }
        else if(id<7){
          totalList.defenders.map((el)=>{
            console.log("flag", fg);
            if(fg==0){
            var ix=0;
            totalInfo.map((p)=>{
              if(el.id==p[5])
              ix++;
            })
            if(ix==0){
              fg = 1;
              addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
              setTotalInfo(addP);
              console.log(addP[id]);
              setPlayerIdArray(oldArray => [...oldArray, el.id]);
            }
          }
          })
          setDefenderCount(defenderCount+1);
        }
        else if(id<12){
          totalList.midFielders.map((el)=>{
            console.log("flag", fg);
            if(fg==0){
            var ix=0;
            totalInfo.map((p)=>{
              if(el.id==p[5])
              ix++;
            })
            if(ix==0){
              fg = 1;
              addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
              setTotalInfo(addP);
              console.log(addP[id]);
              setPlayerIdArray(oldArray => [...oldArray, el.id]);
            }
          }
          })
          setFielderCount(fielderCount+1);
        }
        else{
          totalList.forwarders.map((el)=>{
            console.log("flag", fg);
            if(fg==0){
            var ix=0;
            totalInfo.map((p)=>{
              if(el.id==p[5])
              ix++;
            })
            if(ix==0){
              fg = 1;
              addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
              setTotalInfo(addP);
              console.log(addP[id]);
              setPlayerIdArray(oldArray => [...oldArray, el.id]);
            }
          }
          })
          setForwardsCount(forwardsCount+1);
        }
      }
      else{
        let removeP = [...totalInfo];
        removeP[id] = [false,"player", 0,0,0,0,1];
        setTotalInfo(removeP);
        let cool = [...playerIdArray];
        cool.pop();
        setPlayerIdArray(cool);
        if(id<2){
          setKeeperCount(keeperCount-1);
        }
        else if(id<7)
          setDefenderCount(defenderCount-1);
        else if(id<12)
          setFielderCount(fielderCount-1);
        else
          setForwardsCount(forwardsCount-1);
      }
        setSelectedValue(bool);
        setDialogOpen(false);
    }
    const removePlayer = (event,v) =>{
      console.log(v);
      setDialogOpen(true);
      setSelectedValue(totalInfo[v][0])
      setId(v);
      console.log(playerIdArray);
    }
  
    const addFromList = (e,id) =>{
      setListDialog(true);
      setId(id);
      if(playerIdArray.includes(id)){
        setSelectedValue(true)
      }
      else{
        setSelectedValue(false);
      }
    }
  
    const handletableItemClick = (e,id,bool) =>{
      var fg1 = 0;
      var fg2 = 0;
      let addP = [...totalInfo];
      if(bool){
        totalPlayerApi.map((el)=>{
          if(fg1==0){
          if(el.id==id){
            if(el.element_type==1){
              if(keeperCount<2){
                totalInfo.map((res,idx)=>{
                  if(!res[0]){
                    if(fg2==0){
                    addP[idx] = [true,el.second_name, el.now_cost,el.total_points, el.element_type,el.id,1,el.team];
                    setTotalInfo(addP);
                    setPlayerIdArray(oldArray => [...oldArray, el.id]);
                    setKeeperCount(keeperCount+1);
                    fg2 = 1;
                    }
                  }
                })
            }
            }
            if(el.element_type==2){
              if(defenderCount<5){
                totalInfo.map((res,idx)=>{
                  if(!res[0]&&idx>=2){
                    if(fg2==0){
                      addP[idx] = [true,el.second_name, el.now_cost,el.total_points, el.element_type,el.id,1,el.team];
                      setTotalInfo(addP);
                      setPlayerIdArray(oldArray => [...oldArray, el.id]);
                      setDefenderCount(defenderCount+1);
                      fg2 = 1;
                    }
                  }
                })
              }
            }
            if(el.element_type==3){
              console.log("wowowowowowww")
              if(fielderCount<5){
                totalInfo.map((res,idx)=>{
                  if(!res[0]&&idx>=7){
                    if(fg2==0){
                      addP[idx] = [true,el.second_name, el.now_cost,el.total_points, el.element_type,el.id,1,el.team];
                      setTotalInfo(addP);
                      setPlayerIdArray(oldArray => [...oldArray, el.id]);
                      setFielderCount(fielderCount+1);
                      fg2 = 1;
                    }
                  }
                })
              }
            }
            if(el.element_type==4){
              if(forwardsCount<3){
                totalInfo.map((res,idx)=>{
                  if(!res[0]&&idx>=12){
                    if(fg2==0){
                      addP[idx] = [true,el.second_name, el.now_cost,el.total_points, el.element_type,el.id,1,el.team];
                      setTotalInfo(addP);
                      setPlayerIdArray(oldArray => [...oldArray, el.id]);
                      setForwardsCount(forwardsCount+1);
                      fg2 = 1;
                    }
                  }
                })
            }
            }
          fg1 = 1;
          }
        }
        })
      }
      else{
        fg1 = 0;
        totalInfo.map((el,idx)=>{
          if(fg1==0){
          if(el[5]==id){
            addP[idx] = [false,"player", 0,0,0,0,1,0];
            setTotalInfo(addP);
            let cool2 = [...playerIdArray];
            playerIdArray.map((res,index)=>{
              if(res==id){
              cool2.splice(index,1);
              console.log(cool2);
              setPlayerIdArray(cool2);
            }
            })
            if(idx<2){
              setKeeperCount(keeperCount-1);
            }
            else if(idx<7)
              setDefenderCount(defenderCount-1);
            else if(idx<12)
              setFielderCount(fielderCount-1);
            else
              setForwardsCount(forwardsCount-1);
          }
        }
      })
    }
    setSelectedValue(bool);
    setListDialog(false);
  }
  
    const handlePlayerReverse = (e,id,bool,temp_bool) =>{
      // if(temp_bool!=0){
      // var fg = 0;
      // if(bool){
      //   let addP = [...totalInfo];
      //   if(id<2){
      //     totalList.goalkeepers.map((el)=>{
      //       console.log("flag", fg);
      //       if(fg==0){
      //       var ix=0;
      //       totalInfo.map((p)=>{
      //         if(el.id==p[5])
      //         ix++;
      //       })
      //       if(ix==0){
      //         fg = 1;
      //         addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
      //         setTotalInfo(addP);
      //         console.log(addP[id]);
      //         setPlayerIdArray(oldArray => [...oldArray, el.id]);
      //       }
      //     }
      //     })
      //     setKeeperCount(keeperCount+1);
      //   }
      //   else if(id<7){
      //     totalList.defenders.map((el)=>{
      //       console.log("flag", fg);
      //       if(fg==0){
      //       var ix=0;
      //       totalInfo.map((p)=>{
      //         if(el.id==p[5])
      //         ix++;
      //       })
      //       if(ix==0){
      //         fg = 1;
      //         addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
      //         setTotalInfo(addP);
      //         console.log(addP[id]);
      //         setPlayerIdArray(oldArray => [...oldArray, el.id]);
      //       }
      //     }
      //     })
      //     setDefenderCount(defenderCount+1);
      //   }
      //   else if(id<12){
      //     totalList.midFielders.map((el)=>{
      //       console.log("flag", fg);
      //       if(fg==0){
      //       var ix=0;
      //       totalInfo.map((p)=>{
      //         if(el.id==p[5])
      //         ix++;
      //       })
      //       if(ix==0){
      //         fg = 1;
      //         addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
      //         setTotalInfo(addP);
      //         console.log(addP[id]);
      //         setPlayerIdArray(oldArray => [...oldArray, el.id]);
      //       }
      //     }
      //     })
      //     setFielderCount(fielderCount+1);
      //   }
      //   else{
      //     totalList.forwarders.map((el)=>{
      //       console.log("flag", fg);
      //       if(fg==0){
      //       var ix=0;
      //       totalInfo.map((p)=>{
      //         if(el.id==p[5])
      //         ix++;
      //       })
      //       if(ix==0){
      //         fg = 1;
      //         addP[id] = [true,el.second_name, el.now_cost,el.total_points,el.element_type,el.id,1,el.team];
      //         setTotalInfo(addP);
      //         console.log(addP[id]);
      //         setPlayerIdArray(oldArray => [...oldArray, el.id]);
      //       }
      //     }
      //     })
      //     setForwardsCount(forwardsCount+1);
      //   }
      // }
      // else{
        let removeP = [...totalInfo];
        removeP[id] = [false,"player", 0,0,0,0,1,0];
        setTotalInfo(removeP);
        let cool1 = [...playerIdArray];
        cool1.pop();
        setPlayerIdArray(cool1);
        if(id<2){
          setKeeperCount(keeperCount-1);
        }
        else if(id<7)
          setDefenderCount(defenderCount-1);
        else if(id<12)
          setFielderCount(fielderCount-1);
        else
          setForwardsCount(forwardsCount-1);
      // }
        setSelectedValue(bool);
        setDialogOpen(false);
      // }
    }
  
    const saveTeam = async () =>{
      if(window.ethereum){
        if(keeperCount+defenderCount+fielderCount+forwardsCount == 15){
            const provider =new ethers.providers.Web3Provider(window.ethereum);
              const signer = provider.getSigner();
              const tokenContract = new ethers.Contract(fearnContract.kovan, fearnContract.abi, signer);
              const contract = new ethers.Contract(profileContract.kovan,profileContract.abi,signer);
              const amount = (totalInfo[0][2]+totalInfo[1][2]+totalInfo[2][2]+totalInfo[3][2]+totalInfo[4][2]+totalInfo[5][2]+totalInfo[6][2]+totalInfo[7][2]+totalInfo[8][2]+totalInfo[9][2]+totalInfo[10][2]+totalInfo[11][2]+totalInfo[12][2]+totalInfo[13][2]+totalInfo[14][2]);
              var currentAmount;
              if(playerData.length===0){
                console.log("1 is",playerData)
                currentAmount=0;
              }
              else{
                console.log("2 is",playerData)
                currentAmount=JSON.parse(playerData).value;
              }
              const moreAmount = amount-currentAmount;
              console.log(currentAmount)
              if(moreAmount>0){
                console.log(process.env.NEXT_PUBLIC_ADMINADDRESS, moreAmount);
                var tx = await tokenContract.transfer(process.env.NEXT_PUBLIC_ADMINADDRESS, moreAmount);
                if(tx!=null){
                  await tx.wait();
                }
              }
              else if(moreAmount<0){
                Axios.post("/api/fantasy/fearn-crypt",{address: window.ethereum.selectedAddress, amount: moreAmount})
                .then((res)=>{
                  console.log(res.data);
                })
              }

              const playerInfo = {
                        main:[
                          totalInfo[0],
                          totalInfo[2],
                          totalInfo[3],
                          totalInfo[4],
                          totalInfo[5],
                          totalInfo[7],
                          totalInfo[8],
                          totalInfo[9],
                          totalInfo[10],
                          totalInfo[12],
                          totalInfo[13]
                        ],
                        candidate:[
                          totalInfo[1],
                          totalInfo[6],
                          totalInfo[11],
                          totalInfo[14]
                        ],
                        value:amount
                  }

              var tx =await contract.updatePlayers(JSON.stringify(playerInfo));
              if(tx!=null){
                  console.log(tx);
                  await provider.waitForTransaction(tx.hash)
                          .catch((err)=>{
                              console.log(err)
                          });
                  window.location.reload();
              }
          }
          else{
              toast.notify('please select 15 members for your team!', {
                duration: 5,
                type: "error"
              })
            }
        }
    }
    return(
        <div>
          <ToastContainer align={"center"} position={"bottom"}/>
            <TopHead />
            <div className={classes.container}>
                <ControlDialog open = {dialogOpen} onClose = {handleDialogClose} selectedValue = {selectedValue} handleListItemClick = {handleListItemClick} id = {id}/>
                <ListControlDialog open = {listDialog} onClose = {handleDialogClose} selectedValue = {selectedValue} handleListItemClick = {handletableItemClick} id = {id}/>
                <Grid container spacing = {3} className = "diceGrid">
                    <Grid item xs = {12} sm = {12} md = {8}>
                        <div className = "x-font3">
                            Transfers
                        </div>
                        <div className = "x-font5 mb-3">
                            Select a maximum of 3 players from a single team or 'Auto Pick' if you're short of time.
                        </div>
                        <div className = "x-transfer-top-time">
                            <span className = "x-font8">Gameweek 38 deadlines: </span>
                            <span className = "x-font9">Sun 23 May 16:30</span>
                        </div>
                        <div className = "mt-3 text-center mb-5">
                            <button className = "x-button4 float-left">Auto Pick</button>
                            <button className = "x-button4">Reset</button>
                            <button className = "x-button4 float-right">Play Wildcard</button>
                        </div>
                        <hr />
                        <div className = "text-center mt-2">
                            <span className = "float-left">
                                <div className = 'x-font5'>Free Transfers</div>
                                <div className = 'x-font4'>2</div>
                            </span>
                            <span className = "d-inline-block">
                                <div className = 'x-font5'>Cost</div>
                                <div className = 'x-font4'>0 pts</div>
                            </span>
                            <span className = "float-right">
                                <div className = 'x-font5'>Free Transfers</div>
                                <div className = 'x-font10'>{`${(1000-(totalInfo[0][2]+totalInfo[1][2]+totalInfo[2][2]+totalInfo[3][2]+totalInfo[4][2]+totalInfo[5][2]+totalInfo[6][2]+totalInfo[7][2]+totalInfo[8][2]+totalInfo[9][2]+totalInfo[10][2]+totalInfo[11][2]+totalInfo[12][2]+totalInfo[13][2]+totalInfo[14][2]))/10}`}</div>
                            </span>
                        </div>
                        <TransferGround totalInfo = {totalInfo} removePlayer = {removePlayer} handlePlayerReverse = {handlePlayerReverse} saveTeam = {saveTeam}/>
                        <hr />
                        <Fixture />
                    </Grid>
                    <Grid item xs = {12} sm = {12} md = {4}>
                        <PlayerList addFromList = {addFromList} playerIdArray = {playerIdArray}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Transfers;