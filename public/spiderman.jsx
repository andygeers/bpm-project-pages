function quake(qDuration) {
  // the horizontal displacement
  var deltaX=10;
  var div = document.body;//getElementById('app');
  doQuake(div, qDuration, 0, deltaX, div.style.marginLeft, div.style.marginTop);
}

function doQuake(div, qDuration, qCounter, deltaX, startX, startY)
{


  if (qCounter >= qDuration) {
    div.style.marginLeft = startX;
    div.style.marginTop = startY;

    // Finish
  } else {
    // shake left
    if ((qCounter%4)==0)
    {
      div.style.marginLeft = deltaX + "px";
      div.style.marginTop = deltaX + "px";
    }
    // shake right
    else if ((qCounter%4)==2)
    {
      div.style.marginLeft = -deltaX + "px";
      div.style.marginTop = -deltaX + "px";
    }
    // speed up or slow down every X cycles
    if ((qCounter%30)==0)
    {
      // speed up halfway
      if (qCounter<qDuration/2)
      {
        deltaX++;
      }
      // slow down after halfway of the duration
      else
      {
        deltaX--;
      }
    }

    // Iterate
    setTimeout(function() { doQuake(div, qDuration, qCounter + 1, deltaX, startX, startY) }, 1);
  }
}

function CurrentLocation(props) {
  return (
    <div id="current-location">
      <h3>
        {props.oof ?
          "Oof! Spiderman walks in to a wall" :
          ("Spiderman is in the " + props.places[props.location] + ".")
        }
      </h3>
    </div>
  )
}

function DirectionOption(props) {
  var enabled = (props.map[props.location][parseInt(props.index)] > 0);
  return (
    <li onClick={() => props.move(props.index)} className={'direction-option' + (enabled ? '' : ' direction-option-disabled') }>{props.name}</li>
  )
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
    if (new_location > 0) {
      this.setState({ location: new_location });
    } else {
      quake(100);
      this.setState({ oof: true });
      var _self = this;
      setTimeout(function() { _self.setState({ oof: false }); }, 3000);
    }
  }

  render() {
    return (
      <div>
        <CurrentLocation location={this.state.location} oof={this.state.oof} places={this.places} />
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