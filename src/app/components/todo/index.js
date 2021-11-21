import React from "react";
import './index.css';
import add from '../../svg-images/add.svg';
import edit from '../../svg-images/edit.svg';
import remove from '../../svg-images/remove.svg';
import { URL } from "../../constants";
import Form from "../form";



class TodoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            error: null,
            tasks: [],
            seen: { add: false, edit: false },

        }
    }



    addForm = () => {
        this.setState({
            seen: { add: !this.state.seen.add, edit: false }
        });
    };

    editForm = () => {
        this.setState({
            seen: { add: false, edit: !this.state.seen.edit }

        });

    }
    async componentDidMount() {
        const response = await fetch(`${URL}/tasks`);
        const tasks = await response.json();

        this.setState({ tasks: tasks, isLoaded: true })


    }


    delete = (id) => {
        let tasks = []
        fetch(`${URL}/tasks/` + id, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(tasks)

        })
        this.setState({ tasks: tasks })

    }

    render() {

        const { error, tasks, isLoaded } = this.state;


        return (
            <div className="main-page">
                <header>
                    <h1 >To Do</h1>
                    <button className="add-button" onClick={this.addForm} ><img src={add} />
                    </button>
                    {this.state.seen.add ? <Form toggle={this.addForm} title={"Create a task"} edit={true} /> : null}
                </header>
                <div className="task-list">
                    <main>
                        {tasks.map((task) => (
                            <div key={task.id} task={task} className="to-do-container">
                                <div className="title-wrapper">
                                    <div className="task-title">{task.title}
                                    </div>
                                    <div className="task-buttons">
                                        <button className="button" onClick={() => this.editForm()} ><img src={edit} />

                                        </button>
                                        {this.state.seen.edit ? <Form toggle={this.editForm} title={"Edit task"} /> : null}

                                        <button className="button" onClick={() => this.delete(task.id)}><img src={remove} />
                                        </button>

                                    </div>
                                </div>
                                <div className="description-wrapper">
                                    <p>{task.description}</p>
                                </div>
                            </div>
                        ))}


                    </main>
                </div>

            </div>
        )
    }
}
export default TodoComponent;
