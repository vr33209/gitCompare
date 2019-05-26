import React, { Component } from "react";
import moment from "moment";

import logo from "../../assests/logo.png";
import { Container, Form } from "./styles";

import CompareList from "../../components/CompareList";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    loading: false,
    repositories: [],
    repositorieInput: "",
    repositoryError: false
  };

  handleAddRepository = async e => {
    e.preventDefault();

    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositorieInput}`
      );
      repository.lasCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositorieInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          withError={this.state.repositoryError}
          onSubmit={this.handleAddRepository}
        >
          <input
            type="text"
            placeholder="usuario/repositorio"
            value={this.state.repositorieInput}
            onChange={e => this.setState({ repositorieInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>

        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
