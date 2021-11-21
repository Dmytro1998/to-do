import React, { Component } from "react";
import { URL } from '../../constants/index.js'
import "./index.css"


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: ''
        }
        this.submitForm = this.submitForm.bind(this)
        this.changeTheTitle = this.changeTheTitle.bind(this);
        this.changeTheDescription = this.changeTheDescription.bind(this);
        this.editSubmit = this.editSubmit.bind(this);
    }

    changeTheTitle(event) {
        this.setState({ title: event.target.value });
    }
    changeTheDescription(event) {
        this.setState({ description: event.target.value });
    }

    submitForm(event) {

        event.preventDefault();
        let tasks = {
            title: this.state.title,
            description: this.state.description
        }

        fetch(`${URL}/tasks`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tasks)

        })
        this.props.toggle();

    }

    editSubmit(event) {
        event.preventDefault();

        let task = {
            title: this.state.title,
            description: this.state.description
        }

        fetch(`${URL}/tasks/2`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ title: this.state.title, description: this.state.description })

        })


    }



    render() {

        let add = this.submitForm;
        let edit = this.editSubmit;

        return (
            <div className="wrapper-form">

                <div className="content-wrapper">
                    <form onSubmit={this.props.edit ? add : edit}>
                        <div className="popupTitle">{this.props.title}</div>
                        <div className="content-wrapper">
                            <div className="inputTitle">Task</div>
                            <input placeholder="Type the title" className="titleInput" name="title" value={this.state.title} onChange={(this.changeTheTitle)}></input>
                            <div className="inputTitle">Desciption</div>
                            <textarea placeholder="Type the desciption" className="descriptionInput" name="description" value={this.state.description} onChange={(this.changeTheDescription)}></textarea>
                            <div className="saveButtonContainer">
                                <input type="submit" value="Save" className="saveBtn" />

                            </div>

                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default Form