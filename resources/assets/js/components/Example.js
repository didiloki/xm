import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// import 'react-datepicker/dist/react-datepicker.css';

import Table from './Table'
import Chart from './Chart'

export default class Example extends Component {
   constructor(props) {
     super(props)

      this.state = {
        isLoading: false,
          company : {
              email : '' || "email@email.com",
              symbol:''|| "MMM",
              start: moment(),
              end: moment()
          },
          showErrors: false,
          validationErrors: {},
          data : []
        }

      this.changeHandler = this.onChangeHandler.bind(this)
      this.startDateHandleChange = this.startDateHandleChange.bind(this)
      this.endDateHandleChange = this.endDateHandleChange.bind(this)
      this.displayTableData = this.displayTableData.bind(this)
      this.onSubmitHandler = this.onSubmitHandler.bind(this)

    }


    displayTableData(symbol, start, end, email){
      let resData = [...this.state.data]
      var self = this;
      self.setState({ isLoading : true })
      let params = {
        symbol: symbol,
        start: start,
        end: end,
        email : email
      }

      axios.get('/api/print',{
        params: {
          symbol: symbol,
          start: start,
          end: end,
          email : email
        }
        }).then(function (response) {
          resData = response.data;
          console.log(response)
          self.setState({ data : resData, isLoading : false })
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    onChangeHandler(e){
      let inputData = {...this.state.company}

        const { name, value } = e.target
        inputData[name] = value

      this.setState({ company : inputData})
    }

    startDateHandleChange(date) {
      var self = this;
      let inputData = {...this.state.company}

        inputData['start'] = date

      self.setState({
        company : inputData
      });
    }

    endDateHandleChange(date) {
        var self = this;
        let inputData = {...this.state.company}

        inputData['end'] = date

      self.setState({
        company : inputData
      });
    }

    //simple validation
    validation(){
      let error = {}
      let isError
      var self = this
      if(this.state.company.symbol.length < 2){
        error.symbolMessage = "Symbol must be more 2 characters"
      }
      if(this.state.company.email.length < 1){
        error.emailMessage = "Email is Required"
      }

      if(this.state.company.symbol.length > 2){
        axios.get('/api/validate',{
          params: {
            symbol: this.state.company.symbol
          }
          }).then(function (response) {
              if(!response.data){
                error.symbolMessage = "Symbol doesnt exist"
              }
            //
          })
          .catch(function (error) {
            console.log(error);
          });
      }

      if(this.state.company.email.length > 2){

      }
    }

    onSubmitHandler(e){
      e.preventDefault()

      const { email, start, end, symbol} = this.state.company

      this.displayTableData(symbol, start.format("MMM D Y"), end.format("MMM D Y"), email)
    }


    render() {
      const { email, start, end, symbol} = this.state.company
      let showTable, showChart, loading

      if(this.state.isLoading){
        loading = <div>Loading...</div>
      }
      if(this.state.data.length > 1){
        showTable = <Table data={this.state.data} />
        showChart = <Chart data={this.state.data} />
      }
        return (
            <div className="container">
              {loading}
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <div className="form-group">
                    <label>Company Symbol</label>
                    <input name="symbol"
                      value={symbol}
                      onChange={this.changeHandler}
                      placeholder="company symbol"
                      className="form-control" />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input name="email"
                      type="email"
                      value={email}
                      onChange={this.changeHandler}
                      placeholder="email@email.com"
                      className="form-control" />
                  </div>



                  <div className="form-row">

                    <div className="col pb-3">
                      <label>Start Date</label>
                        <DatePicker
                          selected={start}
                          selectsStart
                          startDate={start}
                          endDate={end}
                          dateFormat="YYYY-MM-DD"
                          peekNextMonth
                          showMonthDropdown
                          showYearDropdown
                          className="form-control"
                          onChange={this.startDateHandleChange}
                      />

                    </div>

                    <div className="col pb-3">
                      <label>End Date</label>
                        <DatePicker
                            selected={end}
                            selectsEnd
                            startDate={start}
                            endDate={end}
                            dateFormat="YYYY-MM-DD"
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            className="form-control"
                            onChange={this.endDateHandleChange}
                        />
                    </div>
                  </div>

                    <button
                      className="btn btn-block btn-primary btn-lg" onClick={this.onSubmitHandler}
                       >
                      Submit
                    </button>
                </div>
                <div className="col-xs-12 col-sm-9">
                  {showChart}
                  <div className="scrollable">
                      {showTable}
                  </div>
                </div>
              </div>

            </div>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<Example />, document.getElementById('root'));
}
