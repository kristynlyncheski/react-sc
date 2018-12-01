import React, { Component } from 'react'
import { Panel, PanelGroup } from 'react-bootstrap'
import PageTitle from '../../components/PageTitle'
import CardsWrapper from '../../components/CardsWrapper'
import DataTable from '../../components/DataTable'
import FilterRow from '../../components/FilterRow'

import './AssetsPageWrapper.css'

export default class AssetsPageWrapper extends Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            data: [],
            view: 'card'
        }

        this.onToggleView = this.onToggleView.bind(this);
    }

    componentDidMount() {
        // get this data from the API
        const data = [{
            link: "MjQyODQ=",
            name: "118 W 137th St",
            bldg_boro: "Manhattan",
            address_num: "118",
            address_street: "W 137th St",
            city: "New York",
            state: "NY",
            zip: "10030",
            lat: "40.8156450",
            lng: "-73.9410950",
            units: "20",
            added: "2015-05-21 12:11:13",
            block: "1921",
            lot: "44",
            stories: "5",
            area: "15895"
          },
          {
            link: "MzUyOTg=",
            name: "1180 Broadway",
            bldg_boro: "Manhattan",
            address_num: "1180",
            address_street: "Broadway",
            city: "New York",
            state: "NY",
            zip: "10001",
            lat: "40.7453944",
            lng: "-73.9885511",
            units: "0",
            added: "2016-03-14 10:27:13",
            block: "830",
            lot: "27",
            stories: "0",
            area: "10000"
          },
          {
            link: "MzYxNDc=",
            name: "12 E 49th St",
            bldg_boro: "Manhattan",
            address_num: "12",
            address_street: "East 49th Street",
            city: "New York",
            state: "NY",
            zip: "10017",
            lat: "40.7573028",
            lng: "-73.9769832",
            units: "0",
            added: "2016-04-15 12:40:18",
            block: "1284",
            lot: "7",
            stories: "0",
            area: "598088"
          },
          {
            link: "NTQ1Njg=",
            name: "12-56 Central Ave",
            bldg_boro: "Queens",
            address_num: "12-56",
            address_street: "Central Ave",
            city: "Queens",
            state: "NY",
            zip: "11691",
            lat: "40.6085611",
            lng: "-73.7483833",
            units: "24",
            added: "2017-03-30 18:33:50",
            block: "15533",
            lot: "31",
            stories: "4",
            area: "15000"
          }];

        this.setState({ data });
    }

    onToggleView (view) {
        this.setState({ view });
    }

    renderCardHeading(item) {
        return (
            <div className='panel-heading'>
                <a href={`portfolio/detail/${item.link}`}>
                    <h4>{item.name}</h4>
                </a>
            </div>
        )
    }

    renderCardBody(item) {
        return (
            <div className='panel-body'>
                {item.address_num} {item.address_street}
                <br />
                {item.city}, {item.state} {item.zip}
            </div>
        )
    }

    render () {
        return (
            <div id='content'>
                <div className="row">
                    <div className="col-xs-12">
                        SparkCharts go here.

                        <PageTitle 
                        category='Assets'
                        subcategory='Pools'
                        icon='apple' />
                    </div>
                </div>

                <ul id="dataTabs" className="nav nav-tabs"></ul>

                <div id='panel panel-default'>
                    <FilterRow onToggleView={this.onToggleView}/>
                </div>
                
            {/*this.renderView()*/}

                <CardsWrapper
                    hidden={!(this.state.view === 'card')}
                    data={this.state.data}
                    renderCardHeading={this.renderCardHeading} 
                    renderCardBody={this.renderCardBody} />

                <DataTable 
                    hidden={!(this.state.view === 'list')}
                    data={this.state.data}
                    renderCardHeading={this.renderCardHeading} 
                    renderCardBody={this.renderCardBody} />
            </div>
        )
    }
}