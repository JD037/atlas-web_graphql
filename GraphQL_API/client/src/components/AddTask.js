import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { getProjectsQuery, addTaskMutation, getTasksQuery } from '../queries/queries';

function AddTask(props) {
  const [state, setState] = useState({
    title: '',
    weight: '',
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

  const submitForm = e => {
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
    setState({
      title: '',
      weight: '',
      description: '',
      projectId: ''
    });
  };

  return (
    <form id="add-task" onSubmit={submitForm}>
      <div className="field">
        <label>Task Title:</label>
        <input
          type="text"
          value={state.title}
          onChange={e => setState({ ...state, title: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Task Weight:</label>
        <input
          type="number"
          value={state.weight}
          onChange={e => setState({ ...state, weight: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Task Description:</label>
        <textarea
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        ></textarea>
      </div>
      <div className="field">
        <label>Project:</label>
        <select
          value={state.projectId}
          onChange={e => setState({ ...state, projectId: e.target.value })}
        >
          <option>Select Project</option>
          {displayProjects()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(getProjectsQuery, { name: 'getProjectsQuery' }),
  graphql(addTaskMutation, { name: 'addTaskMutation' })
)(AddTask);