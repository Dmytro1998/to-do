import React, { useState, useEffect } from 'react';
import { api } from '../variables';

function Tasks() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch({ api });
            const json = await res.json();
            setData(json.hits);
        };
        fetchData();
        console.log(data)
    });

    return (
        <ul>
            {data.map(task => (
                <div key={task.id}>
                    <div>{task.title}</div>
                    <div>{task.description}</div>


                </div>
            ))}
        </ul>
    );
}

export default Tasks;