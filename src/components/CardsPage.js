import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchCards} from "../modules/cards/actions";
import CardList from "./CardList";

class CardsPage extends React.Component {
  componentDidMount() {
    if (!this.props.isLoaded) {
      this.props.fetchCards();
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
      </div>
    );
  }
}

CardsPage.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  fetchCards: PropTypes.func.isRequired
};

const mapStateToProps = ({cards}) => {
  return {
    isLoaded: cards.isLoaded,
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchCards
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsPage);