class TradingCard extends React.Component {
  render() {
    return (
      <div className="card">
        <p class="card-name">
          Name: {this.props.name}
        </p>

        <div class="card-img">
          <img src={this.props.imgUrl} />
        </div>

        <p class="card-details">
          Skill: {this.props.skill}
        </p>
      </div>
    );
  }
}

class TradingCardContainer extends React.Component {
  constructor() {
    super();

    this.state = { cards: [] };  // Set initial value
    this.updateCards = this.updateCards.bind(this);
  }

  updateCards(response) {
    const cards = response.cards

    this.setState({ cards: cards });
  }

  getAllCards() {
    // $.get('/api/cards', this.updateCards);
    fetch('/api/cards')
    .then(response => response.json())
    // .then(data => this.setState(data)); 
    //this gets rid of need to do updateCards function above
    // .then(data => this.updateCards(data));
    //this also possible
    .then(this.updateCards);
    //this also possible
  }

  componentDidMount() {
    this.getAllCards();
  }


  render() {
    const tradingCards = [];

    for (const currentCard of this.state.cards) {
      tradingCards.push(
        <TradingCard
          key={currentCard.name}
          name={currentCard.name}
          skill={currentCard.skill}
          imgUrl={currentCard.imgUrl}
        />
      );
    }

    return (
      <div>{tradingCards}</div>
    );
  }
}


ReactDOM.render(
  <TradingCardContainer />,
  document.getElementById('app')
);
