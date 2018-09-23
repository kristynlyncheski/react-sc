import React, { Component } from 'react';
import FileUploadModal from './containers/FileUploadModal';
import TaskModal from './containers/TaskModal';

class App extends Component {
  render() {
    return (
      <div>
        <FileUploadModal />
        <TaskModal />
      </div>
    );
  }
}

export default App;
