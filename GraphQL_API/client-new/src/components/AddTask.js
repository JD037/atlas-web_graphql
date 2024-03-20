import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getProjectsQuery, addTaskMutation, getTasksQuery } from '../queries/queries';

function AddTask(props) {
  const [state, setState] = useState({
    title: '',
    weight: 1,
    description: '',
    projectId: ''
  });

  function displayProjects() {
    var data = props.getProjectsQuery;
    if (data.loading) {
      return <option>Loading projects...</option>;
    } else {
      return data.projects.map(project => {
        return (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        );
      });
    }
  }

  function submitForm(e) {
    e.preventDefault();
    props.addTaskMutation({
      variables: {
        title: state.title,
        weight: parseInt(state.weight),
        description: state.description,
        projectId: state.projectId
      },
      refetchQueries: [{ query: getTasksQuery }]
    });
  }

  return (
    <form id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task title:</label>
        <input type="text" onChange={(e) => setState({ ...state, title: e.target.value })} />
      </div>
      <div className="field">
        <label>Weight:</label>
        <input type="number" onChange={(e) => setState({ ...state, weight: e.target.value })} />
      </div>
      <div className="field">
        <label>Description:</label>
        <textarea onChange={(e) => setState({ ...state, description: e.target.value })}></textarea>
      </div>
      <div className="field">
        <label>Project:</label>
        <select onChange={(e) => setState({ ...state, projectId: e.target.value })}>
          <option>Select project</option>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: "getProjectsQuery" }),
  graphql(addTaskMutation, { name: "addTaskMutation" })
)(AddTask);