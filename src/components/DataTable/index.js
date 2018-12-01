import React, { Component } from 'react'
import { PropTypes as PT } from 'prop-types'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import './DataTable.css'

export default class DataTable extends Component {

    render () {
        const classNames = this.props.hidden ? 'hide' : '';

        const addLink = (cell, row) => {
            return <a href={`/portfolio/detail${row.link}`}>{cell}</a>;
        };

        return (
            <div id='data-table-wrapper' className={classNames}>
                <BootstrapTable data={this.props.data} striped hover>
                    <TableHeaderColumn isKey dataField='name' dataFormat={addLink}>Property</TableHeaderColumn>
                    <TableHeaderColumn dataField='city'>City</TableHeaderColumn>
                    <TableHeaderColumn dataField='state'>State</TableHeaderColumn>
                    <TableHeaderColumn dataField='units'>Units</TableHeaderColumn>
                    <TableHeaderColumn dataField='area'>Area</TableHeaderColumn>
                    <TableHeaderColumn dataField='block'>Block</TableHeaderColumn>
                    <TableHeaderColumn dataField='lot'>Lot</TableHeaderColumn>
                    <TableHeaderColumn dataField='stories'>Stories</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}