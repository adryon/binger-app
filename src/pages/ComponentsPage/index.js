import React from 'react';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

class ComponentsPage extends React.Component{

  render() {
    return (
			<div className="container">

	      {/* <div className="row">
					<div className="col-lg-12">
						<span className="binger-text-strong binger-flex-center">
							Binger Components API
						</span>
					</div>
	      </div> */}

        <div className="row">
          <div className="col-lg-12">
            <span className="binger-text-strong">Button API</span>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" width="5%">#</th>
                  <th scope="col" width="22%">Name</th>
                  <th scope="col" width="15%">Type</th>
                  <th scope="col" width="10%">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">1</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">expandTextOnHover</span></td>
                  <td className="binger-text-code">bool</td>
                  <td className="binger-text-code">false</td>
                  <td>Flag for hiding the text, rendering it only on mouse hover.</td>
                </tr>

                <tr>
                  <th scope="row">2</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">icon</span></td>
                  <td className="binger-text-code">string</td>
                  <td></td>
                  <td>Icon of the button (The icon pack is font-awesome)</td>
                </tr>

                <tr>
                  <th scope="row">3</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">onButtonClick</span></td>
                  <td className="binger-text-code">function</td>
                  <td className="binger-text-code">{`() => {}`}</td>
                  <td>Handler function for button click.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">shape</span></td>
                  <td className="binger-text-code">'normal' | 'circle'</td>
                  <td className="binger-text-code">'normal'</td>
                  <td>Button shape. 'normal' is used for the default button theme set in CSS.</td>
                </tr>

                <tr>
                  <th scope="row">5</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">show</span></td>
                  <td className="binger-text-code">bool</td>
                  <td className="binger-text-code">true</td>
                  <td>Flag for rendering the button.</td>
                </tr>

                <tr>
                  <th scope="row">6</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">text</span></td>
                  <td className="binger-text-code">string</td>
                  <td></td>
                  <td>Text of the button</td>
                </tr>

                <tr>
                  <th scope="row">7</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">type</span></td>
                  <td className="binger-text-code">'submit' | 'button'</td>
                  <td className="binger-text-code">'button'</td>
                  <td>Button type. Use 'submit' if it is a form submit button and 'button' for everything else</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <span className="binger-text-strong">Input API</span>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" width="5%">#</th>
                  <th scope="col" width="22%">Name</th>
                  <th scope="col" width="15%">Type</th>
                  <th scope="col" width="10%">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">label</span></td>
                  <td className="binger-text-code">string</td>
                  <td></td>
                  <td>Label above the input</td>
                </tr>

                <tr>
                  <th scope="row">2</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">icon</span></td>
                  <td className="binger-text-code">string</td>
                  <td></td>
                  <td>Icon inside the input.</td>
                </tr>

                <tr>
                  <th scope="row">3</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">name</span></td>
                  <td className="binger-text-code">string</td>
                  <td className="binger-text-code"></td>
                  <td>Unique identifier (Required if part of a form).</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">value</span></td>
                  <td className="binger-text-code">string</td>
                  <td className="binger-text-code"></td>
                  <td>The value of the input (Required if input is not part of a form, to be able to retrieve the value of the input.</td>
                </tr>

                <tr>
                  <th scope="row">5</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">isValid</span></td>
                  <td className="binger-text-code">bool</td>
                  <td className="binger-text-code">true</td>
                  <td>Flag for controlling the display of the input border if not valid.</td>
                </tr>

                <tr>
                  <th scope="row">6</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">type</span></td>
                  <td className="binger-text-code">'text'</td>
                  <td className="binger-text-code">'text'</td>
                  <td>Type of the input</td>
                </tr>

                <tr>
                  <th scope="row">7</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">onInputChange</span></td>
                  <td className="binger-text-code">function</td>
                  <td className="binger-text-code">{`(name, value) => {}`}</td>
                  <td>Handler for the input change event</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <span className="binger-text-strong">Checkbox API</span>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" width="5%">#</th>
                  <th scope="col" width="22%">Name</th>
                  <th scope="col" width="15%">Type</th>
                  <th scope="col" width="10%">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">3</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">name</span></td>
                  <td className="binger-text-code">string</td>
                  <td className="binger-text-code"></td>
                  <td>Unique identifier.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">checked</span></td>
                  <td className="binger-text-code">bool</td>
                  <td className="binger-text-code">false</td>
                  <td>Flag for controlling if the checkbox is checked or not.</td>
                </tr>

                <tr>
                  <th scope="row">5</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">color</span></td>
                  <td className="binger-text-code">'secondary' | 'green'</td>
                  <td className="binger-text-code"></td>
                  <td>Name of the color to be painted on the checkbox.</td>
                </tr>

                <tr>
                  <th scope="row">6</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">onCheckboxChange</span></td>
                  <td className="binger-text-code">function</td>
                  <td className="binger-text-code">{`(name, checked) => {}`}</td>
                  <td>Handler function when the 'checked' value is changed.</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <span className="binger-text-strong">Progress Bar API</span>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" width="5%">#</th>
                  <th scope="col" width="22%">Name</th>
                  <th scope="col" width="25%">Type</th>
                  <th scope="col" width="10%">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">3</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">value</span></td>
                  <td className="binger-text-code">integer</td>
                  <td className="binger-text-code">0</td>
                  <td>Percentage to be shown on the bar.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">color</span></td>
                  <td className="binger-text-code">'green' | 'red' | 'blue' | 'orange' | 'purple' | 'lime'</td>
                  <td className="binger-text-code">'green'</td>
                  <td>Color of the progress bar.</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <span className="binger-text-strong">Progress Circle API</span>

            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col" width="5%">#</th>
                  <th scope="col" width="22%">Name</th>
                  <th scope="col" width="25%">Type</th>
                  <th scope="col" width="10%">Default</th>
                  <th scope="col">Description</th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <th scope="row">3</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">percentage</span></td>
                  <td className="binger-text-code">integer</td>
                  <td className="binger-text-code">100</td>
                  <td>Percentage to be shown on the bar.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">color</span></td>
                  <td className="binger-text-code">'green' | 'red' | 'blue' | 'orange' | 'purple' | 'lime'</td>
                  <td className="binger-text-code">'green'</td>
                  <td>Color of the progress bar.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">size</span></td>
                  <td className="binger-text-code">integer</td>
                  <td className="binger-text-code">90</td>
                  <td>Size of the circle.</td>
                </tr>

                <tr>
                  <th scope="row">4</th>
                  <td className="binger-text-code"><span className="binger-yelow-background">strokeWidth</span></td>
                  <td className="binger-text-code">integer</td>
                  <td className="binger-text-code">5</td>
                  <td>Width of the colored circle.</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

			</div>
    )
  }
}

const mapDispatchToProps = {
	goToRegister: () => dispatch => dispatch(push('/register'))
};

export default connect(null, mapDispatchToProps)(ComponentsPage);
