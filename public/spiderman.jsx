function CurrentLocation(props) {
  return (
    <div id="current-location">
      <p>
        Spiderman is in the {props.places[props.location]}.
      </p>
    </div>
  )
}

function DirectionOption(props) {
  if (props.map[props.location][parseInt(props.index)] > 0) {
    return (
      <li><a href="#" onClick={() => props.move(props.index)}>{props.name}</a></li>
    )
  } else {
    return (<span/>);
  }
}

function DirectionOptions(props) {
  return (
    <div id="direction-options">
      <p>He can go:</p>
      <ul>
        <DirectionOption name="Left" index="0" location={props.location} map={props.map} move={props.move}/>
        <DirectionOption name="Right" index="1" location={props.location} map={props.map} move={props.move}/>
        <DirectionOption name="Up" index="2" location={props.location} map={props.map} move={props.move}/>
        <DirectionOption name="Down" index="3" location={props.location} map={props.map} move={props.move}/>
      </ul>
    </div>
  )
}

function DirectionControls(props) {
  return (
    <div id="direction-controls">
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: 1 };
    this.map = {};
    this.map[1] = [0, 0, 3, 4];
    this.map[2] = [3, 0, 0, 0];
    this.map[3] = [0, 2, 0, 1];
    this.map[4] = [0, 0, 1, 0];

    this.places = {
      1: "house",
      2: "roof",
      3: "supermarket",
      4: "spidermobile"
    }

  }

  move(dir) {
    var new_location = this.map[this.state.location][parseInt(dir)];
    this.setState({ location: new_location });
  }

  render() {
    return (
      <div>
        <CurrentLocation location={this.state.location} places={this.places} />
        <DirectionOptions location={this.state.location} map={this.map} move={(dir) => this.move(dir)}/>
        <DirectionControls location={this.state.location} map={this.map} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);