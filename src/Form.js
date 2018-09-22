import React from 'react';
import Fade from 'react-reveal/Fade';

export default function (WrappedComponent) { 
  return class SimpleForm extends React.Component {
  	constructor(props) {
  		super(props);
      this.state = {};
      this.ids = {};
      this.handleChange = handleChange.bind(this);    
      this.validate = this.validate.bind(this);    
  		//this.handleCheckbox = handleCheckbox.bind(this);    
      this.makeField = makeField.bind(this);
  	}

    //handleBlur({ target }) {
    //}

    validate(cb) {
      this.hasErrors = false;
      this.setState({...this.ids, ...this.state}, () => cb(this.hasErrors) );
    }

    render() {
      return <WrappedComponent {...this.props} data={this.state} makeField={this.makeField} validate={this.validate} />;
    }
  }
}

export function handleChange({ target }) {
    this.setState({
      [target.getAttribute('data-id')]: (target.type === 'checkbox' ? target.checked : target.value)
    });
  }

//function handleCheckbox({ target }) {
//    this.setState({
//      [target.getAttribute('data-id')]: target.checked
//    });
//  }


export function makeField(id, {col = 3, rows, label, value: val, error, hint, placeholder, className, optional, prepend, type} ) {
  this.ids[id] = val || '';
  const
    value = this.state.hasOwnProperty(id)?this.state[id] : (val || ''),
    invalid = !optional&&!value&&this.state.hasOwnProperty(id),
    clsName = 'form-control' + (invalid?' is-invalid':''),    
    Tag = type === 'textarea' ? type : 'input';
  if (invalid)
    this.hasErrors = true;
    if (type === 'checkbox') return (
      <div className={"form-check " + (className || `col-md-${col} mb-3`)}>
        <input className="form-check-input" type="checkbox" id={id} data-id={id} placeholder={placeholder} value={value} checked={value} onChange={this.handleChange}/>
        <label className="form-check-label" htmlFor={id}>
          {label||id.charAt(0).toUpperCase() + id.slice(1)}
        </label>
      </div>
    );
    return(
      <div className={className || `col-md-${col} mb-3`}>
        <label>{label||id.charAt(0).toUpperCase() + id.slice(1)}{optional?<span className="text-muted"> (Optional)</span>:''}</label>
        <div className="input-group">
        { prepend?
          <div className="input-group-prepend">
            <span className="input-group-text">{prepend}</span>
          </div>
          : null
        }
        <Tag
          id={id}
          name={id}
          type={type || 'text'}
          className={clsName}
          data-id={id}
          placeholder={placeholder}
          value={value}
          rows={rows||void 0}
          onChange={this.handleChange}
        />
        {hint?<small className="text-muted">{hint}</small>:null}        
        </div>
        <Fade bottom collapse when={invalid}>
          <div className={"invalid-feedback " }
            //Boostrap 4 uses some CSS tricks to simplify
            //error handling but we're doing it differently
            //so the next line disables these tricks
            style={{ display: 'block' }}
          >
            This field is required
          </div>          
        </Fade>
      </div>
    );
  }
