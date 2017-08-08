import {connect} from 'react-redux';
import Players from '../components/Players';

const mapStateToProps = ({players}) => {
  return {
    players: players.items
  }
};

export default connect(
  mapStateToProps
)(Players);