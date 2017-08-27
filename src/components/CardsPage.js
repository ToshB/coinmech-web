import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCards} from "../modules/cards/actions";
import {fetchPlayers} from "../modules/players/actions";
import CardList from "./CardList";
import EditCardDialog from "./EditCardDialog";

class CardsPage extends React.Component {
  componentDidMount() {
    if (!this.props.isCardsLoaded) {
      this.props.fetchCards();
    }
    if (!this.props.isPlayersLoaded) {
      this.props.fetchPlayers();
    }
  }

  render() {
    return (
      <div className="container">
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <h1 className="title">Cards</h1>
            </div>
          </div>
        </div>
        <CardList/>
        {this.props.isEditingCard && <EditCardDialog/>}
      </div>
    );
  }
}

CardsPage.propTypes = {
  isCardsLoaded: PropTypes.bool.isRequired,
  isPlayersLoaded: PropTypes.bool.isRequired,
  isEditingCard: PropTypes.bool.isRequired,
  fetchCards: PropTypes.func.isRequired
};

const mapStateToProps = ({cards, players}) => {
  return {
    isCardsLoaded: cards.isLoaded,
    isEditingCard: cards.isEditingCard,
    isPlayersLoaded: players.isLoaded,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCards,
    fetchPlayers
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsPage);