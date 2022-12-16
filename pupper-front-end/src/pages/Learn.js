import React, { useState } from 'react';
import LearnApi from '../api/LearnApi';

export default function Learn({ authenticatedUser }) {
  const [dogSearchResult, setDogSearchResult] = useState(null);
  const [dogSearchInput, setDogSearchInput] = useState(null);
  const [showError, setShowError] = useState(false);

  const submitSearch = () => {
    setShowError(false);
    setDogSearchResult(null);
    LearnApi.GetPupInformation(dogSearchInput)
      .then((data) => {
        if (data !== null && data.length) {
          setDogSearchResult(data);
        } else {
          setShowError(true);
        }
      });
  };

  return (
    <div>
      <h1>Learn</h1>
      <h3>Hi {authenticatedUser.firstName} here are some helpful pup resources!</h3>
      <div>
        <input value={dogSearchInput || ''} type="text" onChange={(e) => { setDogSearchInput(e.target.value); }} placeholder="Search by breed" />
        {
          dogSearchInput !== null
            ? <button type="submit" onClick={() => { submitSearch(); }}>Search</button>
            : <></>
        }
      </div>
      { showError ? <p>No results</p> : <></> }
      { dogSearchResult !== null ? <button type="submit" onClick={() => { setDogSearchResult(null); setDogSearchInput(null); }}>Clear search</button> : <></> }
      <div>
        {
          /* eslint-disable */
          dogSearchResult !== null
            ? dogSearchResult.map((dog) => 
              <div key={dog.id}>
                <img src={dog.image_link} alt={dog.name} />
                <p><b>Breed: </b>{dog.name}</p>
                <p><b>Avg Life Expectancy: </b>{dog.min_life_expectancy} - {dog.max_life_expectancy}yrs</p>
                <p><b>Avg Weight: </b>{dog.min_weight_female} - {dog.max_weight_male}lbs</p>
                <p><b>Energy: </b>{dog.energy}/5</p>
                <p><b>playfulness: </b>{dog.playfulness}/5</p>
                <p><b>Protectiveness: </b>{dog.protectiveness}/5</p>
                <p><b>Trainability: </b>{dog.trainability}/5</p>
                <p><b>Good with other dogs: </b>{dog.good_with_other_dogs}/5</p>
                <p><b>Good with children: </b>{dog.good_with_children}/5</p>
              </div>)
            : <></>
        }
      </div>
      <div className="articles">
        <div className="article_detail">
          <a className="article_title" href="https://www.purina.com/articles/puppy/training/how-to-potty-train-a-puppy" target="_blank">
            How to Potty Train a Puppy
          </a>
          <p>
            Potty training a puppy can be challenging, but with patience, persistence and consistency, you and your pup can be successful. 
            Find out the best way to potty train a puppy from Purina’s pet experts.
          </p>
          <a className="read_more" href="https://www.purina.com/articles/puppy/training/how-to-potty-train-a-puppy" target="_blank">
            Read more
          </a>
        </div>
        <div className="article_detail">
          <a className="article_title" href="https://www.purina.com/articles/introducing-new-puppy" target="_blank">
            Tips for Introducing a New Puppy to a New Home &amp; to Other Dogs &amp; Cats
          </a>
          <p>
            Getting a new puppy is exciting, but it’s important to prepare before bringing him home. 
            Making sure your home is safe and knowing how to introduce him to other pets will go a long way in keeping everyone happy and comfortable. 
          </p>
          <a className="read_more" href="https://www.purina.com/articles/introducing-new-puppy" target="_blank">
            Read more
          </a>
       </div>
       <div className="article_detail">
          <a className="article_title" href="https://www.purina.com/articles/puppy/health/puppy-energy-levels-by-age" target="_blank">
            Puppy Energy Levels by Age
          </a>
          <p>
            As puppies grow and change, their activity and energy levels change. 
            Purina's team of pet care experts prepare you for what to expect at various stages of their life.
          </p>
          <a className="read_more" href="https://www.purina.com/articles/puppy/health/puppy-energy-levels-by-age" target="_blank">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
