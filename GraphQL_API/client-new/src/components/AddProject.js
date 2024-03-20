import React, { useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { addProjectMutation, getProjectsQuery } from '../queries/queries';

function AddProject(props) {
  const [state, setState] = useState({
    title: '',
    weight: '',
    description: ''
  });

  const submitForm = e => {
    e.preventDefault();
    props.addProjectMutation({
      variables: {
        title: state.title,
        weight: parseInt(state.weight),
        description: state.description
      },
      refetchQueries: [{ query: getProjectsQuery }]
    });
    setState({
      title: '',
      weight: '',
      description: ''
    });
  };

  return (
    <form id="add-project" onSubmit={submitForm}>
      <div className="field">
        <label>Project Title:</label>
        <input
          type="text"
          value={state.title}
          onChange={e => setState({ ...state, title: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Project Weight:</label>
        <input
          type="number"
          value={state.weight}
          onChange={e => setState({ ...state, weight: e.target.value })}
        />
      </div>
      <div className="field">
        <label>Project Description:</label>
        <textarea
          value={state.description}
          onChange={e => setState({ ...state, description: e.target.value })}
        ></textarea>
      </div>
      <button>+</button>
    </form>
  );
}

export default compose(
  graphql(addProjectMutation, { name: 'addProjectMutation' })
)(AddProject);