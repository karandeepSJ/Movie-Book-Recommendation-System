# Movie API
- search: `http://localhost:5050/api/m/movies/search?query=Toy%20Story`
- search with genre: `http://localhost:5050/api/m/movies/search?query=Toy%20Story&genre=Action`
- recommendations: `http://localhost:5050/api/m/movies/recommendations`
- movie details: `http://localhost:5050/api/m/movies/details/{movieId}`
- list of genres: `http://localhost:5050/api/m/movies/genres`
- all movies of genre: `http://localhost:5050/api/m/movies/genre/{genreName}`

# Books API
- search: `http://localhost:5050/api/b/books/search?query=Toy%20Story`
- recommendations: `http://localhost:5050/api/b/books/recommendations`
- book details: `http://localhost:5050/api/b/books/details/{bookId}`

# User API
- login (POST, form attributes: (email, password)): `http://localhost:5050/api/u/user/login`
- get rating for movie: `http://localhost:5050/api/u/user/movieRating?userId=1&movieId=10`
- get rating for book: `http://localhost:5050/api/u/user/bookRating?userId=1&bookId=10`
- rate movie: `http://localhost:5050/api/u/rate/movie?userId=1&movieId=10&rating=2`
- rate book: `http://localhost:5050/api/u/rate/book?userId=9&bookId=0020198906&rating=1`

# Recommendation API
- get Recommendations: `http://localhost:5050/api/r/recommend?movieDbId=68&bookDbId=78973`