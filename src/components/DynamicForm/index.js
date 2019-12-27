import React from "react";
import  SimpleMap  from "../mapContainer";
import ReactDOM from "react-dom";
import "./form.css";
//import * as myData from './forms.json';
//const forms = myData.forms;

export default class DynamicForm extends React.Component {
    state = {};
    constructor(props) {
        super(props);

        fetch(this.props.src + this.props.id, { 
            mode: 'no-cors' ,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
        }}).then(response => {
            return response.json();})
        .then(data => {
            this.setState({
                'data': data,
                'showMap': false,
                'mapName': '',
                'mapLat': 35.802219781082634,
                'mapLong': 51.393472095703146
            });
            this.state.data.fields.map(p=>{
            if(p.name !== undefined)
                this.state[p.name]=p.value || '';
        });
            })
        .catch((err) => { console.log(err); });
    

    };

    onSubmit = e => {
        // e.preventDefault();
        // if (this.props.onSubmit) 
        //     this.props.onSubmit(this.state);
        // console.log(this.state);
        e.preventDefault();
    };

    onChange = (e, key) => {
        this.setState({
                [key]: e.target.value
        });
    };
    onClickLocation = (e,key) =>{
        let res = e.target.value.split(",");
        if(res.length<2){
            res[0]=35.802219781082634;
            res[1]=51.393472095703146;
        }
        this.setState({
            [key]: e.target.value,
            'showMap': !(this.state.showMap || false),
            'mapName': e.target.name,
            'mapLat' : res[0],
            'mapLong': res[1]
        });
    }
    onMapClicked = e=>{
        this.setState({
            [this.state.mapName] : e.lat + " , " + e.lng ,
            'showMap':  false
        });
    }

    renderForm = () => {
        let model = this.state.data.fields;
        let defaultValues = this.props.defaultValues;
        let k=0;
        let input = {};
        let formUI = model.map(m => {
            k++;
            let key = m.key || m.name;
            let type = m.type || "text";
            let props = m.props || {};
            let name = m.name;
            let value = m.value || this.state[key] ;
            let required = m.required || false;

            let target = key;
            let listName = name + 'lst';
            let list={};
            switch (type.toString().toLowerCase()) {
                case 'text':
                    if (m.options !== undefined) {
                        list=m.options.map(opt=>{
                            k++;
                            return(
                                <option 
                                key = {key+k}
                                name={opt.label}
                                value={opt.value}>{opt.label}
                                </option>
                                );
                            });
                        input = (
                            <select 
                            onChange = {e => {this.onChange(e, target);}}
                            name={m.name} 
                             >
                            {list}
                            </select> 
                        );
                    }else{
                        input = ( 
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { key+k }
                            name = { name }
                            value = { value }
                            onChange = {e => {this.onChange(e, target);}}
                            required ={required}
                            />
                        );
                    }
                    break;
                case 'number':
                    let min = m.min || 0;
                    let max = m.max || 120;
                    if (m.options !== undefined) {
                        list=m.options.map(opt=>{
                            k++;
                            return(
                                <option 
                                key = {key+k}
                                name={opt.label}
                                value={opt.value}>{opt.label}
                                </option>
                                );
                            });
                        input = (
                            <select 
                            name={m.name} >
                            {list}
                            </select> 
                        );
                    }else{
                        input = ( 
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { key+k }
                            name = { name }
                            value = { value }
                            min={min}
                            max={max}
                            onChange = {e => {this.onChange(e, target);}}
                            required ={required}
                            />
                        );
                    }
                    break;
                case 'date':
                    if (m.options !== undefined) {
                        list=m.options.map(opt=>{
                            k++;
                            return(
                                <option 
                                key = {key+k}
                                name={opt.label}
                                value={opt.value}>{opt.label}
                                </option>
                                );
                            });
                        input = (
                            <select 
                            name={m.name} >
                            {list}
                            </select> 
                        );
                    }else{
                        input = ( 
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { key+k }
                            name = { name }
                            value = { value }
                            onChange = {e => {this.onChange(e, target);}}
                            required ={required}
                            />
                        );
                    }
                    break;
                case 'location':
                    if (m.options !== undefined) {
                        list=m.options.map(opt=>{
                            k++;
                            return(
                                <option 
                                key={opt.label}
                                onChange = {e => {this.onChange(e, target);}}
                                onDoubleClick = {e=>{this.onClickLocation(e, target);}}
                                value={opt.label}>
                                {opt.value.lat}  , {opt.value.long}
                                </option>
                                );
                            });

                        input = (
                            <select 
                            onChange = {e => {this.onChange(e, target);}}
                            name={m.name} >
                            {list}
                            </select> 
                        );
                    }else{
                        input = ( 
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { key+k }
                            name = { name }
                            value = { value }
                            onChange = {e => {this.onChange(e, target);}}
                            onDoubleClick = {e=>{this.onClickLocation(e, target);}}
                            required ={required}
                            />
                        );
                    }
                    break;
                case 'radio':
                    input = m.options.map(o => {
                        let checked = o.value === value;
                        return ( 
                            <React.Fragment key = { "fr" + o.key } >
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { o.key }
                            name = { o.name }
                            checked = { checked }
                            value = { o.value }
                            onChange = {
                                e => {
                                    this.onChange(e, o.name);
                                }
                            }
                            /> 
                            <label key = { "ll" + o.key } > { o.label } </label> 
                            </React.Fragment>
                        );
                    });
                    input = (
                        <div className = "form-group-radio" > 
                        { input } 
                        </div>);
                    break;
                case 'checkbox':
                    input = m.options.map(o => {
                        let checked = o.checked || false;
                        return ( 
                            <React.Fragment key = { "cfr" + o.key } >
                            <input {...props }
                            className = "form-input"
                            type = { type }
                            key = { o.key }
                            name = { o.name }
                            checked = { checked }
                            value = { o.value }
                            onChange = {
                                e => {
                                    this.onChange(e, m.key, "multiple");
                                }
                            }
                            /> 
                            <label key = { "ll" + o.key } > { o.label } </label> 
                            </React.Fragment>
                        );
                    });

                    input = (
                    <div className = "form-group-checkbox" >
                    { input } 
                    </div>);
                    break;
                    default:
                    break;
            }
            return ( 
                <div key = { "g" + key }
                className = "form-group" >
                <label className = "form-label"
                key = { "l" + key }
                htmlFor = { key } > { m.title } 
                </label> { input } 
                </div>
            );
        });
        return formUI;
    };

    render() {
        if(this.state.data===undefined){
            return(<span>Loading Form ...</span>);
        }
        return  this.renderOK();
    }

    renderOK() {
        let title = this.state.data.title  || "Dynamic Form";
        let map = (this.state.showMap) ?
            <div className="modal">
                <SimpleMap onClick={e=>{this.onMapClicked(e);}}
                name={this.state.mapName}
                zoom='14' 
                lat = {this.state.mapLat}
                lng ={this.state.mapLong} />
            </div>
            : null;
        return ( 
            <div className = { this.props.className } >
            <h3 className = "form-title" > { title } </h3> 
            <form className = "dynamic-form" 
                onSubmit = {e => {this.onSubmit(e);}} >
                { this.renderForm() } 
                <div className = "form-actions" >
                <button type = "submit" > submit </button> 
                </div> 
                {map}
                </form> 
            </div>
        );
    }
}

