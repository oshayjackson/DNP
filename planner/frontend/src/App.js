/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";

const deleteObject = (id) => {
  fetch(`http://127.0.0.1:8000/home/${id}/`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete object");
      }
      // Object deleted successfully
    })
    .catch((error) => {
      console.error("Error deleting object:", error);
    });
};

axios
  .delete(`http://127.0.0.1:8000/home/1/`)
  .then((response) => {
    console.log("Object deleted successfully:", response);
  })
  .catch((error) => {
    console.error("Error deleting object:", error);
  });

class App extends React.Component {
  state = {
    details: [],
    user: "",
    quote: "",
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios
      .get("http://localhost:8000/home")
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => {});
  };

  renderSwitch = (param) => {
    switch (param + 1) {
      case 1:
        return "primary ";
      case 2:
        return "secondary";
      case 3:
        return "success";
      case 4:
        return "danger";
      case 5:
        return "warning";
      case 6:
        return "info";
      default:
        return "yellow";
    }
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/home", {
        name: this.state.user,
        detail: this.state.quote,
      })
      .then((res) => {
        this.setState({
          user: "", // Clear user input field
          quote: "", // Clear quote input field
        });
        this.fetchData(); // Fetch data after successful submission
      })
      .catch((err) => {});
  };

  handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/home/${id}/`)
      .then((res) => {
        this.fetchData(); // Fetch data after successful deletion
      })
      .catch((err) => {});
  };

  render() {
    return (
      <div className="container jumbotron">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                {" "}
                Author{" "}
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Name of the Poet/Author"
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={this.state.user}
              name="user"
              onChange={this.handleInput}
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Your Quote</span>
            </div>
            <textarea
              className="form-control "
              aria-label="With textarea"
              placeholder="Tell us what you think of ....."
              value={this.state.quote}
              name="quote"
              onChange={this.handleInput}></textarea>
          </div>

          <button type="submit" className="btn btn-primary mb-5">
            Submit
          </button>
        </form>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#000000",
          }}
        />

        {this.state.details.map((detail, id) => (
          <div key={id}>
            <div className="card shadow-lg">
              <div
                className={"bg-" + this.renderSwitch(id % 6) + " card-header"}>
                Quote {id + 1}
                <button
                  className="btn btn-danger btn-sm float-right"
                  onClick={() => this.handleDelete(detail.id)}>
                  Delete
                </button>
              </div>
              <div className="card-body">
                <blockquote
                  className={
                    "text-" + this.renderSwitch(id % 6) + " blockquote mb-0"
                  }>
                  <h1> {detail.detail} </h1>
                  <footer className="blockquote-footer">
                    {" "}
                    <cite title="Source Title">{detail.name}</cite>
                  </footer>
                </blockquote>
              </div>
            </div>
            <span className="border border-primary "></span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
