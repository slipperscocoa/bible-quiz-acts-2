import React from 'react';
import './Home.css';

class HomeApp extends React.Component {
    render() {
        return (
            <div className='home-custom'>
                <div className='content'>
                    <br />
                    <h1>Welcome to TBQuizWhiz!</h1>
                    <br />
                    <h3>This is an app created by a former quizzer for future quizzers</h3>
                    <br />
                    <h3>It offers a variety of games designed to help you learn and retain scripture in an enjoyable and meaningful way</h3>
                    <br />
                    <h3>Use the Menu to select your first game</h3>
                </div>
            </div>
        )
    }
}

export default HomeApp; 