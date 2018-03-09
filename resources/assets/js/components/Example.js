import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// import 'react-datepicker/dist/react-datepicker.css';

import Table from './Table'
import Chart from './Chart'
import FormControl from './FormControl'

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
          errors: {},
          data : []
        }

      this.changeHandler = this.onChangeHandler.bind(this)
      this.startDateHandleChange = this.startDateHandleChange.bind(this)
      this.endDateHandleChange = this.endDateHandleChange.bind(this)
      this.displayTableData = this.displayTableData.bind(this)
      this.onSubmitHandler = this.onSubmitHandler.bind(this)
      this.validationHandler = this.validationHandler.bind(this)

    }


    displayTableData(symbol, start, end, email){
      let resData = [...this.state.data]
      var self = this;
      self.setState({ isLoading : true })

      axios.get('/api/print',{
        params: {
          symbol: symbol,
          start: start,
          end: end,
          email : email
        }
        }).then(function (response) {
          resData = response.data;

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
    // async await
    async validationHandler(){

      let fields = {...this.state.company}
      let errors = {};
      let formIsValid = true;



			//Symbol
      if(!fields.symbol || fields.symbol.length < 2){
          formIsValid = false;
          errors.symbol = "Check Symbol";
      }

      if(typeof fields.symbol !== "undefined"){
      	if(!fields.symbol.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors.symbol = "Only letters";

        }

        if(fields.symbol.length > 2){
          const self = this
          this.setState({ isLoading : true })
          await axios.get('/api/validate',{
              params: {
                symbol : fields.symbol
              }
              }).then(function (response) {

                  if(response.status === 204){
                    formIsValid = false
                    errors.symbol = "Symbol doesnt exist"
                    self.setState({ isLoading : false })
                  }
                //

              })
              .catch(function (error) {
                console.log(error);
              });


        }
      }


      //Email
      if(!fields.email){
          formIsValid = false;
          errors.email = "Cannot be empty";

      }

      if(typeof fields.email !== "undefined"){
      	let lastAtPos = fields.email.lastIndexOf('@');
      	let lastDotPos = fields.email.lastIndexOf('.');

      	if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@') == -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
            formIsValid = false;
            errors.email = "Email is not valid";

        }
      }

      this.setState({errors: errors});

      return formIsValid;
    }


    onSubmitHandler(e){
      e.preventDefault()
      const self = this
      const { email, start, end, symbol} = this.state.company
      this.validationHandler().then(function(resp){

        if(resp)
          self.displayTableData(symbol, start.format("MMM D Y"), end.format("MMM D Y"), email)

      }).catch(function(err){
        console.log(err)
      })

    }


    render() {
      const { email, start, end, symbol} = this.state.company
      let showTable, showChart, loading

      if(this.state.isLoading){
        loading = <div className="loading">Loading...</div>
      }

      if(this.state.data.length > 1){
        showTable = <Table data={this.state.data} />
        showChart = <Chart data={this.state.data} />
      }
        return (
            <div className="container-fluid">
              {loading}
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <FormControl
                    company={this.state.company}
                    changeHandler={this.changeHandler}
                    startDateHandleChange ={this.startDateHandleChange}
                    endDateHandleChange = {this.endDateHandleChange}
                    onSubmitHandler={this.onSubmitHandler}
                    errors={this.state.errors}/>
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
