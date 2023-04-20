import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

export function Button ({loadMore}) {
    return (
        <Btn type="button"  onClick={loadMore} >
            Load more
        </Btn>
    )
}

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};