/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/


// App.js

import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Components/Question.js";
import qBank from "./Components/QuestionBank.js";
import Score from "./Components/Score";
import "./App.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionBank: qBank,
			currentQuestion: 0,
			selectedOption: "",
			score: 0,
			quizEnd: false,
		};
	}

	handleOptionChange = (e) => {
		this.setState({ selectedOption: e.target.value });
	};

	handleFormSubmit = (e) => {
		e.preventDefault();
		this.checkAnswer();
		this.handleNextQuestion();
	};

	checkAnswer = () => {
		const { questionBank, currentQuestion, selectedOption, score } = this.state;
		if (selectedOption === questionBank[currentQuestion].answer) {
			this.setState((prevState) => ({ score: prevState.score + 1 }));
		}
	};

	handleNextQuestion = () => {
		const { questionBank, currentQuestion } = this.state;
		if (currentQuestion + 1 < questionBank.length) {
			this.setState((prevState) => ({
				currentQuestion: prevState.currentQuestion + 1,
				selectedOption: "",
			}));
		} else {
			this.setState({
				quizEnd: true,
			});
		}
	};

	render() {
		const { questionBank, currentQuestion, selectedOption, score, quizEnd } =
			this.state;
		return (
			<div className="App d-flex flex-column align-items-center justify-content-center">
				<h1 className="app-title">QUIZ APP</h1>
				{!quizEnd ? (
					<Question
						question={questionBank[currentQuestion]}
						selectedOption={selectedOption}
						onOptionChange={this.handleOptionChange}
						onSubmit={this.handleFormSubmit}
					/>
				) : (
					<Score
						score={score}
						onNextQuestion={this.handleNextQuestion}
						className="score"
					/>
				)}
			</div>
		);
	}
}

export default App;
