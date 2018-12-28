import React from 'react';
const {Button, ButtonDelete} =  require('../utils/helpers');

class Footer extends React.Component {
  
  isActive = (text) => {
      let filter = this.props.filter === text ? "active" : "";
      return `footer__button ${filter}`
  }

  render() {
    return (
      <footer className="footer">
          <Button className={this.isActive}  text="All" setActiveFilter={this.props.setActiveFilter} />
          <Button className={this.isActive} text="Active" setActiveFilter={this.props.setActiveFilter}/>
          <Button className={this.isActive}  text="Complited" setActiveFilter={this.props.setActiveFilter}/>
          <ButtonDelete className={"footer__button"} deleteCompleted={this.props.deleteCompleted} text="Delete completed"  />
      </footer>
    )
  }
}

export default Footer;