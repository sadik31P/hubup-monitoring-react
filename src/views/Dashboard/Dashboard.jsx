/*!

=========================================================
* Material Dashboard React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import "./a.css";
import {DatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';


import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import DashboardApi from "./api/DashboardApi";
import moment from "moment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";


class Dashboard extends React.Component {
  state = {
    value: 0,
    tableData: [],
    runningServers: '-',
    downServers: '-',
    totalServers: '-',
    laggingServers: '-',
    ceobusUnparsedFiles: '-',
    weeklyDownTimeLabels:[],
    weeklyDownTimeData:[],
    monthlyDownTimeLabels:[],
    monthlyDownTimeData:[],
    dailyDownTimeLabels:[],
    dailyDownTimeData:[],
    allServers:[],
    selectedServerMonthly: null,
    selectedDateDaily:moment(),
    selectedServerDaily:null,

  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount(): void {
    this.loadOneTime()
    this.loadLoop()
    setInterval(() => {this.loadLoop()},60000)
      //
  }

  loadLoop(){

    DashboardApi.getPings().then(res => {this.sortPing(res);}).catch(err => console.log(err));
    DashboardApi.getTotalRunningServers().then(res => this.setState({runningServers:res})).catch(err => console.log(err));
    DashboardApi.getTotalDownServers().then(res => this.setState({downServers:res})).catch(err => console.log(err));
    DashboardApi.getTotalServers().then(res => this.setState({totalServers:res})).catch(err => console.log(err));
    DashboardApi.getLaggingServers().then(res => this.setState({laggingServers:res})).catch(err => console.log(err));
    DashboardApi.getCeoBusUnparsedFiles().then(res => this.setState({ceobusUnparsedFiles:res})).catch(err => console.log(err));
    // ;
  }

  loadOneTime(){
    this.weeklyAllServers();
    DashboardApi.getServers().then(res => {{
      this.setState({allServers:res},() => {
        if(this.state.allServers.length > 0) {
          this.monthlyServer(this.state.allServers[0].id);
          this.dailyDown(moment(), this.state.allServers[0].id);
          this.setState({selectedServerMonthly:this.state.allServers[0].id,selectedServerDaily:this.state.allServers[0].id})
        }
      })
    }}).catch(err => console.log(err));
  }
  
  weeklyAllServers(){
    DashboardApi.getWeeklyDownTimeForAllServers(moment().format("YYYY-MM-DD")).then(res => {
      let labels = [];
      let data = [];
      res.map(row => {
        labels.push(row.name);
        data.push(row.minutes);
      });
      this.setState({weeklyDownTimeLabels:labels,weeklyDownTimeData:data })
    }).catch(err => console.log(err));
  }

  monthlyServer(serverId){
    console.log(moment().format("YYYY-MM-DD"))
    DashboardApi.getMonthlyDownTimeForServer(moment().format("YYYY-MM-DD"), serverId).then(res => {
      let labels = [];
      let data = [];
      for (let i = 0; i < 30; i++) {
        let d = moment().subtract(i,'days').format("YYYY-MM-DD");
        let lol = res.filter(function (el) {
          return el.date === d;
        });
        labels.push(moment(d).format("MMM Do"));
        data.push(lol.length > 0 ? parseInt(lol[0]['total']) : 0);
      }
      labels.reverse();
      data.reverse();

      this.setState({monthlyDownTimeLabels:labels,monthlyDownTimeData:data })
    }).catch(err => console.log(err));
  }

  dailyDown(date,serverId){
    DashboardApi.getDailyDownTimeForServer(moment(date).format("YYYY-MM-DD"), serverId).then(res => {
      let labels = [];
      let data = [];
      res.map(el => {
        labels.push(moment(el.time_end).format('HH:mm'))
        data.push(el.total)
      });
      this.setState({dailyDownTimeLabels:labels,dailyDownTimeData:data })
    }).catch(err => console.log(err));
  }

  sortPing(res){
    res.sort(function(a, b) {

      if (a.responseCode > b.responseCode) {
        return -1;
      }
      if (a.responseCode < b.responseCode) {
        return 1;
      }
      if(a.latency > b.latency)
        return -1;
      if(a.latency < b.latency)
        return 1;
    });
    this.setState({tableData:res})
  }
  
  getWeeklyDownData(){
    return {
      labels: this.state.weeklyDownTimeLabels,
      series: [this.state.weeklyDownTimeData]
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color={this.state.ceobusUnparsedFiles !== 0 ? "danger" : "info"} stats icon>
                <CardIcon color={this.state.ceobusUnparsedFiles !== 0 ? "danger" : "info"}>
                  <Icon style={{}}>file_copy</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>CEOBUS unparsed Files</p>
                <h3 className={classes.cardTitle}>{this.state.ceobusUnparsedFiles}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Total files in the ftp root directory
                </div>
              </CardFooter>
            </Card>
          </GridItem>



          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color={this.state.downServers !== 0 ? "danger" : "info"} stats icon>
                <CardIcon color={this.state.downServers !== 0 ? "danger" : "info"}>
                  <Icon>info_outline</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Down Servers</p>
                <h3 className={classes.cardTitle}>{this.state.downServers+'/'+this.state.totalServers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  Servers with response code not equal to 200
                </div>
              </CardFooter>
            </Card>
          </GridItem>



          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon style={{}}>developer_board</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Running Servers</p>
                <h3 className={classes.cardTitle}>{this.state.runningServers+'/'+this.state.totalServers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Servers with response code equal to 200
                </div>
              </CardFooter>
            </Card>
          </GridItem>



          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color={this.state.laggingServers !== 0 ? "warning" : "info"} stats icon>
                <CardIcon color={this.state.laggingServers !== 0 ? "warning" : "info"}>
                  <Icon>warning</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Lagging Servers</p>
                <h3 className={classes.cardTitle}>{this.state.laggingServers+'/'+this.state.totalServers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Servers with response time higher than 2 seconds
                </div>
              </CardFooter>
            </Card>
          </GridItem>



        </GridContainer>



        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Ping Table</h4>
                <p className={classes.cardCategoryWhite}>
                  Real-Time table that keeps track of Hubup's proxy servers
                </p>
              </CardHeader>
              <CardBody>
                <Table
                    tableHeaderColor="primary"
                    tableHead={["server", "address", "time","response", "status", "latency (ms)"]}
                    tableData={this.state.tableData}
                />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>



        <GridItem xs={12} sm={12} md={12}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                  className="ct-chart"
                  data={this.getWeeklyDownData()}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  // listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Weekly down time for each server (minutes)</h4>
              <p className={classes.cardCategory}>
                {moment().format("YYYY-MM-DD")}
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> last update 1 minute ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>




        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                    className="ct-chart"
                    data={{ labels: this.state.monthlyDownTimeLabels,
                      series: [this.state.monthlyDownTimeData]}}
                    type="Line"
                    options={dailySalesChart.options}
                    // listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle} style={{display:"inline"}}>Monthly down time for </h4>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                      style={{display:"inline", marginLeft:15,  width:150}}
                      value={this.state.selectedServerMonthly}
                      onChange={(e) => {
                        this.setState({selectedServerMonthly:e.target.value},
                            () => this.monthlyServer(this.state.selectedServerMonthly)
                        )
                      }}
                      input={<OutlinedInput  name="age" id="outlined-age-simple" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.state.allServers.map(el => {
                      return <MenuItem value={el.id}>{el.name}</MenuItem>
                    })}

                  </Select>
                </FormControl>
                <h4 style={{display:"inline", marginLeft:15}}>(minutes)</h4>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>








          <GridItem xs={12} sm={12} md={12}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                    className="ct-chart"
                    data={{ labels: this.state.dailyDownTimeLabels,
                      series: [this.state.dailyDownTimeData]}}
                    type="Line"
                    options={dailySalesChart.options}
                    // listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle} style={{display:"inline"}}>Hourly down time for </h4>
                <FormControl variant="outlined" className={classes.formControl}>
                  <Select
                      style={{display:"inline", marginLeft:15, width:150}}
                      value={this.state.selectedServerDaily}
                      onChange={(e) => {
                        this.setState({selectedServerDaily:e.target.value},
                            () => this.dailyDown(this.state.selectedDateDaily, this.state.selectedServerDaily)
                        )
                      }}

                      input={<OutlinedInput  name="age" id="outlined-age-simple" />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {this.state.allServers.map(el => {
                      return <MenuItem value={el.id}>{el.name}</MenuItem>
                    })}
                  </Select>
                </FormControl>
                <h4 style={{display:"inline", marginLeft:15, marginRight:15, verticalAlign:"middle"}}>in</h4>

                <MuiPickersUtilsProvider utils={MomentUtils} style={{ marginLeft:15,display:"inline"}}>

                  <FormControl className={"special-outlined-right"}>
                    <DatePicker
                        style={{backgroundColor: '#FAFAFA', marginTop: 3}}
                        //label="Date de début"
                        emptyLabel="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={this.state.selectedDateDaily}
                        variant="outlined"
                        cancelLabel={"Annuler"}
                        okLabel={"Valider"}
                        onChange={(date) => {this.setState({selectedDateDaily: date},() => this.dailyDown(this.state.selectedDateDaily, this.state.selectedServerDaily))}}
                        format={"dddd DD MMMM YYYY"}
                        todayLabel={"Aujourd'hui"}
                        maxDate={moment()}
                        ref={node => {
                          this.endDatePicker = node;
                        }}
                        InputProps={{
                          style: {
                            height: 38,
                          }
                        }}
                    />
                  </FormControl>
                </MuiPickersUtilsProvider>


              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>



        </GridContainer>

      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
