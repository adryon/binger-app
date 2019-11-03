import React from 'react'
import { Button } from 'components/LayoutComponents';

export default class PastMovies extends React.Component {
  static defaultProps = {}

  render() {

    return (
      <div className="card">
        <div className="card-header">
          <strong>Past Movies</strong>
        </div>
        <div className="card-body">
          <Button
            type="primary"
            text="Add Movie" />
        </div>
      </div>
    )
  }
}
