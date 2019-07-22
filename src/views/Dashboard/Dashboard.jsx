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

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import DashboardApi from "./api/DashboardApi";

class Dashboard extends React.Component {
  state = {
    value: 0,
    tableData: [],
    runningServers: '-',
    downServers: '-',
    totalServers: '-',
    laggingServers: '-',
    ceobusUnparsedFiles: '-',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentDidMount(): void {
    this.loadLoop()
    // setInterval(() => {this.loadLoop()},2000)
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color={this.state.ceobusUnparsedFiles > 0 ? "danger" : "info"} stats icon>
                <CardIcon color={this.state.ceobusUnparsedFiles > 0 ? "danger" : "info"}>
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
              <CardHeader color={this.state.downServers > 0 ? "danger" : "info"} stats icon>
                <CardIcon color={this.state.downServers > 0 ? "danger" : "info"}>
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
              <CardHeader color={this.state.downServers > 0 ? "warning" : "info"} stats icon>
                <CardIcon color={this.state.downServers > 0 ? "warning" : "info"}>
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



        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Daily Sales</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                  </span>{" "}
                  increase in today sales.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={emailsSubscriptionChart.data}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={completedTasksChart.data}
                  type="Line"
                  options={completedTasksChart.options}
                  listener={completedTasksChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Completed Tasks</h4>
                <p className={classes.cardCategory}>
                  Last Campaign Performance
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> campaign sent 2 days ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>



        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomTabs
              title="Tasks:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Bugs",
                  tabIcon: BugReport,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0, 3]}
                      tasksIndexes={[0, 1, 2, 3]}
                      tasks={bugs}
                    />
                  )
                },
                {
                  tabName: "Website",
                  tabIcon: Code,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[0]}
                      tasksIndexes={[0, 1]}
                      tasks={website}
                    />
                  )
                },
                {
                  tabName: "Server",
                  tabIcon: Cloud,
                  tabContent: (
                    <Tasks
                      checkedIndexes={[1]}
                      tasksIndexes={[0, 1, 2]}
                      tasks={server}
                    />
                  )
                }
              ]}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            {/*<Card>*/}
            {/*  <CardHeader color="warning">*/}
            {/*    <h4 className={classes.cardTitleWhite}>Employees Stats</h4>*/}
            {/*    <p className={classes.cardCategoryWhite}>*/}
            {/*      New employees on 15th September, 2016*/}
            {/*    </p>*/}
            {/*  </CardHeader>*/}
            {/*  <CardBody>*/}
            {/*    <Table*/}
            {/*      tableHeaderColor="warning"*/}
            {/*      tableHead={["ID", "Name", "Salary", "Country"]}*/}
            {/*      tableData={[*/}
            {/*        ["1", "Dakota Rice", "$36,738", "Niger"],*/}
            {/*        ["2", "Minerva Hooper", "$23,789", "Curaçao"],*/}
            {/*        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],*/}
            {/*        ["4", "Philip Chaney", "$38,735", "Korea, South"]*/}
            {/*      ]}*/}
            {/*    />*/}
            {/*  </CardBody>*/}
            {/*</Card>*/}
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
