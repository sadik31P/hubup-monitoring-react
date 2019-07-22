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
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import * as moment from "moment";


function CustomTable({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((ping, key) => {
            let cl = classes.tableBodyRow;
            if(ping.responseCode !== 200)
              cl =  classes.tableBodyRow404;
            else if(ping.latency > 2000)
              cl =  classes.tableBodyRowLag;
            return (
              <TableRow key={key} className={cl}>
                <TableCell className={classes.tableCell} key={key}>
                  {ping.server.name}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {ping.server.address}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {moment(ping.dateTime).format("HH:mm:ss")}
                </TableCell>
                <TableCell className={ping.responseCode === 200 ? classes.greenTableCell : classes.tableCell} key={key}>
                  {ping.responseCode}
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  ----
                </TableCell>
                <TableCell className={classes.tableCell} key={key}>
                  {ping.latency} ms
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}


CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(CustomTable);
