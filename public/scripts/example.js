/**
 * @jsx React.DOM
 */

var converter = new Showdown.converter();

var Member = React.createClass({
  getInitialState: function() {
    return {checked: this.props.checkallChecked};
  },

  handleChange: function(event) {
    this.setState({checked: event.target.checked});
  },

  render: function() {
    return (
      <tr className="member">
        <td><input type="checkbox" name={this.props.key} checked={this.state.checked} onChange={this.handleChange} /></td>
        <td className="memberName">{this.props.name}</td>
      </tr>
    );
  }
});

var MemberBox = React.createClass({
  getInitialState: function() {
    return {
      data: [
        {id: 1, name: '空条承太郎', stand: 'スタープラチナ', age: 17},
        {id: 2, name: 'ジョセフ・ジョースター', stand: 'ハーミットパープル', age:69},
        {id: 3, name: 'モハメド・アヴドゥル', stand: 'マジシャンズレッド', age: 28},
        {id: 4, name: '花京院典明', stand: 'ハイエロファントグリーン', age: 17},
        {id: 5, name: 'ジャン=ピエール・ポルナレフ', stand: 'シルバーチャリオッツ', age:22},
        {id: 6, name: 'イギー', stand: 'ザ・フール', age: 5}
      ],
      checkallChecked: false,
    };
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <form role="form">
            <MemberList data={this.state.data} checkallChecked={this.state.checkallChecked} />
          </form>
        </div>
      </div>
    );
  },
});

var MemberList = React.createClass({
  getInitialState: function() {
    var data = [];
    this.props.data.forEach(function(d, i) {
       d.checked = false;
       data.push(d);
    });
    return {data: data, checkallChecked: this.props.checkallChecked };
  },

  render: function() {
    var that = this;
    var memberNodes = this.state.data.map(function(member, index) {
      return (
        <tr className="member" key={member.id}>
          <td><input type="checkbox" data-index={index} checked={member.checked} onChange={that.handleChange} /></td>
          <td className="memberName">{member.name}</td>
        </tr>
      );
    });

    return (
      <div>
        <table className="table">
        <thead>
          <tr>
            <th><input type="checkbox" name="checkall" ref="checkall" checked={ this.state.checkallChecked } onChange={ this.handleAllChange } /></th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>{memberNodes}</tbody>
        </table>
        <div>
          <button type="button" className="btn btn-default" onClick={ this.checkAll }>check all</button>
          <button type="button" className="btn btn-default" onClick={ this.uncheckAll }>uncheck all</button>
        </div>
      </div>
    );
  },

  handleAllChange: function(event) {
    var checked = event.target.checked;
    var newData = this.state.data.map(function(d) {
      return {id: d.id, name: d.name, checked: checked };
    });
    this.setState({checkallChecked: checked, data: newData});
  },

  handleChange: function(event) {
    var individualChecked = event.target.checked;
    var newData = this.state.data.map(function(d, i) {
      if (event.target.dataset.index == i) {
        d.checked = individualChecked;
      }
      return d;
    });

    if (!individualChecked) {
      this.setState({checkallChecked: false, data: newData});
      return;
    }

    var unchecked = [];
    this.state.data.forEach(function(d, i) {
      if (!d.checked) {
        unchecked.push(d);
      }
    });

    if ((unchecked.length === 0) && (individualChecked)) {
      this.setState({checkallChecked: true, data: newData});
    } else {
      this.setState({data: newData});
    }
  },

  checkAll: function() {
    var newData = this.state.data.map(function(d) {
      return {id: d.id, name: d.name, checked: true };
    });
    this.setState({ checkallChecked: true, data: newData });
  },

  uncheckAll: function() {
    var newData = this.state.data.map(function(d) {
      return {id: d.id, name: d.name, checked: false };
    });
    this.setState({ checkallChecked: false, data: newData });
  }
});

React.renderComponent(
  <MemberBox pollInterval={2000} />,
  document.getElementById('content')
);
