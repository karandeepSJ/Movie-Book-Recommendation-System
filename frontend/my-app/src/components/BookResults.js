import React from 'react'
import styled from 'styled-components';
import BookResult from './BookResult'

const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 25rem));
  justify-content: space-evenly;
  align-content: space-between;
  align-items: start;
  padding: 2rem 0;
  grid-gap: 4rem 2rem;
`;

function BookResults ({results}) {
	console.log({results})
	return (
		<div>
			<section className="results">
				<MoviesWrapper>
				{results.map(result => (
					<BookResult key={result.bookID} result={result} />
				))}
				</MoviesWrapper>
			</section>
		</div>
	)
}

export default BookResults
