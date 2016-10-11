import ComponentName from './components/ComponentName';

export class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <img src="/assets/Head_40.png" />
        <ComponentName />
      </div>
    )
  }

};

ReactDOM.render(<App />, document.getElementById('content'));
