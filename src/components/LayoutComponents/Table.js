import React from 'react';
import { Checkbox } from 'components/LayoutComponents';

export default class Table extends React.Component {

  state = {
    checkboxes: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dataSource !== this.props.dataSource) {
      if (this.props.rowSelection) {
        var checkboxes = []
        this.props.dataSource.map((item, itemIndex) => {
          checkboxes[`checkbox-${itemIndex}`] = false;
        })
        checkboxes[`checkbox-all`] = false;
        this.setState({checkboxes});
      }
    }
  }

  onSelectChange = (name, checked) => {
    const {checkboxes} = this.state;
    if (name === 'checkbox-all') {
      Object.keys(checkboxes).map(item => {
        checkboxes[item] = checked;
      })
    }
    checkboxes[name] = checked;
    this.setState({checkboxes});

    var items = [];
    this.props.dataSource.map((row, index) => {
      if (checkboxes[`checkbox-${index}`]) {
        items.push(row);
      }
    })

    const onSelectChange = this.props.onSelectChange || (() => {});
    onSelectChange(items);
  }

  calculateWidth = (width) => {
    var totalWidthAvailable = 100 - (this.props.rowSelection ? 6 : 0) - (this.props.numbered ? 3 : 0);
    if (width) {
      width = width.split('%')[0];
    } else {
      width = 1/this.props.columns.length * 100;
    }
    width = (width / 100) * totalWidthAvailable;
    return `${width}%`;
  }

	render() {
    const {columns} = this.props;
    const {dataSource} = this.props;
    const stripped = this.props.stripped || false;
    const numbered = this.props.numbered || false;
    const rowSelection = this.props.rowSelection || false;

    return (
      <table width="100%" className={`binger-table ${stripped ? 'binger-table-stripped' : ''}`}>
        <thead width="100%">
          <tr width="100%">
            {rowSelection ? (
              <th width="6%">
                <Checkbox
                  onCheckboxChange={this.onSelectChange}
                  checked={this.state.checkboxes[`checkbox-all`]}
                  color="green"
                  name={`checkbox-all`}
                />
              </th>) :
              <th></th>
            }
            {numbered ? (<th className="binger-numbered-column" width="6%"><h3><strong>#</strong></h3></th>) : <th></th>}
            {columns.map((column, index) => (
              <th width={this.calculateWidth(column.width)} key={index}><h3><strong>{column.title}</strong></h3></th>)
            )}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {rowSelection ? (
                <td>
                  <Checkbox
                    onCheckboxChange={this.onSelectChange}
                    checked={this.state.checkboxes[`checkbox-${itemIndex}`]}
                    color="secondary"
                    name={`checkbox-${itemIndex}`}
                  />
                </td>) : 
                <th></th>
              }
              {numbered ? (<td className="binger-numbered-column">{itemIndex+1}</td>) : <td></td>}
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>
                  {column.render ? 
                    column.render(item[column.dataIndex], item, itemIndex) : 
                    item[column.dataIndex]
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
	}
}
