import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

const FormControl = (props) => {
  return (
    <form>
      <div className="form-group">
        <label>Company Symbol</label>
        <input name="symbol"
          value={props.company.symbol}
          onChange={props.changeHandler}
          placeholder="company symbol"
          className="form-control"
          required />
        <span style={{color: "red"}}>{props.errors.symbol}</span>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input name="email"
          type="email"
          value={props.company.email}
          onChange={props.changeHandler}
          placeholder="email@email.com"
          className="form-control"
          required />
        <span style={{color: "red"}}>{props.errors.email}</span>
      </div>



      <div className="form-row">

        <div className="col pb-3">
          <label>Start Date</label>
            <DatePicker
              selected={props.company.start}
              selectsStart
              startDate={props.company.start}
              endDate={props.company.end}
              dateFormat="YYYY-MM-DD"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              className="form-control"
              onChange={props.startDateHandleChange}
          />

        </div>

        <div className="col pb-3">
          <label>End Date</label>
            <DatePicker
                selected={props.company.end}
                selectsEnd
                startDate={props.company.start}
                endDate={props.company.end}
                dateFormat="YYYY-MM-DD"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                className="form-control"
                onChange={props.endDateHandleChange}
            />
        </div>
      </div>

        <button
          className="btn btn-block btn-primary btn-lg" onClick={props.onSubmitHandler}
           >
          Submit
        </button>
    </form>
  )
}

export default FormControl
